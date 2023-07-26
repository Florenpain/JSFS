import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO } from 'socket.io';
import IOController from './controllers/ioController.js';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

const io = new ServerIO(server);
const ioController = new IOController(io);

io.on('connection', socket => console.log(`connection done by ${socket.id}` ));
io.on('connection', ioController.registerSocket.bind(ioController));
io.on('disconnect', () => console.log(`disconnection from ${socket.id}` )) ;

server.listen(8081);
