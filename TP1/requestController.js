import { URL } from 'url';
import fs from 'fs';

import responseBuilder from './route/responseBuilder.js';
import First from './route/First.js';
import Second from './route/Second.js';
import Error from './route/Error.js';
import Json from './route/Json.js';
import Random from './route/Random.js';
import Public from './route/Public.js'
import { log } from 'console';

export default class RequestController {

  #request;
  #response;
  #url;
  #responseBuilder;
  #content = '';

  constructor(request, response) {
    this.#request = request,
    this.#response = response;
    this.#url = new URL(request.url, `http://${request.headers.host}`);
    this.#responseBuilder = new responseBuilder(response);
  }

  get response() {
    return this.#response;
  }

  get url() {
    return this.#url ;
  }

  handleRequest() {
    this.buildResponse();
  }

  buildResponse()  {
    const nameValue = this.#url.searchParams.get('name') || 'unknown';

    switch (this.#url.pathname) {
      case '/first':
        this.#responseBuilder = new First(this.response);
        break;
      case '/second':
        this.#responseBuilder = new Second(this.response);
        break;
      case '/json':
        this.#responseBuilder = new Json(this.response, this.url);
        break;
      case '/random':
        this.#responseBuilder = new Random(this.response, this.url);
        break;
      case '/':
        this.#responseBuilder = new responseBuilder(this.response);
        break;
      default:
        this.#responseBuilder = new Error(this.response, this.url);
    }

    /*
    if (this.#url.pathname.startsWith('/public')){
      log(this.#url.pathname);
        try {
          fs.accessSync(`.${this.#url.pathname}`,fs.constants.R_OK)
          const content = fs.readFileSync(`.${this.#url.pathname}`);
          this.#responseBuilder= new Public(this.response,this.url);
          this.#responseBuilder.buildResponse();
          this.response.write(content);
        } catch (err) {
          this.#responseBuilder=new Error(this.response, this.url);
          this.#responseBuilder.buildResponse();
        }
      }
      */

    this.#responseBuilder.buildResponse();
    this.response.end();
  }

}
