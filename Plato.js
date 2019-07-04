'use strict';

//propieades...
function Plato(canvas, randomY) { //canvas es parametro 
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.width = 240;
    this.height = 240;
    this.x = this.canvas.width; //from the right side
    this.y = 650; //the y line it will stay on
    // this.y = this.canvas.height / 2; //randomly moving up and down -- 20 to change table 
    this.velocity = 5; //speeds up the
    this.direction = -1; //menos uno siempre, direccion de enemigos nunca va a cambiar
    this.color = 'rgb(180, 72, 10)';


    //PLATO Image object.
    this.img = new Image();
    this.img.src = 'WHITE-PLATE.png';
    //the x coordinates
    var x = this.x;
    //the y coordinates
    var y = this.y;
}

//metodos....
Plato.prototype.move = function() {
    this.x = this.x + this.direction * this.velocity; // siempre reducir por tres
}

Plato.prototype.draw = function() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
}