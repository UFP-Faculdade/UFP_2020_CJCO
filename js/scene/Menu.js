export default class menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }


    create(){

        const width=this.game.config.width;
        const height=this.game.config.height;

        this.bg = this.add.tileSprite(0, 0, width*2, height*4, 'bgMenu');

        this.labelNameKeys = this.add.text(120, 50, "SPACE LT", {
            font: "50px magv5",
            fill: "#ff0000",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.labelNameKeys = this.add.text(150, 170, "PRESS KEYS:", {
            font: "25px magv5",
            fill: "#00cc00",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.labelNameP1 = this.add.text(width-380, height-420, "1 - 1 Player", {
            font: "30px magv5",
            fill: "#00cc00",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.labelNameP2 = this.add.text(width-380, height-360, "2 - 2 Players", {
            font: "30px magv5",
            fill: "#00cc00",
            stroke: "#000000",
            strokeThickness: 6
        });   

        this.labelNameScores = this.add.text(width-380, height-300, "3 - HighScores", {
            font: "30px magv5",
            fill: "#00cc00",
            stroke: "#000000",
            strokeThickness: 6
        });  

        this.labelNameScores = this.add.text(width-380, height-240, "4 - Instructions", {
            font: "30px magv5",
            fill: "#00cc00",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.labelNameExit = this.add.text(width-380, height-180, "0 - Exit Game", {
            font: "30px magv5",
            fill: "#00cc00",
            stroke: "#000000",
            strokeThickness: 6
        });  


        
        //Criados jogo
        this.labelNameScores = this.add.text(width-360, height-50, "Leonel Ferreira", {
            font: "10px magv5",
            fill: "#ffff00",
            stroke: "#ff0000",
            strokeThickness: 3
        });
        this.labelNameScores = this.add.text(width-220, height-50, "Tiago Correia", {
            font: "10px magv5",
            fill: "#ffff00",
            stroke: "#ff0000",
            strokeThickness: 3
        });
        this.labelNameScores = this.add.text(width-280, height-30, "Maio 2020", {
            font: "12px magv5",
            fill: "#ffff00",
            stroke: "#ff0000",
            strokeThickness: 3
        });



        this.input.keyboard.on('keyup_ONE', function () {
            var p1 = prompt("Jogador 1:","Player1");
            this.scene.start("PlayGame",{jogadores: 1, nome1: p1, livesP1: 3, livesP2: 0});
            }, this);
        this.input.keyboard.on('keyup_TWO', function () {
            var p1=prompt("Jogador 1:","Player1");
            var p2=prompt("Jogador 2:","Player2");
            this.scene.start("PlayGame",{jogadores: 2, nome1: p1, nome2: p2, livesP1: 3, livesP2: 3});}, this);
        this.input.keyboard.on('keyup_THREE', function () {this.scene.start("Highscores");}, this);
        this.input.keyboard.on('keyup_FOUR', function () {this.scene.start("Instrucoes");}, this);
        this.input.keyboard.on('keyup_ZERO', function () {this.game.destroy(true);}, this);
    }
}