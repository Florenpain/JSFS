import RequestController from '../requestController.js';
import responseBuilder from './responseBuilder.js';

export default class Error extends responseBuilder{
  #response;
  #url ;

  constructor(response, url) {
    super(response) ;
    this.#url = url ;
  }

  get url(){
    return this.#url ;
  }

  buildResponse()  {
    this.response.statusCode = 404;
    this.response.setHeader( 'Content-Type' , 'text/html');

    this.response.write('<html> <head></head> <body>');
    this.response.write('<h1>404 : page '+ this.url.pathname +' not found</h1>');
    let date = new Date() ;
    this.response.write('<footer>'+ date.toLocaleTimeString('fr-FR') + '</footer></body></html>');
}
}
