import Ball from './Ball.js';
import Paddle from './Paddle.js';

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.isFirstPlayer = null;
	  this.isSocket = false;
    this.pointsLeft=0;
    this.pointsRight=0;
    this.raf = null;
    this.play=false;
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddleLeft = new Paddle(25, this.canvas.height/2, this);
    this.paddleRight = new Paddle(this.canvas.width-50, this.canvas.height/2, this);
  }
  
  /** start this game animation */
  start() {
  if(!this.isSocket){
    this.startsocket();
    this.animate();
    }
  }

  startsocket(){
		this.socket = io();
		this.socket.on('welcome', () => console.log('connection with server done') );

		this.socket.on('first', () => { console.log('you are the first client'); this.isFirstPlayer = true; });
		this.socket.on('second', () => {console.log('you are the second client') ; this.isFirstPlayer = false;});
		this.socket.on('tooMuchPlayers', () => console.log('already 2 players') );

    // 0 down ; 1 up ; 2 immobile
    this.socket.on('updatePaddle', (arg) => this.updatePaddle(arg) );
    this.socket.on('ball', (x,y,shiftx,shifty) => this.updateBall(x,y,shiftx,shifty));
    
    this.socket.on('play', () => this.play = true );
    this.socket.on('score', (left,right) => this.updateScore(left,right));
		this.socket.on('disconnectGame', () => this.stop() );
    
		this.socket.emit('greatings');
		this.isSocket=true;
  }
  
  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }

  /** move then draw the bouncing ball */
  moveAndDraw() {
    if(this.play == true ){
      const ctxt = this.canvas.getContext("2d");
      ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.paddleRight.move();
      this.paddleRight.draw(ctxt);

      this.paddleLeft.move();
      this.paddleLeft.draw(ctxt);

      this.ball.move();
      this.ball.draw(ctxt);
    }
  }

  updatePaddle(arg){
    if(this.isFirstPlayer){
      if(arg == 0){
        this.paddleRight.moveDown();
      }
      else if(arg == 1){
        this.paddleRight.moveUp();
      }
      else {
        this.paddleRight.moveImmobile();
      }
    }
    else {
      if(arg == 0){
        this.paddleLeft.moveDown();
      }
      else if(arg == 1){
        this.paddleLeft.moveUp();
      }
      else {
        this.paddleLeft.moveImmobile();
      }
    }
  }

  updateScore(left,right){
    this.pointsLeft=left;
    this.pointsRight=right;
    document.getElementById('right').textContent=this.pointsRight.toString();
    document.getElementById('left').textContent=this.pointsLeft.toString();
  }

  updateBall(x,y,shiftx,shifty){
      this.ball.x=x;
      this.ball.y=y;
      this.ball.shiftX=shiftx;
      this.ball.shiftY=shifty;
  }

  /** stop this game animation */
  stop() {
    this.socket.emit('disconnectGame');
    window.cancelAnimationFrame(this.raf);
    document.getElementById('message').textContent="You have been disconnected , the page will be reloaded.";
    console.log('You have been disconnected , the page will be reloaded.');
    setTimeout(() => {  location.reload(); }, 2000);
  }

  keyDownActionHandler(event) {
   switch (event.key) {

	  case "ArrowUp":
      if(this.isFirstPlayer){
        this.paddleLeft.moveUp(); // 1 pour up et 0 pour down
        this.socket.emit('updatePaddle', 1);
      }
      else {
        this.paddleRight.moveUp();  // 1 pour up et 0 pour down
        this.socket.emit('updatePaddle', 1);
      }
      break;

	  case "ArrowDown":
      if(this.isFirstPlayer){
        this.paddleLeft.moveDown(); // 1 pour up et 0 pour down
        this.socket.emit('updatePaddle', 0);
      }
      else {
        this.paddleRight.moveDown();  // 1 pour up et 0 pour down
        this.socket.emit('updatePaddle', 0);
      }
      break;

    case "r":
      if(this.isFirstPlayer && this.ball.shiftX == 0 && this.ball.shiftY == 0){
        if(this.pointsLeft < this.pointsRight){
          this.ball.shiftX=(-7);
        }
        else {
          this.ball.shiftX=7
        }
        this.socket.emit('ballValue',this.ball.x,this.ball.y,this.ball.shiftX,this.ball.shiftY);
      }
      break;

    default: 
      return;
   }
   event.preventDefault();
}

keyUpActionHandler(event) {

    switch (event.key) {

      case "ArrowUp":
        if (this.isFirstPlayer){
          this.paddleLeft.moveImmobile();
          this.socket.emit('updatePaddle',2);
        }
        else {
          this.paddleRight.moveImmobile();
          this.socket.emit('updatePaddle',2);
        }
        break;

      case "ArrowDown":
        if (this.isFirstPlayer){
          this.paddleLeft.moveImmobile();
          this.socket.emit('updatePaddle',2);
        }
        else {
          this.paddleRight.moveImmobile();
          this.socket.emit('updatePaddle',2);
        }
        break;

      default: 
        return;
    }
    event.preventDefault();
  }
}
