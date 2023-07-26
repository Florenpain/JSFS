(()=>{"use strict";class t{constructor(t,e,i,s=0,h=0){this.y=e,this.x=t,this.img=new Image,this.img.src=i,this.shiftX=s,this.shiftY=h}get width(){return this.img.width}get height(){return this.img.height}move(){this.x=this.x+this.shiftX,this.y=this.y+this.shiftY}draw(t){t.drawImage(this.img,this.x,this.y)}stopMoving(){this.shiftX=0,this.shiftY=0}}class e extends t{constructor(t,e,i){super(t,e,"./images/balle24.png",7,0),this.theGame=i}move(){this.y<=0||this.y+this.height>=this.theGame.canvas.height?this.shiftY=-this.shiftY:this.collisionWith(this.theGame.paddleLeft)?this.bounceRight(this.theGame.paddleLeft.bounceValue(this.getY())):this.collisionWith(this.theGame.paddleRight)?this.bounceLeft(this.theGame.paddleRight.bounceValue(this.getY())):this.x<=0?(this.reset(),this.theGame.updateScore(this.theGame.pointsLeft,this.theGame.pointsRight+1)):this.x+this.width>=this.theGame.canvas.width&&(this.reset(),this.theGame.updateScore(this.theGame.pointsLeft+1,this.theGame.pointsRight)),super.move()}reset(){this.x=this.theGame.canvas.width/2,this.y=this.theGame.canvas.height/2,this.shiftY=0,this.shiftX=0}bounceRight(t){const e=Math.abs(t);this.shiftX=10-e,this.shiftY=t}bounceLeft(t){const e=Math.abs(t);this.shiftX=-(10-e),this.shiftY=t}getY(){return this.y}collisionWith(t){let e=Math.max(this.x,t.x),i=Math.min(this.x+this.width,t.x+t.width),s=Math.max(this.y,t.y),h=Math.min(this.y+this.height,t.y+t.height);return e<i&&s<h}}class i extends t{constructor(t,e,i){super(t,e,"./images/paddle.png",0,0),this.theGame=i,this.MoveState={UP:0,DOWN:1,IMMOBILE:2},this.moving=this.MoveState.IMMOBILE}move(){(this.y<=0||this.y+this.height>=this.theGame.canvas.height)&&(this.y=Math.min(Math.max(this.y,0),this.theGame.canvas.height-this.height)),super.move()}getY(){return this.y}setY(t){this.y=t}moveUp(){!0<=this.y+this.height&&(this.shiftY=-8,this.moving=this.MoveState.UP)}moveDown(){!this.theGame.canvas.height<=this.y&&(this.shiftY=8,this.moving=this.MoveState.DOWN)}moveImmobile(){this.shiftY=0,this.moving=this.MoveState.IMMOBILE}bounceValue(t){const e=this.height/10;return(t-this.y)/e-5}}class s{constructor(t){this.isFirstPlayer=null,this.isSocket=!1,this.pointsLeft=0,this.pointsRight=0,this.raf=null,this.play=!1,this.canvas=t,this.ball=new e(this.canvas.width/2,this.canvas.height/2,this),this.paddleLeft=new i(25,this.canvas.height/2,this),this.paddleRight=new i(this.canvas.width-50,this.canvas.height/2,this)}start(){this.isSocket||(this.startsocket(),this.animate())}startsocket(){this.socket=io(),this.socket.on("welcome",(()=>console.log("connection with server done"))),this.socket.on("first",(()=>{console.log("you are the first client"),this.isFirstPlayer=!0})),this.socket.on("second",(()=>{console.log("you are the second client"),this.isFirstPlayer=!1})),this.socket.on("tooMuchPlayers",(()=>console.log("already 2 players"))),this.socket.on("updatePaddle",(t=>this.updatePaddle(t))),this.socket.on("ball",((t,e,i,s)=>this.updateBall(t,e,i,s))),this.socket.on("play",(()=>this.play=!0)),this.socket.on("score",((t,e)=>this.updateScore(t,e))),this.socket.on("disconnectGame",(()=>this.stop())),this.socket.emit("greatings"),this.isSocket=!0}animate(){this.moveAndDraw(),this.raf=window.requestAnimationFrame(this.animate.bind(this))}moveAndDraw(){if(1==this.play){const t=this.canvas.getContext("2d");t.clearRect(0,0,this.canvas.width,this.canvas.height),this.paddleRight.move(),this.paddleRight.draw(t),this.paddleLeft.move(),this.paddleLeft.draw(t),this.ball.move(),this.ball.draw(t)}}updatePaddle(t){this.isFirstPlayer?0==t?this.paddleRight.moveDown():1==t?this.paddleRight.moveUp():this.paddleRight.moveImmobile():0==t?this.paddleLeft.moveDown():1==t?this.paddleLeft.moveUp():this.paddleLeft.moveImmobile()}updateScore(t,e){this.pointsLeft=t,this.pointsRight=e,document.getElementById("right").textContent=this.pointsRight.toString(),document.getElementById("left").textContent=this.pointsLeft.toString()}updateBall(t,e,i,s){this.ball.x=t,this.ball.y=e,this.ball.shiftX=i,this.ball.shiftY=s}stop(){this.socket.emit("disconnectGame"),window.cancelAnimationFrame(this.raf),document.getElementById("message").textContent="You have been disconnected , the page will be reloaded.",console.log("You have been disconnected , the page will be reloaded."),setTimeout((()=>{location.reload()}),2e3)}keyDownActionHandler(t){switch(t.key){case"ArrowUp":this.isFirstPlayer?(this.paddleLeft.moveUp(),this.socket.emit("updatePaddle",1)):(this.paddleRight.moveUp(),this.socket.emit("updatePaddle",1));break;case"ArrowDown":this.isFirstPlayer?(this.paddleLeft.moveDown(),this.socket.emit("updatePaddle",0)):(this.paddleRight.moveDown(),this.socket.emit("updatePaddle",0));break;case"r":this.isFirstPlayer&&0==this.ball.shiftX&&0==this.ball.shiftY&&(this.pointsLeft<this.pointsRight?this.ball.shiftX=-7:this.ball.shiftX=7,this.socket.emit("ballValue",this.ball.x,this.ball.y,this.ball.shiftX,this.ball.shiftY));break;default:return}t.preventDefault()}keyUpActionHandler(t){switch(t.key){case"ArrowUp":case"ArrowDown":this.isFirstPlayer?(this.paddleLeft.moveImmobile(),this.socket.emit("updatePaddle",2)):(this.paddleRight.moveImmobile(),this.socket.emit("updatePaddle",2));break;default:return}t.preventDefault()}}window.addEventListener("load",(()=>{const t=document.getElementById("field"),e=new s(t);window.addEventListener("keydown",e.keyDownActionHandler.bind(e)),window.addEventListener("keyup",e.keyUpActionHandler.bind(e)),document.getElementById("start").addEventListener("click",(()=>a(e)))}));let h=!1;const a=t=>{h?(document.getElementById("start").value="Play",t.stop()):(t.start(),document.getElementById("start").value="Disconnect"),h=!h}})();