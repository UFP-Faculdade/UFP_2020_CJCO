export default class menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }


    create(){

        const width=this.game.config.width;
        const height=this.game.config.height;

        this.labelNameKeys = this.add.text(width-400, height-500, "PRESS KEYS:", {
            font: "40px magv5",
            fill: "#ffffff"
        });

        this.labelNameP1 = this.add.text(width-380, height-400, "1 - 1 Player", {
            font: "40px magv5",
            fill: "#ffffff"
        });

        this.labelNameP2 = this.add.text(width-380, height-340, "2 - 2 Players", {
            font: "40px magv5",
            fill: "#ffffff"
        });   

        this.labelNameScores = this.add.text(width-380, height-280, "3 - HighScores", {
            font: "40px magv5",
            fill: "#ffffff"
        });  

        this.labelNameExit = this.add.text(width-380, height-220, "0 - Exit Game", {
            font: "40px magv5",
            fill: "#ffffff"
        });  

        this.input.keyboard.on('keyup_ONE', function () {this.scene.start("PlayGame",{jogadores: 1});}, this);
        this.input.keyboard.on('keyup_TWO', function () {this.scene.start("PlayGame",{jogadores: 2});}, this);
        this.input.keyboard.on('keyup_THREE', function () {this.scene.start("Highscores");}, this);
        this.input.keyboard.on('keyup_ZERO', function () {this.game.destroy(true);}, this);
    }
}