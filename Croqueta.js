'use strict';

//la funcion constructura de mi croqueta 
function Croqueta(canvas) { //propieades...
    this.canvas = canvas; //ctx is a method inside canvas
    this.ctx = this.canvas.getContext('2d');
    this.width = 116;
    this.height = 119.5;
    this.x = 20;
    this.y = (this.canvas.height / 2) - this.height / 2;  // centro de cuadrado - height divided by 2 - AND subtract half the height of the cuadrado  
    this.lives = 3;
    this.rescatado = 0;
    this.velocity = 1;
    this.direction = 1;
    this.color = 'darkorange';
    this.gravity = 0.98;
 
    //CROQUETA Image object.
    this.img = new Image();
    this.img.src = 'CROQUETA.png';
    //the x coordinates
    var x = this.x;
    //the y coordinates
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
    this.ctx.fillStyle = this.color; //ctx is the pen
    this.ctx.fillRect(this.x, this.y, this.width, this.height)
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height) 

        // ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
        //     0, 0, canvas.width, canvas.height);     // destination rectangle


   // this.ctx.fillRect(this.x, this.y, this.width, this.height) 
}

// // anadir metodo en player to set direction - igual de una funcion

Croqueta.prototype.setDirection = function(newDirection) {
    this.velocity = - 20;
}

// does not allow for the croqueta to go bellow canvas

Croqueta.prototype.checkBottom = function() {
    if (this.y > this.canvas.height - this.height) {
        this.y = this.canvas.height - this.height;
    }
}



