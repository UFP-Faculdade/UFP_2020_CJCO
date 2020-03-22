export default class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload() {
        this.load.image("bg", "assets/background.png");//Background image
        //spritesheet=varias imagens no mesmo ficheiro
        this.load.spritesheet("playerD","assets/phoenixNave.png",{
            frameWidth:100,
            frameHeight:100
        });

        this.load.spritesheet("enemyD","assets/enemies.png",{
            frameWidth:30,
            frameHeight:20
        });

        this.load.image("bulletP", "assets/bullet_to_player.png");//Imagem da bala amarela
        
        this.load.spritesheet("bulletE","assets/bullet_to_enemy.png",{
            frameWidth:25,
            frameHeight:25
        });

        this.load.audio("fire", "assets/fire-sound.mp3");
        this.load.audio("theme", "assets/overworld.mp3");
        this.load.audio("gameover", "assets/gameover.mp3");

    }
    create(){
        this.scene.start("PlayGame");
    }
}