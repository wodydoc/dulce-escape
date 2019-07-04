'use strict';

//crear un function constructura: 
function Game(canvas){
    this.croqueta = null;
    //this.croqueta = new component(30, 30, "CROQUETA.png", 10, 120, "image");;
    this.platos = [];
    this.amigos = [];
    this.toothpicks = [];
    this.isGameOver = false;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.onGameOver = null; //
    this.difficulty = 120;

}


//definir los metodos 
//para escribir un metodo de empezar el juego
//---vv---this is the method inside Game
Game.prototype.startGame = function() {
    //inicializar player 
    //y pasar el canvas como parametro - canvas es el propiedad que tenemos arriba ^^
    this.croqueta = new Croqueta(this.canvas);

    //en vez de poner function abajo usamos arrrow function  -originalmente- var loop = function() {
        var counter = 0;
        var loop = () => {      //arrow functions no crean contexto local
    //     if(Math.random() > 0.97) { //math.random 99
    //         var randomY = Math.random() * this.canvas.height - 50; //how spaced plates 
    //         var newPlato = new Plato(this.canvas, randomY);
    //         this.platos.push(newPlato); //llama a propiedad arriba ^^
    //     }
        counter++; 
            
        if(counter > this.difficulty){  //framerate 60 fps - 120 2 secs
            //----------PLATOS
            var randomY = Math.random() * this.canvas.height - 50; //how spaced plates 
            var newPlato = new Plato(this.canvas, randomY);
            this.platos.push(newPlato); //llama a propiedad arriba ^^
            //----------AMIGOS
            var randomYamigos = Math.random() * this.canvas.height - 150; //how spaced amigos
            var newAmigo = new Amigo(this.canvas, randomYamigos);
            console.log(randomYamigos)
            this.amigos.push(newAmigo); //llama a propiedad arriba ^^
            counter = 0; //sets back to 0
            //----------TOOTHPICKS
            //how spaced plates 
            
        }

        // if(counter === 120){  //framerate 60 fps - 120 2 secs
        //     var randomYamigos = Math.random() * this.canvas.height - 50; //how spaced amigos
        //     var newAmigo = new Amigo(this.canvas, randomYamigos);
        //     this.amigos.push(newAmigo); //llama a propiedad arriba ^^
        //     counter = 0; //sets back to 0
        // }






        this.life();
        this.saved();

        this.update();
        //update
        this.clear();
        //clear
        this.draw();
        //draw
        this.checkCollisions()
        if(!this.isGameOver) {
            requestAnimationFrame(loop)
        } else {
            this.onGameOver();
        }
    };
    loop();
}



//update--vv
Game.prototype.update = function() {
    this.handleShooting()
    this.croqueta.move();
    if(this.toothpicks) {
        this.toothpicks.forEach(function(toothpick) {
            toothpick.move();
        })
    }
    this.platos.forEach(function(plato) {
        plato.move();
    })
    this.amigos.forEach(function(amigo) {
        amigo.move();
    })
}
//clear--vv-- clears the canvas, has to call context
Game.prototype.clear = function() {
    console.log('clear');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);     //4: position initial, width, height
}

//draw--vv
Game.prototype.draw = function() {
    this.croqueta.draw();
    if(this.toothpicks) {
        this.toothpicks.forEach(function(toothpick) {
            toothpick.draw();
        })
    }
    this.platos.forEach(function(plato) {
        plato.draw();
    })
    this.amigos.forEach(function(amigo) {
        amigo.draw();
    })
}








//CONDICIONES - 
Game.prototype.checkCollisions = function() { //llammar checkCollisions en el loop
    //-----collisiones btwn toothpick and enemy
    this.platos.forEach((plato, platoIndex) =>{
        this.toothpicks.forEach((toothpick, index) => {   //TWO FOR EACH BECAUSE THERE ARE TWO ARRAYS
            var rightLeft = plato.x + plato.width >= toothpick.x; //ca
            var leftRight = plato.x <= toothpick.x + toothpick.width; //ac
            var bottomTop = plato.y + plato.height >= toothpick.y; //db
            var topBottom = plato.y <= toothpick.y + toothpick.height; //bd
    
            //donde tenemos que comprobar si verdaderos o no
            if (rightLeft && leftRight && bottomTop && topBottom) {
                // console.log('collision') --- we need it to say game over, minus lives 
                console.log("shooting plate")
                this.toothpicks.splice(index, 1);
                this.platos.splice(index,1);
    
                
            }
        })
    })





    //-----collisiones btwn croqueta and plato - lives 3
    this.platos.forEach((plato, index) => {   //arrow function
        var rightLeft = this.croqueta.x + this.croqueta.width >= plato.x; //ca
        var leftRight = this.croqueta.x <= plato.x + plato.width; //ac
        var bottomTop = this.croqueta.y + this.croqueta.height >= plato.y; //db
        var topBottom = this.croqueta.y <= plato.y + plato.height; //bd

        //donde tenemos que comprobar si verdaderos o no
        if (rightLeft && leftRight && bottomTop && topBottom) {
            // console.log('collision') --- we need it to say game over, minus lives 
            
            this.platos.splice(index, 1);
            this.croqueta.lives --;
            
            if(this.croqueta.lives === 0) {
                //cambiar estado de juego
                this.isGameOver = true;
            }
        }
    })



    //-----collisiones btwn croqueta and amigos
    this.amigos.forEach((amigo, index) => {   //arrow function
        var rightLeft = this.croqueta.x + this.croqueta.width >= amigo.x; //ca
        var leftRight = this.croqueta.x <= amigo.x + amigo.width; //ac
        var bottomTop = this.croqueta.y + this.croqueta.height >= amigo.y; //db
        var topBottom = this.croqueta.y <= amigo.y + amigo.height; //bd

        //donde tenemos que comprobar si verdaderos o no
        if (rightLeft && leftRight && bottomTop && topBottom) {
            // console.log('collision') --- we need it to say game over, minus lives 
            if(!amigo.isColliding){
                this.amigos.splice(index, 1);
                this.croqueta.rescatado ++;
                amigo.isColliding = true;
            }
            
            if(this.croqueta.rescatado) {
                //cambiar estado de juego
                this.difficulty = 120 - 10 * this.croqueta.rescatado;
                //this.isGameOver = true;
            }
        } else{amigo.isColliding = false;}
    })
}













Game.prototype.life = function(){
    var div = document.querySelector('.life')
    div.innerHTML = 'Vidas Restantes-' + this.croqueta.lives
}

Game.prototype.saved = function(){
    var p = document.querySelector('.saved')
    p.innerHTML = 'Amigos Rescatados-' + this.croqueta.rescatado
}

//un metodo para final screen

Game.prototype.gameOverCallback = function(buildGameOverScreen) { 
    this.onGameOver = buildGameOverScreen;
}

Game.prototype.handleShooting = function(){
    if(this.croqueta.isShooting){
        var newToothpick = new Toothpick(this.canvas, this.croqueta.y);
        this.toothpicks.push(newToothpick); //llama a propiedad arriba ^^
    }
    this.croqueta.isShooting = false;
}
