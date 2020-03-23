import bird from "../models/Bird.js";
//import enemy from "../models/Enemy.js";
import EnemiesGroup from "../models/EnemiesGroup.js";
import level from "../models/Level.js";

var bg;
var iter = 0
var bgSpeed = 0.01

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
        
        //Background
        //this.add.image(0, 0, "bg").setDisplayOrigin(0,0).setDisplaySize(width, height);//Criei load no BootGame da imagem
        bg = this.add.tileSprite(0, 0, width*4, height*4, 'bg');



        //criar PLAYER
        this.bird = new bird (this, 250, 550);//Posicao da img PLAYER
        this.anims.create({
            key:'AnimShip',
            repeat:-1,
            frameRate:5,
            frames: this.anims.generateFrameNames('playerD', {
                start:0, end:4
            })
        });
        this.bird.play('AnimShip');
        this.bird.setScale(0.5);

        this.bird.lives = 3;
        this.level = 3;
        this.score = 0;

        //Animacao Bala
        this.anims.create({
            key:'AnimBullet',
            repeat:-1,
            frameRate:20,
            frames: this.anims.generateFrameNames('bulletE', {
                start:0, end:4
            })
        });
        
       

        /**
         * creates text for score
         */
        this.labelScore = this.add.text(20, 20, "Score: " + this.score, {
            font: "25px Cambria",
            fill: "#ffffff"
        });

         /**
         * create text for Levels
         */
        this.labelLives = this.add.text(width/2-50, 20, "Level: " + this.level, {
            font: "25px Cambria",
            fill: "#ffffff"
        });

        /**
         * create text for bird lives
         */
        this.labelLives = this.add.text(350, 20, "Lives: " + this.bird.lives, {
            font: "25px Cambria",
            fill: "#ffffff"
        });

        /**
         * create text for SILENC sound background
         */
        this.labelLives = this.add.text(20, height - 30, "Q (Silence) ", {
            font: "15px Cambria",
            fill: "#ffffff"
        });

        this.cursors=this.input.keyboard.createCursorKeys();
        this.q = this.input.keyboard.addKey("q");

        //criar ENEMY
        //this.enemies = new EnemiesGroup(this.physics.world, this, 10,8);
        this.enemies = new EnemiesGroup(this.physics.world, this, this.level);//1 == nivel do jogo
        
        this.anims.create({
            key:'AnimEnemy',
            repeat:-1,
            frameRate:3,
            frames: this.anims.generateFrameNames('enemyD', {
                start:0, end:3
            })
        });
       
        this.enemies.playAnimation('AnimEnemy');



        /**
         * deal with overlap/collision of bird bullets and enemies
         */
        this.physics.add.overlap(this.bird.bulletss, this.enemies, (bullet, enemy) => {
            //bullet.destroy(); //destroy method removes object from the memory
            //enemy.destroy();

            this.enemies.killAndHide(enemy);
            this.bird.bulletss.killAndHide(bullet);

            //prevent collision with multiple enemies by removing the bullet from screen and stoping it
            bullet.removeFromScreen();

            //remove enemy from screen and stop it
            enemy.removeFromScreen();

            this.score += 10;
            //update the score text
            this.labelScore.setText("Score: " + this.score);

        });     

       


        //this.enemies.play('bulletEE');
        //this.enemies.setScale(1.5);


        this.themeSound = this.sound.add("theme", { volume: 0.1 });
        this.themeSound.stop();//STOPPPPPPPPPPP
        this.music = true;
        
        let fireSound = this.sound.add("fire", {
            volume: 0.1
        });

        this.bird.fireSound = fireSound;
        
    }
    
    update(time, delta){
        //Mover o background
        bg.tilePositionY = -Math.fround(iter) * 150;
        bg.tilePositionX = Math.fround(iter) * 40;
        iter += bgSpeed;

        //console.log(time  + " " + delta);

        //if (this.bird.lives > 0) {
            //deal with enemies spawn rate
            //this.spawnNewEnemies();

            this.bird.update(this.cursors, time);

            this.enemies.children.iterate(function (enemy) {
                if (enemy.isOutsideCanvas()) {
                    //bullet.active = false;
                    this.enemies.killAndHide(enemy);
                }
            }, this);

            
            if(this.q.on==true )
            { 
                if (this.music) { 
                    this.themeSound.play();
                }
                else
                {
                    this.themeSound.pause();
                }
                this.music=!this.music;
                console.log("MUSIC: "+this.music)
            }
        //}
    }
}