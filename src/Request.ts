import isFunction from 'lodash/isFunction';
import pickBy from 'lodash/pickBy';
import isNil from 'lodash/isNil';

export function encode(obj: any, prefix?: string): string {
  var pairs = [];
  for (var key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const value = obj[key];
    const enkey = encodeURIComponent(key);
    let pair;
    if (typeof value === 'object') {
      pair = encode(value, prefix ? prefix + '[' + enkey + ']' : enkey);
    } else {
      pair =
        (prefix ? prefix + '[' + enkey + ']' : enkey) +
        '=' +
        encodeURIComponent(value);
    }
    pairs.push(pair);
  }
  return pairs.join('&');
}

export const timeout = (ms: number) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject(new TimeoutError('Request timeout')), ms)
  );
};

export const compactParams = (params: any) => {
  return pickBy(params, (x) => !isNil(x));
};

export class HTTPError extends Error {
  constructor(status: number) {
    super();
    this.name = 'HTTPError';
    // this.status = status;
  }
}

export class BadRequestError extends HTTPError {}

export class UnauthorizedError extends HTTPError {}

export class TimeoutError extends Error {}

interface BearerTokenOptions {
  token: string;
  prefix?: string;
}

function resolve(fn: Function | Object) {
  if (isFunction(fn)) {
    return fn();
  }
  return fn;
}

export class Request {
  public _base: string;
  public _timeout: number;
  public _bearerToken: any;
  public _headers: any;

  constructor(base = '') {
    this._base = base;
    this._timeout = 20000;
  }

  timeout(ms: number) {
    this._timeout = ms;
    return this;
  }

  base(x: string) {
    this._base = x;
    return this;
  }

  bearerToken(
    options: BearerTokenOptions | (() => BearerTokenOptions) = { token: '' }
  ) {
    this._bearerToken = options;
  }

  headers(getHeaders: any) {
    this._headers = getHeaders;
    return this;
  }

  beforeRequest() {}

  afterResponse() {}

  getHeaders() {
    let headers = {};

    if (this._headers) {
      const hh = resolve(this._headers);
      headers = { ...headers, ...hh };
    }

    if (this._bearerToken) {
      const { prefix = 'Bearer', token } = resolve(this._bearerToken);
      headers = { ...headers, Authorization: prefix + ' ' + token };
    }

    return headers;
  }

  fetch(path: string, options: any = { headers: {} }) {
    options.headers = {
      ...options.headers,
      ...this.getHeaders(),
    };

    if (options.json) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    }

    const req = fetch(`${this._base}${path}`, options)
      .then((resp) => {
        if (resp.status < 200 || resp.status >= 300) {
          throw new HTTPError(resp.status);
        }
        return resp;
      })
      .then((resp) => {
        if (options.json) {
          return resp.json().then((json) => ({
            headers: resp.headers,
            json,
          }));
        } else {
          return resp;
        }
      });

    return Promise.race([req, timeout(this._timeout)]);
  }

  get(path: string, options?: any) {
    const search = options.params
      ? `?${encode(compactParams(options.params))}`
      : '';
    return this.fetch(`${path}${search}`, {
      ...options,
      method: 'GET',
    });
  }

  post(path: string, options?: any) {
    return this.fetch(path, {
      ...options,
      method: 'POST',
    });
  }

  put(path: string, options?: any) {
    return this.fetch(path, {
      ...options,
      method: 'PUT',
    });
  }

  delete(path: string, options?: any) {
    return this.fetch(path, {
      ...options,
      method: 'DELETE',
    });
  }
}
