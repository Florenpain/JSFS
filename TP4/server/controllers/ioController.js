export default class IOController {
  #io;
  #clients;
  #clientsInter;

  constructor(io) {
    this.#io = io;
    this.#clients = new Map();
  }

  registerSocket(socket) {
    this.setupListeners(socket);
  }

  setupListeners(socket) {
    socket.on( 'greatings'  , () => this.greatings(socket,socket.data.username) );
    socket.on( 'disconnectGame' , () => this.leave(socket) );
    socket.on( 'updatePaddle' , (arg) => this.updatePaddle(socket,arg) );
    socket.on( 'ballValue' , (x,y,shiftx,shifty) => this.ballValue(socket,x,y,shiftx,shifty) );
    socket.on( 'score' , (gauche,droite) => this.score(socket,gauche,droite) );
  }

  greatings(socket, userName) {
    if(this.#clients.size >1){
      console.log(`too much clients : ${userName} (id : ${socket.id})`);
      socket.emit('tooMuchPlayers');
    }
    else{
      if( this.#clients.size == 0){
        socket.emit('first');
      }
      else{
        socket.emit('second');
      }
      this.#clients.set(socket,userName);
      socket.emit('welcome');
      //socket.broadcast.emit('new user', userName);
    }
    if(this.#clients.size == 2){
      for (const [key, value] of this.#clients) {
            key.emit("play");
      }
    }
  }

  leave(socket) {
	  if(this.#clients.has(socket) == true ){
			//[socket, userName]
		  for (const [key, value] of this.#clients) {
				if(key  != socket){
          key.emit('disconnectGame');
          console.log(`disconnection from ${socket.id}`);
        }
		  }
		this.#clients.clear();
	  }
  }

  updatePaddle(socket,arg) {
    if(this.#clients.size == 2){
      //si on a plus de 2 joueur cela fonctionne toujours grace au parcours
      for (const [key, value] of this.#clients) {
          if(key  != socket)
            key.emit("updatePaddle",arg);
      }
    }
  }

  ballValue(socket,x,y,shiftx,shifty){
    //console.log("ballemit");
    if(this.#clients.size == 2){
      //si on a plus de 2 joueur cela fonctionne toujours grace au parcours
      for (const [key, value] of this.#clients) {
          if(key  != socket){
            key.emit("ball",x,y,shiftx,shifty);
          }
      }
    }
  }

  score(socket,gauche,droite){
    //console.log("score");
    if(this.#clients.size == 2){
      //si on a plus de 2 joueur cela fonctionne toujourd grace au parcours
      for (const [key, value] of this.#clients) {
          if(key  != socket)
            key.emit("score",gauche,droite);
      }
    }
  }
}
