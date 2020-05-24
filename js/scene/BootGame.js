export default class bootGame extends Phaser.Scene{
    constructor(){
        super("BootGame");
    }
    preload() {

        this.load.image("bgMenu", "assets/ships/Backgrounds/menu_back.jpg");//Background image

        this.load.image("bg", "assets/images/background.png");//Background image
        //spritesheet=varias imagens no mesmo ficheiro
        
        //Players
        this.load.spritesheet("playerP1","assets/ships/PNG/playerShip/playerShipSprite1.png",{
            frameWidth:99,
            frameHeight:75
        });

        this.load.spritesheet("playerP1E","assets/ships/PNG/playerShip/playerShipSprite1_escudo.png",{
            frameWidth:99,
            frameHeight:75
        });
        
        this.load.spritesheet("playerP2","assets/ships/PNG/playerShip/playerShipSprite2.png",{
            frameWidth:112,
            frameHeight:75
        });

        this.load.spritesheet("playerP2E","assets/ships/PNG/playerShip/playerShipSprite2_escudo.png",{
            frameWidth:112,
            frameHeight:75
        });
        
        //Enimigos
 
        this.load.image("enemy0","assets/images/boss.png");

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
            frameWidth:82,
            frameHeight:84
        });      
        
        this.load.spritesheet("enemy5","assets/ships/PNG/Enemies/enemySprite5.png",{
            frameWidth:97,
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

        this.load.image("bonus1","assets/ships/PNG/Power-ups/powerupBlue_shield.png");
        this.load.image("bonus2","assets/ships/PNG/Power-ups/powerupGreen_star.png");
        this.load.image("bonus3","assets/ships/PNG/Power-ups/powerupRed_bolt.png");

        //teclas
        this.load.image("sd", "assets/ships/PNG/UI/setadireita.jpeg");
        this.load.image("se", "assets/ships/PNG/UI/setaesquerda.jpeg");
        this.load.image("sb", "assets/ships/PNG/UI/setabaixo.jpeg");
        this.load.image("sc", "assets/ships/PNG/UI/setacima.jpeg");
        this.load.image("sp", "assets/ships/PNG/UI/key_jog1_space.jpg");

        this.load.image("dd", "assets/ships/PNG/UI/key_jog2_D.jpg");
        this.load.image("ae", "assets/ships/PNG/UI/key_jog2_A.jpg");
        this.load.image("ss", "assets/ships/PNG/UI/key_jog2_S.jpg");
        this.load.image("wc", "assets/ships/PNG/UI/key_jog2_W.jpg");
        this.load.image("xp", "assets/ships/PNG/UI/key_jog2_X.jpg");
        
        this.load.image("ps", "assets/ships/PNG/UI/key_p.jpg");
        this.load.image("vu", "assets/ships/PNG/UI/key_u.jpg");
        this.load.image("vy", "assets/ships/PNG/UI/key_y.jpg");        
        this.load.image("vq", "assets/ships/PNG/UI/key_sound_q.jpg");       
        


        //this.load.audio("fire", "assets/song/fire-sound.mp3");
        this.load.audio("fire", "assets/sounds/Weapons/Lasers/sfx_wpn_laser5.wav");
        this.load.audio("theme", "assets/song/start_8bit.mp3");
        this.load.audio("gameover", "assets/song/gameover.mp3");
        this.load.audio("sound_explosion", "assets/song/explosion.mp3");
        this.load.audio("sound_bonus", "assets/song/bonus_umgawa.mp3");
        this.load.audio("sound_boos", "assets/song/boos1.mp3");


    }
    create(){
        //this.scene.start("PlayGame");
        this.scene.start("Menu");
    }
}