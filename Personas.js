'use strict';

//propieades...
function Amigo(canvas, randomYamigos) { //canvas es parametro 
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = 100;
    this.height = 61.5;
    this.x = this.canvas.width; //from the right side
    this.y = randomYamigos;
    
    // this.y = this.canvas.height / 2; //randomly moving up and down -- 20 to change table 
    this.velocity = 5; //speeds up the plates
    this.direction = -1; //menos uno siempre, direccion de enemigos nunca va a cambiar
    this.color = 'rgb(180, 72, 10)';
    this.isColliding = false;

    this.img = new Image();
    this.img.src = 'TORTILLA.png'
    var x = this.x;
    var y = this.y;
}

//metodos....
Amigo.prototype.move = function() {
    this.x = this.x + this.direction * this.velocity; // siempre reducir por tres
    this.runSpace();
}

Amigo.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}


Amigo.prototype.runSpace = function() {
    if (385 > this.canvas.height - this.height) {
        this.y = this.canvas.height - this.height;
    }
}