import query from 'qs';
import { stripSlashes } from 'feathers-commons';
import { convert } from 'feathers-errors';

function toError (error) {
  throw convert(error);
}

export default class Base {
  constructor (settings) {
    this.name = stripSlashes(settings.name);
    this.options = settings.options;
    this.connection = settings.connection;
    this.base = `${settings.base}/${this.name}`;
  }

  makeUrl (params, id) {
    let queryParams = params.query || {};
    let url = this.base;

    if (typeof id !== 'undefined' && id !== null) {
      url = url.indexOf(':id') !== -1 ? url.replace(':id', id) : url + `/${id}`;
    }

    if (typeof params.url !== 'undefined' && params.url !== null && typeof params.url === 'object') {

      for (const key of Object.keys(params.url)) {
        if (url.indexOf(`:${key}`) !== -1) {
          url = url.replace(`:${key}`, params.url[key]);
        }
      }
    }

    if (Object.keys(queryParams).length !== 0) {
      const queryString = query.stringify(queryParams);

      url += `?${queryString}`;
    }

    return url;
  }

  find (params = {}) {
    return this.request({
      url: this.makeUrl(params),
      method: 'GET',
      headers: Object.assign({}, params.headers)
    }).catch(toError);
  }

  get (id, params = {}) {
    if (typeof id === 'undefined') {
      return Promise.reject(new Error(`id for 'get' can not be undefined`));
    }

    return this.request({
      url: this.makeUrl(params, id),
      method: 'GET',
      headers: Object.assign({}, params.headers)
    }).catch(toError);
  }

  create (body, params = {}) {

    let headers;

    if (body instanceof FormData) {
      headers = Object.assign({}, params.headers);
    } else {
      headers = Object.assign({ 'Content-Type': 'application/json' }, params.headers);
    }

    return this.request({
      url: this.makeUrl(params),
      body,
      method: 'POST',
      headers: headers
    }).catch(toError);
  }

  update (id, body, params = {}) {
    if (typeof id === 'undefined') {
      return Promise.reject(new Error(`id for 'update' can not be undefined, only 'null' when updating multiple entries`));
    }

    let headers;

    if (body instanceof FormData) {
      headers = Object.assign({}, params.headers);
    } else {
      headers = Object.assign({ 'Content-Type': 'application/json' }, params.headers);
    }

    return this.request({
      url: this.makeUrl(params, id),
      body,
      method: 'PUT',
      headers: headers
    }).catch(toError);
  }

  patch (id, body, params = {}) {
    if (typeof id === 'undefined') {
      return Promise.reject(new Error(`id for 'patch' can not be undefined, only 'null' when updating multiple entries`));
    }

    let headers;

    if (body instanceof FormData) {
      headers = Object.assign({}, params.headers);
    } else {
      headers = Object.assign({ 'Content-Type': 'application/json' }, params.headers);
    }


    return this.request({
      url: this.makeUrl(params, id),
      body,
      method: 'PATCH',
      headers: headers
    }).catch(toError);
  }

  remove (id, params = {}) {
    if (typeof id === 'undefined') {
      return Promise.reject(new Error(`id for 'remove' can not be undefined, only 'null' when removing multiple entries`));
    }

    return this.request({
      url: this.makeUrl(params, id),
      method: 'DELETE',
      headers: Object.assign({}, params.headers)
    }).catch(toError);
  }
}
