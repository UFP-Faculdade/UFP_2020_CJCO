var MatrixScores = [["Joca",500],["Tigre",400],["Gonzo",350],["Micas",300],["Nocas",250],
["Zequinha",200],["Milenii",150],["Fabish",100],["Roqui",50],["Quaqua",0]];

export default class highscores extends Phaser.Scene{
    constructor(){
        super("Highscores");
    }

    create(){

        const width=this.game.config.width;
        const height=this.game.config.height;

        this.bg = this.add.tileSprite(0, 0, width*4, height*4, 'bg');

        
        this.labelName = this.add.text(width-280, 50, "TOP 10", {
            font: "24px magv5",
            fill: "#ff0000",
            stroke: "#000000",
            strokeThickness: 6
        });
        

        for (let i = 0; i < 10; i++)
        {
            this.labelName = this.add.text(width-380, height-(500-(i*40)+40), MatrixScores[i][0] + " - "+MatrixScores[i][1]+" Pontos", {
                font: "20px magv5",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 6
            });
        }

        this.labelName = this.add.text(width-380, height-50, "Press SPACE to continue", {
            font: "20px magv5",
            fill: "#ff0000",
            stroke: "#000000",
            strokeThickness: 6
        });
        
        this.input.keyboard.on('keyup_SPACE', function () {this.scene.start("Menu");}, this);   
    }

    verifyScore(points)
    {
        for (let i = 0; i < 10; i++)
        {
            if (MatrixScores[i][1]<points)
            {
                return i+1;
            }
        }
        return 0;
    }

    setHighscore(position,name,points)
    {
        for (let i = 9; i > position-1; i--)
        {
            MatrixScores[i][0]=MatrixScores[i-1][0];
            MatrixScores[i][1]=MatrixScores[i-1][1];
        } 
        MatrixScores[position-1][0]=name;
        MatrixScores[position-1][1]=points;
    }

}