"use strict";

function main() {
  var mainElement = document.querySelector("#site-main");

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }
  //-----------------------------------screen 1 Select Play or Menú
  function createSplashScreen() {
    var splashScreen = buildDom(`
            <section class="splash-screen">
                <div class="container">
                    <div class="game-title">
                        <h1>Un<br>Dulce<br>Escape</h1>
                    </div>
                    <div class="button-field">
                        <div class="croqueta-menu">
                            <img src='./croqueta-nikes.png'>
                        </div>
                        <div class="buttons">
                            <button>DALE</button> 
                            <button class="menu-button">MENÚ</button>
                        </div>
                    </div>
                    </div>

                </div>
            </section>
        `);
    //----------------------------------------------------------------------button to go to Game
    var playButton = document.querySelector("button"); //tag called button
    playButton.addEventListener("click", createGameScreen);
    //----------------------------------------------------------------------button to go to Menu
    var menuButton = document.querySelector(".menu-button"); //classes with dots, id's with #, tags with nothing
    menuButton.addEventListener("click", createMenuScreen);
  }
  //-----------------------------------screen1.2 Menú
  function createMenuScreen() {
    var menuScreen = buildDom(`
            <section class="menu-screen">
                <div class="container">
                    <h1 class="game-title">Menú<br>del<br>Día</h1>
                    <div>
                    <h3>-----   ¡La Vida!   -----</h3>
                    </div>
                    <div>
                    <h3>-----  ¡La Muerte!  -----</h3>
                    </div>
                        <p class="underundertext">
                        PRESS SPACE to shoot palillos at threats<br>Press UP to rescue amigos
                        </p>
                    </div>
                    <div>
                        <img src='./cockroach.png'>
                    </div>
                    <div>
                        <button class="close-button">VOLVER</button>
                    </div>
                </div>

            </section>
        `);
    var closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", createSplashScreen);
  }
  //-----------------------------------screen 2 Game
  function createGameScreen() {
    var gameScreen = buildDom(`
            <section>
                <section class="container">
                    <div class="info-game"> 
                    <p class="life"></p> 
                    <p class="saved"></p>
                    </div>
                </section>

                <canvas width="800" height="600"></canvas>
            </section>
        `);
    var canvasElement = document.querySelector("canvas");
    var gameInstance = new Game(canvasElement); //game es una instancia dentro de Game - y la funcion constructura es Game
    gameInstance.gameOverCallback(createGameOverScreen);
    gameInstance.startGame();

    // PARA CONTROLAR EL JUGADOR
    document.addEventListener("keydown", function(event) {
      console.log(event);
      if (event.key === "ArrowDown") {
        //ir hacía abajo
        gameInstance.croqueta.setDirection(1);
      } else if (event.key === "ArrowUp") {
        //ir hacía arriba
        gameInstance.croqueta.setDirection(-1);
      } else if (event.keyCode === 32) {
        gameInstance.croqueta.shoot();
      }
    });
  }
  //-----------------------------------screen 3 Game Over
  function createGameOverScreen(score) {
    var gameOverScreen = buildDom(`
            <section class="game-over-screen">
                <section>
                    <h1 class="game-title">Gracias por su visita</h1>
                        <p>You saved</p> <p class="saved"></p>
                        <p class = "message">amigos from being eaten!!!</p>
                </p>

            <section>
                <button class = "restart-button">¿OTRA VEZ?</button>
            </section>
        `);
    document.querySelector(".saved").innerHTML = score;
    var restartButton = document.querySelector(".restart-button");
    restartButton.addEventListener("click", createGameScreen); //para volver
  }

  createSplashScreen();
}

window.addEventListener("load", main);

// debugger;
