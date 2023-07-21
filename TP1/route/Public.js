import { URL } from 'url';
import fs from 'fs';

import responseBuilder from './responseBuilder.js';

export default class Public extends responseBuilder {

  #url ;
  constructor( response , url) {
    super(response);
    this.#url = url ;
  }

  get url(){
    return this.#url;
  }

  buildResponse(){
    this.response.statusCode = 200;
    this.response.setHeader( 'Content-Type' , 'text/plain');
  }
}
