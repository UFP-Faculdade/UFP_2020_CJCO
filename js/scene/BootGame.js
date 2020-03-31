export default class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload() {
        this.load.image("bg", "assets/images/background.png");//Background image
        //spritesheet=varias imagens no mesmo ficheiro
        
        //Players
        this.load.spritesheet("playerP1","assets/ships/PNG/playerShip/playerShipSprite1.png",{
            frameWidth:99,
            frameHeight:75
        });
        
        this.load.spritesheet("playerP2","assets/ships/PNG/playerShip/playerShipSprite2.png",{
            frameWidth:112,
            frameHeight:75
        });
        
        //Enimigos
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

        this.load.image("bullet_to_player", "assets/images/bullet_to_player.png");//Imagem da bala amarela
        
        this.load.spritesheet("bullet_to_enemy","assets/images/bullet_to_enemy.png",{
            frameWidth:25,
            frameHeight:25
        });

        this.load.spritesheet("explosion", "assets/images/explosion.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        //this.load.audio("fire", "assets/song/fire-sound.mp3");
        this.load.audio("fire", "assets/sounds/Weapons/Lasers/sfx_wpn_laser5.wav");
        this.load.audio("theme", "assets/song/start_8bit.mp3");
        this.load.audio("gameover", "assets/song/gameover.mp3");


    }
    create(){
        this.scene.start("PlayGame");
    }
}