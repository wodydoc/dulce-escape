'use strict';

function Toothpick(canvas, croquetaY) {
    this.canvas = canvas; //ctx is a method inside canvas
    this.ctx = this.canvas.getContext('2d');
    this.width = 80;
    this.height = 20;
    this.x = 0; //from the left side
    this.y = croquetaY; //the y line it will stay on
    
    // this.y = this.canvas.height / 2; //randomly moving up and down -- 20 to change table 
    this.velocity = 10; //speeds up the
    this.direction = 1; 
    this.color = 'red';
}

//metodos....
Toothpick.prototype.move = function() {
    this.x = this.x + this.direction * this.velocity; // siempre reducir por tres
}

Toothpick.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  //  this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}

