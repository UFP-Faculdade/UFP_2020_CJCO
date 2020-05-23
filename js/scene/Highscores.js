var MatrixScores = [["Player",500],["Player",400],["Player",350],["Player",300],["Player",250],
["Player",200],["Player",150],["Player",100],["Player",50],["Player",0]];

export default class highscores extends Phaser.Scene{
    constructor(){
        super("Highscores");
    }

    create(){

        const width=this.game.config.width;
        const height=this.game.config.height;

        this.bg = this.add.tileSprite(0, 0, width*4, height*4, 'bg');

        for (let i = 0; i < 10; i++)
        {
            this.labelName = this.add.text(width-300, height-(500-(i*40)+40), MatrixScores[i][0] + " - "+MatrixScores[i][1]+" Pontos", {
                font: "20px magv5",
                fill: "#ffffff"
            });
        }

        this.labelName = this.add.text(width-440, height-50, "Press SPACE to continue", {
            font: "20px magv5",
            fill: "#0000ff"
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