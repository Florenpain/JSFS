import http from 'http';
import RequestController from './requestController.js';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest());

server.listen(8080);
