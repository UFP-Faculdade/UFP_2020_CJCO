export default class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload() {
        this.load.image("bg", "assets/images/background.png");//Background image
        //spritesheet=varias imagens no mesmo ficheiro
        
        this.load.spritesheet("playerDw","assets/images/phoenixNave.png",{
            frameWidth:100,
            frameHeight:100
        });
        
        
        this.load.spritesheet("playerD","assets/ships/PNG/playerShip/playerShipSprite1.png",{
            frameWidth:99,
            frameHeight:75
        });
        
        this.load.spritesheet("enemy1","assets/ships/PNG/Enemies/enemySprite1.png",{
            frameWidth:93,
            frameHeight:84
        });

        this.load.spritesheet("enemy2","assets/ships/PNG/Enemies/enemySprite2.png",{
            frameWidth:104,
            frameHeight:84
        });

        this.load.spritesheet("enemy3","assets/ships/PNG/Enemies/enemySprite3.png",{
            frameWidth:104,
            frameHeight:84
        });
        
        this.load.spritesheet("enemy4","assets/ships/PNG/Enemies/enemySprite4.png",{
            frameWidth:104,
            frameHeight:84
        });      
        
        this.load.spritesheet("enemy5","assets/ships/PNG/Enemies/enemySprite5.png",{
            frameWidth:104,
            frameHeight:84
        });

        this.load.image("bulletP", "assets/images/bullet_to_player.png");//Imagem da bala amarela
        
        this.load.spritesheet("bulletE","assets/images/bullet_to_enemy.png",{
            frameWidth:25,
            frameHeight:25
        });

        this.load.spritesheet("explosion", "assets/images/explosion.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        this.load.audio("fire", "assets/song/fire-sound.mp3");
        this.load.audio("theme", "assets/song/start_8bit.mp3");
        this.load.audio("gameover", "assets/song/gameover.mp3");

    }
    create(){
        this.scene.start("PlayGame");
    }
}