import bird from "../models/Bird.js";
import enemy from "../models/Enemy.js";

export default class playGame extends Phaser.Scene{
    //extends default class PlayGame
    constructor(){
        super("PlayGame");
    }
    create(){
        console.log("Starting game");
        
        //Fazer o background sempre em primeiro (Imagens são ordenadas umas frentes a outras)
        const width=this.game.config.width;//Diz local da imagem
        const height=this.game.config.height;//Diz local da imagem
        //this.add.image(width/2, height/2, "bg");//Criei load no BootGame da imagem
        
        //Outro metodo
        this.add.image(0, 0, "bg").setDisplayOrigin(0,0).setDisplaySize(width, height);//Criei load no BootGame da imagem

        //criar PLAYER
        this.bird = new bird (this, 250, 550);//Posicao da img PLAYER
        this.anims.create({
            key:'bulletP2',
            repeat:-1,
            frameRate:5,
            frames: this.anims.generateFrameNames('playerD', {
                start:0, end:4
            })
        });
        this.bird.play('bulletP2');
        this.bird.setScale(0.5);


        //criar ENEMY
        this.enemy = new enemy (this, 250, 100);//Posicao da img do Passaro no ecra
        this.anims.create({
            key:'bulletEE',
            repeat:-1,
            frameRate:3,
            frames: this.anims.generateFrameNames('enemyD', {
                start:0, end:3
            })
        });
        this.enemy.play('bulletEE');
        this.enemy.setScale(1.5);


        this.cursors=this.input.keyboard.createCursorKeys();
        
    }
    
    update(time, delta){
        //console.log(time  + " " + delta);
        this.bird.update(this.cursors, time);
        this.enemy.update(this.cursors, time);
    }
}