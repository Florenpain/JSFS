export default class ResponseBuilder{

  #response;

  constructor(response) {
    this.#response = response;
  }

  get response() {
    return this.#response;
  }

  buildResponse()  {
    this.response.statusCode = 200;
    this.response.setHeader( 'Content-Type' , 'text/html');
    this.response.write(`<h2>welcome home</h2>`);
}
}
