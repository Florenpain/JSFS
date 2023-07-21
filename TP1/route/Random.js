import responseBuilder from './responseBuilder.js';

export default class Json extends responseBuilder{

  #response;
  #url ;

  constructor(response, url) {
    super(response) ;
    this.#url = url ;
  }

  get url(){
    return this.#url;
  }

  buildResponse()  {
    this.response.statusCode = 200;
    this.response.setHeader( 'Content-Type' , 'application/json');


    let tab = {};
      tab = {...tab , randomValue : Math.floor(Math.random() * 100) };
      this.response.write(JSON.stringify(tab));
}
}
