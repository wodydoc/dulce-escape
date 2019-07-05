'use strict';

//la funcion constructura de mi croqueta 
function Croqueta(canvas) { //propieades...
    this.canvas = canvas; //ctx is a method inside canvas
    this.ctx = this.canvas.getContext('2d');
    this.width = 116;
    this.height = 119.5;
    this.x = 20;
    this.y = (this.canvas.height / 2) - this.height / 2;    // centro de cuadrado  
    this.color = 'rgb(180, 72, 10)';
    this.direction = 1;
    this.velocity = 1;
    this.gravity = 0.98;
    this.lives = 4;
    this.rescatado = 0;
    this.isShooting = false;
 
    //CROQUETA Image object.
    this.img = new Image();
    this.imgOptions = ['croqueta-cowboy', 'croqueta-nikes'];
    this.selected = Math.floor(Math.random() * 2)
    this.img.src = `${this.imgOptions[this.selected]}.png`;  //variable into string 


    var x = this.x;
    var y = this.y;
}

//---------
//metodos... 
Croqueta.prototype.move = function() {
    this.velocity = this.velocity + this.gravity;
    this.y = this.y + this.direction * this.velocity;
    this.checkBottom();
}

Croqueta.prototype.draw = function() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 
    // this.ctx.fillStyle = this.color; //ctx is the pen
    // this.ctx.fillRect(this.x, this.y, this.width, this.height)
}


Croqueta.prototype.setDirection = function(newDirection) {      // set direction - igual de una gameInstance funcion en main.js
    this.velocity = - 20;
}

Croqueta.prototype.checkBottom = function() {               // does not allow for the croqueta to go bellow canvas
    if (this.y > this.canvas.height - this.height) {
        this.y = this.canvas.height - this.height;
    }
}

Croqueta.prototype.shoot = function(){
    this.isShooting = true;
}



