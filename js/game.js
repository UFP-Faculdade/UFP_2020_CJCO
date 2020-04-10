import bootGame from './scene/BootGame.js';
import playGame from './scene/PlayGame.js';
import menu from './scene/Menu.js';


var game;
window.onload = function() {
    var gameConfig = {
        width: 480,
        height: 640,
        backgroundColor: 0x000000,
        scene: [bootGame, playGame,menu],//Cria um array com valores predefinidos
        physics: {//plugins para ter gravidade
            default: "arcade",
            arcade: {
              debug: true
            }
        }
    }

    game = new Phaser.Game(gameConfig);//classe definida para arrancar o jogo
    window.focus();
    resizeGame();
    window.addEventListener("resize", resizeGame);//sempre que modificar o tamanho, executa a funcao e adequa ao tam da janela
}

function resizeGame(){
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
