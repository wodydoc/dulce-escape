'use strict';

function main(){
    var mainElement = document.querySelector('#site-main');

    function buildDom(html) {
        mainElement.innerHTML = html;
        return mainElement;
    };
//-----------------------------------screen 1 Select Play or Menú
    function createSplashScreen() {
        var splashScreen = buildDom(`
            <section>
                <section style="background-color: #FF5733;">
                <h1>
                    Un 
                    <br>
                        Dulce 
                    <br>
                            Escape
                </h1>

                <button>PLAY</button> 

                <button class="menu-button">MENÚ</button> 
            </section>
        `); //change class to differentiate
        //----------------------------------------------------------------------button to go to Game
        var playButton = document.querySelector('button'); //tag called button
        playButton.addEventListener('click', createGameScreen);
        //----------------------------------------------------------------------button to go to Menu
        var menuButton = document.querySelector('.menu-button'); //classes with dots, id's with #, tags with nothing 
        menuButton.addEventListener('click', createMenuScreen);
    };
//-----------------------------------screen1.2 Menú
    function createMenuScreen() {
        var menuScreen = buildDom(`
            <section>
                <h1>MENÚ</h1>

                <button class="close-button">CLOSE</button>

            </section>
        `);
        var closeButton = document.querySelector('.close-button');
        closeButton.addEventListener('click', createSplashScreen);

    };
//-----------------------------------screen 2 Game
    function createGameScreen() {
        var gameScreen = buildDom(`
            <section>
                <h2> 
                    <div class="life"> </div> 
                    <p class="saved"> </p>
                </h2>

                <canvas width="1600" height="800"></canvas>
            </section>
        `);
        var canvasElement = document.querySelector('canvas');
        var gameInstance = new Game(canvasElement); //game es una instancia dentro de Game - y la funcion constructura es Game
        gameInstance.gameOverCallback(createGameOverScreen)
        gameInstance.startGame();



        // para mover el jugador
        document.addEventListener('keydown', function(event) { 
            if(event.key === 'ArrowDown') { //ir hacía abajo
                gameInstance.croqueta.setDirection(1);
            } else if(event.key === 'ArrowUp') { //ir hacía arriba
                gameInstance.croqueta.setDirection(-1);
            }
        });

    };
//-----------------------------------screen 3 Game Over
    function createGameOverScreen() {
        var gameOverScreen = buildDom(`
            <section>
                <h1>GRACIAS POR SU VISITA</h1>
                <h2> 
                    <p class="saved"> </p>
                </h2>
                <button class = "restart-button">PLAY AGAIN</button>
            </section>
        `)

        var restartButton = document.querySelector('.restart-button');
        restartButton.addEventListener('click', createGameScreen); //para volver
    };    

    createSplashScreen();

};

window.addEventListener('load', main);




// debugger;