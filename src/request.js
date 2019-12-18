import { encodeQueryString, timeout, isFunction, compactParams } from './utils';

class Request {
  constructor(base = '') {
    this._base = base;
    this._token = null;
    this._timeout = 20000;
  }

  timeout(ms) {
    this._timeout = ms;
    return this;
  }

  base(x) {
    this._base = x;
    return this;
  }

  token(getToken) {
    this._token = getToken;
    return this;
  }

  headers(getHeaders) {
    this._headers = getHeaders;
    return this;
  }

  getHeaders() {
    let headers = {};

    if (this._token) {
      if (isFunction(this._token)) {
        headers = { ...headers, Authorization: 'Bearer ' + this._token() };
      } else {
        headers = { ...headers, Authorization: 'Bearer ' + this._token };
      }
    }

    if (this._headers) {
      if (isFunction(this._headers)) {
        headers = { ...headers, ...this._headers() };
      } else {
        headers = { ...headers, ...this._headers };
      }
    }
    return headers;
  }

  fetch(path, options) {
    const req = fetch(`${this._base}${path}`, options).then(resp => {
      if (resp.status === 401) {
        throw new Error('401');
      } else if (!resp.ok) {
        throw new Error('network error');
      }

      return resp;
    });

    return Promise.race([req, timeout(this._timeout)]);
  }

  get(path, params) {
    const search = params ? `?${encodeQueryString(compactParams(params))}` : '';
    return this.fetch(`${path}${search}`, {
      method: 'GET',
      headers: this.getHeaders()
    }).then(resp => resp.json());
  }

  post(path, params) {
    return this.fetch(`${path}`, {
      body: JSON.stringify(compactParams(params)),
      method: 'POST',
      headers: {
        ...this.getHeaders(),
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json());
  }

  put(path, params) {
    return this.fetch(`${path}`, {
      body: JSON.stringify(compactParams(params)),
      method: 'PUT',
      headers: {
        ...this.getHeaders(),
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json());
  }

  delete(path) {
    return this.fetch(`${path}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
  }
}

export default Request;
