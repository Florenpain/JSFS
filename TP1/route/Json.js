import responseBuilder from './responseBuilder.js';

export default class Json extends responseBuilder{

  #response;
  #url ;
  _date ;

  constructor(response, url) {
    super(response) ;
    this.#url = url ;
    this._date = new Date() ;
  }

  get url(){
    return this.#url;
  }

  buildResponse()  {
    this.response.statusCode = 200;
    this.response.setHeader( 'Content-Type' , 'application/json');

    let tab = {};

    for (const [key, value] of this.url.searchParams) {
      tab[key] = value;
    }
    tab = {...tab , Date : this._date };
    this.response.write(JSON.stringify(tab));

  }
}
