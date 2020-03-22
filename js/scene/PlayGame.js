import bird from "../models/Bird.js";
//import enemy from "../models/Enemy.js";
import EnemiesGroup from "../models/EnemiesGroup.js";

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

        this.bird.lives = 3;
        this.level = 1;
        this.score = 0;

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
        this.labelLives = this.add.text(180, 20, "Level: " + this.level, {
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

        this.cursors=this.input.keyboard.createCursorKeys();

        //criar ENEMY
        //this.enemy = new enemy (this, 250, 100);//Posicao da img do Passaro no ecra
        this.enemies = new EnemiesGroup(this.physics.world, this, 10,8);


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

 /*       
        this.anims.create({
            key:'bulletEE',
            repeat:-1,
            frameRate:3,
            frames: this.anims.generateFrameNames('enemyD', {
                start:0, end:3
            })
        });
       */

        //this.enemies.play('bulletEE');
        //this.enemies.setScale(1.5);


        this.themeSound = this.sound.add("theme", { volume: 0.1 });
        //this.themeSound.play();
        
        let fireSound = this.sound.add("fire", {
            volume: 0.1
        });

        this.bird.fireSound = fireSound;
        
    }
    
    update(time, delta){
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

            //this.enemySpawnCounter += delta;
        //}
    }
}