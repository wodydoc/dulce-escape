"use strict";

//crear un function constructura:
function Game(canvas) {
  this.canvas = canvas;
  this.ctx = this.canvas.getContext("2d");
  this.croqueta = null;
  this.platos = [];
  this.amigos = [];
  this.toothpicks = [];
  this.isGameOver = false;
  this.onGameOver = null;
  this.difficulty = 240; //60 is one second, 120 is two, ...

  //BACKGROUND Image object.
//   this.img = new Image();
//   this.img.src = "TASCA-01.png";
  //the x coordinates
  var x = this.x;
  //the y coordinates
  var y = this.y;
}

// LOOOOOP - definir los metodos

//---vv---this is the method inside Game
Game.prototype.startGame = function() {
  //inicializar player - // y pasar el canvas como parametro - canvas es el propiedad que tenemos arriba ^^
  this.croqueta = new Croqueta(this.canvas);
  var counter = 0;

  var loop = () => {
    //en vez de poner function abajo usamos arrrow function  -originalmente- var loop = function() { //arrow functions no crean contexto local

    counter++;

    if (counter > this.difficulty) {
      //framerate 60 fps - 120 2 secs
      //----------PLATOS
      var randomY = Math.random() * this.canvas.height - 50; //how spaced plates
      var newPlato = new Plato(this.canvas, randomY);
      this.platos.push(newPlato); //llama a propiedad arriba ^^
      //----------AMIGOS
      var randomYamigos = Math.random() * this.canvas.height - 150; //how spaced amigos
      var newAmigo = new Amigo(this.canvas, randomYamigos);
      this.amigos.push(newAmigo); //llama a propiedad arriba ^^
      counter = 0; //sets back to 0
      //----------TOOTHPICKS
      //how spaced plates
    }

    this.life(); //#OF LIVES LEFT
    this.saved(); //#OF AMIGOS SAVED

    this.update();
    //updates
    this.clear();
    //clears
    this.draw();
    //draws
    this.clearPlates();
    this.checkCollisions();
    if (!this.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      this.onGameOver(this.croqueta.rescatado);
    }
  };
  loop();
};

Game.prototype.clearPlates = function() {
    this.platos.forEach((plato,index)=> {
        if(plato.x< (-plato.width)){
            this.platos.splice(index,1);
        }
    })
}

//update--vv
Game.prototype.update = function() {
  this.handleShooting();
  this.croqueta.move();
  if (this.toothpicks) {
    this.toothpicks.forEach(function(toothpick) {
      toothpick.move();
    });
  }
  this.platos.forEach(function(plato) {
    plato.move();
  });
  this.amigos.forEach(function(amigo) {
    amigo.move();
  });
};

//clear--vv--
Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //4: position initial, width, height
};

//draw--vv
Game.prototype.draw = function() {
  this.croqueta.draw();
//   this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  if (this.toothpicks) {
    this.toothpicks.forEach(function(toothpick) {
      toothpick.draw();
    });
  }
  this.platos.forEach(function(plato) {
    plato.draw();
  });
  this.amigos.forEach(function(amigo) {
    amigo.draw();
  });
};

//CONDICIONES -
Game.prototype.checkCollisions = function() {
  //llammar checkCollisions en el loop

  //-----collisiones btwn TOOTHPICK and PLATO
  this.platos.forEach((plato, platoIndex) => {
    this.toothpicks.forEach((toothpick, index) => {
      // USING 2 FOR EACH BECAUSE THERE ARE 2 ARRAYS
      var rightLeft = plato.x + plato.width >= toothpick.x; //ca
      var leftRight = plato.x <= toothpick.x + toothpick.width; //ac
      var bottomTop = plato.y + plato.height >= toothpick.y; //db
      var topBottom = plato.y <= toothpick.y + toothpick.height; //bd

      //donde tenemos que comprobar si verdaderos o no
      if (rightLeft && leftRight && bottomTop && topBottom) {
        // console.log('collision') --- we need it to say game over, minus lives
        // console.log("shooting plate")
        this.toothpicks.splice(index, 1);
        this.platos.splice(platoIndex, 1);
      }
    });
  });

  //-----collisiones btwn CROQUETA and PLATO
  this.platos.forEach((plato, index) => {
    //arrow function
    var rightLeft = this.croqueta.x + this.croqueta.width >= plato.x; //ca
    var leftRight = this.croqueta.x <= plato.x + plato.width; //ac
    var bottomTop = this.croqueta.y + this.croqueta.height >= plato.y; //db
    var topBottom = this.croqueta.y <= plato.y + plato.height; //bd

    //donde tenemos que comprobar si verdaderos o no
    if (rightLeft && leftRight && bottomTop && topBottom) {
      this.platos.splice(index, 1);
      this.croqueta.lives--; //SPLICING lives 3

      if (this.croqueta.lives === 0) {
        //cambiar estado de juego
        this.isGameOver = true;
      }
    }
  });

  //-----collisiones btwn CROQUETA and AMIGOS
  this.amigos.forEach((amigo, index) => {
    //arrow function
    var rightLeft = this.croqueta.x + this.croqueta.width >= amigo.x; //ca
    var leftRight = this.croqueta.x <= amigo.x + amigo.width; //ac
    var bottomTop = this.croqueta.y + this.croqueta.height >= amigo.y; //db
    var topBottom = this.croqueta.y <= amigo.y + amigo.height; //bd

    //donde tenemos que comprobar si verdaderos o no
    if (rightLeft && leftRight && bottomTop && topBottom) {
      if (!amigo.isColliding) {
        this.amigos.splice(index, 1);
        this.croqueta.rescatado++; //SPLICING amigos rescatados #
        amigo.isColliding = true;
      }

      if (this.croqueta.rescatado) {
        //cambiar estado de juego
        this.difficulty = 240 - 10 * this.croqueta.rescatado;
      }
    } else {
      amigo.isColliding = false;
    }
  });
};

Game.prototype.life = function() {
  var div = document.querySelector(".life");
  div.innerHTML = "Vidas Restantes: " + this.croqueta.lives;
};

Game.prototype.saved = function() {
  var p = document.querySelector(".saved");
  p.innerHTML = "Amigos Rescatados: " + this.croqueta.rescatado;
};

//un metodo para final screen

Game.prototype.gameOverCallback = function(buildGameOverScreen) {
  this.onGameOver = buildGameOverScreen;
};

Game.prototype.handleShooting = function() {
  if (this.croqueta.isShooting) {
    var newToothpick = new Toothpick(this.canvas, this.croqueta.y);
    this.toothpicks.push(newToothpick); //llama a propiedad arriba ^^
  }
  this.croqueta.isShooting = false;
};
