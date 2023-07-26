import Mobile from './Mobile.js';

// default values for a paddle : image and shifts
const BALL_IMAGE_SRC = './images/paddle.png';
const SHIFT_X = 0;
const SHIFT_Y = 0;

/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Paddle extends Mobile {

  /**  build a ball
   *
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {

    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
    this.MoveState = { UP : 0, DOWN : 1, IMMOBILE : 2 };
    this.moving=this.MoveState.IMMOBILE;
  }

  move() {
    if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
      // this.shiftY = - this.shiftY;    // rebond en haut ou en bas
      this.y = Math.min(Math.max(this.y, 0), this.theGame.canvas.height - this.height);
    }
    super.move();
  }

  getY(){
    return this.y;
  }

  setY(arg){
    this.y=arg;
  }

  moveUp() {
    if( ! 0 <= this.y+this.height){
      this.shiftY = - 8;
      this.moving = this.MoveState.UP;
    }
  }

  moveDown() {
    if(!this.theGame.canvas.height <= this.y){
      this.shiftY = + 8;
      this.moving = this.MoveState.DOWN;
    }
  }

  moveImmobile() {
    this.shiftY = 0;
    this.moving = this.MoveState.IMMOBILE;
  }

  //shift x + y =5
  // n =5
  bounceValue(yCoordo){
    const n=5;
    const inter=(this.height)/(n*2);
    const yDiff = yCoordo-this.y;
    const fy=yDiff/inter ;
    const nbry= fy-n;
    return nbry;
  }
}
