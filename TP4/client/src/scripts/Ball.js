import Mobile from './Mobile.js';

// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 7;
const SHIFT_Y = 0;

/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
  }

  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
      // bounce on top or bottom
      this.shiftY = - this.shiftY;    
    }
    else if(this.collisionWith(this.theGame.paddleLeft)){
      // bounce with the left paddle
      this.bounceRight(this.theGame.paddleLeft.bounceValue(this.getY()));
    }
    else if(this.collisionWith(this.theGame.paddleRight)){
      // bounce with the right paddle
      this.bounceLeft(this.theGame.paddleRight.bounceValue(this.getY()));
    }
    else if(this.x <= 0){
      // if ball is out of the canvas on the left side
      this.reset();
      this.theGame.updateScore(this.theGame.pointsLeft,this.theGame.pointsRight+1);
    }
    else if(this.x + this.width >= this.theGame.canvas.width){
      // if ball is out of the canvas on the right side
      this.reset();
      this.theGame.updateScore(this.theGame.pointsLeft+1,this.theGame.pointsRight);
    }
    super.move();
  }

  /*
  * reset the ball to the center of the canvas
  */
  reset(){
    this.x=this.theGame.canvas.width/2;
    this.y=this.theGame.canvas.height/2
    this.shiftY = 0;
    this.shiftX = 0;
  }

  //x + y =7
  bounceRight(ydiff){
    const xy=10;
    const nbr = Math.abs(ydiff);
    this.shiftX=xy-nbr;
    this.shiftY=ydiff;
  }

  bounceLeft(ydiff){
    const xy=10;
    const nbr = Math.abs(ydiff);
    this.shiftX= -(xy-nbr);
    this.shiftY=ydiff;
  }

  getY(){
    return this.y;
  }

  collisionWith(mobile){
		let p1x=Math.max(this.x,mobile.x);
		let p2x=Math.min(this.x+this.width,mobile.x+mobile.width);

		let p1y=Math.max(this.y,mobile.y);
		let p2y=Math.min(this.y+this.height,mobile.y+mobile.height);

	  return(p1x < p2x && p1y < p2y);
	}
}
