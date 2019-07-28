import 'cross-fetch/polyfill';
import qs from 'qs';

const timeout = ms =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error('timeout')), ms)
  );

export class Request {
  constructor() {
    this._base = '';
    this._token = null;
    this._timeout = 20000;
  }

  timeout(ms) {
    this._timeout = ms;
  }

  base(x) {
    this._base = x;
  }

  token(x) {
    this._token = x;
  }

  getHeaders() {
    if (this._token) {
      return { Authorization: 'Bearer ' + this._token };
    }
    return {};
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

    Promise.race([req, timeout(this._timeout)]);
  }

  get(path, params) {
    const search = params ? `?${qs.stringify(params)}` : '';
    return this.fetch(`${path}${search}`, {
      method: 'GET',
      headers: this.getHeaders()
    }).then(resp => resp.json());
  }

  post(path, data) {
    return this.fetch(`${path}`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        ...this.getHeaders(),
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json());
  }

  put(path, data) {
    return this.fetch(`${path}`, {
      body: JSON.stringify(data),
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

const request = new Request();

export default request;
