export default class menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }


    create(){

        

        const width=this.game.config.width;//Diz local da imagem
        const height=this.game.config.height;//Diz local da imagem

        this.labelNameKeys = this.add.text(width-400, height-500, "PRESS KEYS:", {
            font: "40px magv5",
            fill: "#ffffff"
        });

        this.labelNameP1 = this.add.text(width-380, height-400, "1 - 1 PLAYER", {
            font: "40px magv5",
            fill: "#ffffff"
        });

        this.labelNameP2 = this.add.text(width-380, height-300, "2 - 2 PLAYERS", {
            font: "40px magv5",
            fill: "#ffffff"
        });   

        this.input.keyboard.on('keyup_ONE', this.pressOne, this);
        this.input.keyboard.on('keyup_TWO', this.pressTWO, this);

    }

    pressOne()
    {
        this.scene.start("PlayGame");
    }

    pressTWO()
    {
        this.scene.start("PlayGame");
    }
}