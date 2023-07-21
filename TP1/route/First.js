import responseBuilder from './responseBuilder.js';

export default class First extends responseBuilder{

  #response;

  constructor(response) {
    super(response) ;
  }

  buildResponse()  {
    this.response.statusCode = 200;
    this.response.setHeader('Content-Type' , 'text/html');

    this.response.write('<html> <head></head> <body>');
    this.response.write('<html><head><link href="./public/style/style.css" rel="stylesheet" type="text/css"></head><body>');
    this.response.write('<h1>First page</h1>');
    this.response.write(`<img src="./public/img/timoleon_oceanie.jpg" alt="timoleon bien sur">`);
    let date = new Date() ;
    this.response.write('<footer>'+ date.toLocaleTimeString('fr-FR') + '</footer></body></html>');
}
}
