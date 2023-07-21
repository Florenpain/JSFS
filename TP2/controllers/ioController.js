export default class IOController {
  #io;
  #clients;
  #timer ;
  #socket;

  constructor(io) {
    this.#io = io;
    this.#clients = new Map();
    this.#timer = new Map() ;
    /*
    // Version où on envoie le même nombre à tous les clients :
    setInterval( this.random2.bind(this), 2000 );
    */
  }

  get clients(){
    return this.#clients;
  }

  registerSocket(socket) {
    console.log(`new connection with id ${socket.id}`);
    let intervalID = setInterval( this.random.bind(this), 2000 , socket);
    this.#timer.set(socket, intervalID);
    this.setupListeners(socket);
  }

  setupListeners(socket) {
    socket.on( 'greatings'  , user => this.greatings(socket, socket.data.username) );
    socket.on( 'disconnect' , () => this.leave(socket) );
  }

  greatings(socket, userName) {
    console.log(`greatings received from ${userName} (id : ${socket.id})`);
    this.#clients.set(socket.id, userName);
    socket.emit('welcome');
    socket.broadcast.emit('new user', userName);
  }

  leave(socket) {
    const userName = 'unknown' || this.#clients.get(socket.id);
    console.log(`disconnection from ${socket.id} (user : ${userName})`);
    this.#clients.delete(socket.id);

    clearInterval(this.#timer.get(socket)) ;
    this.#timer.delete(socket);

  }

  //Version où on envoie un nombre différent à chaque client
  random(socket) {
    let randomValue = Math.floor((Math.random() * 8)+1) ;
    console.log(`Nombre aléatoire : ${randomValue}`) ;
    socket.emit('random', randomValue);
  }
  /*
  //Version où on envoie le même nombre à tous les clients
  random2() {
    let randomValue = Math.floor((Math.random() * 8)+1) ;
    console.log(`Nombre aléatoire : ${randomValue}`) ;
    this.#io.emit('random', randomValue);
  }
  */
}
