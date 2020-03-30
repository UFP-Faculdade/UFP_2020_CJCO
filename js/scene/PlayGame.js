import player1 from "../models/Player1.js";
import player2 from "../models/Player2.js";
import EnemiesGroup from "../models/EnemiesGroup.js";
//import enemy from "../models/Enemy.js";

var bg;
var iter = 0
var bgSpeed = 0.01
var nrTotalEnemys=1;//Calcular numero de enimigos para depois avançar de nivel


export default class playGame extends Phaser.Scene{
    //extends default class PlayGame
    constructor(){
        super("PlayGame");
    }

    currentLevel;
    livesP1;
    scoreP1;
    livesP2;
    scoreP2;
    init(props) {
        const { level = 1 } = props
        this.currentLevel = level
        //Player 1
        const { livesP1 = 3 } = props
        this.livesP1 = livesP1
        const { scoreP1 = 0 } = props
        this.scoreP1 = scoreP1
        //Player 2
        const { livesP2 = 3 } = props
        this.livesP2 = livesP2
        const { scoreP2 = 0 } = props
        this.scoreP2 = scoreP2
    }

    create(){
        console.log("Starting game");
        
        //Fazer o background sempre em primeiro (Imagens são ordenadas umas frentes a outras)
        const width=this.game.config.width;//Diz local da imagem
        const height=this.game.config.height;//Diz local da imagem
        
        //Background
        //this.add.image(0, 0, "bg").setDisplayOrigin(0,0).setDisplaySize(width, height);//Criei load no BootGame da imagem
        bg = this.add.tileSprite(0, 0, width*4, height*4, 'bg');



        //criar PLAYER1
        this.player1 = new player1 (this, 200, height-90);//Posicao da img PLAYER1
        this.anims.create({
            key:'AnimShip',
            repeat:-1,
            frameRate:5,
            frames: this.anims.generateFrameNames('playerP1', {
                start:0, end:4
            })
        });
        this.player1.play('AnimShip');
        this.player1.setScale(0.6);
        this.player1.livesP1 = this.vidasP1;


        //criar PLAYER2
        this.player2 = new player2 (this, width - 50, height-90);//Posicao da img PLAYER2
        this.anims.create({
            key:'AnimShip',
            repeat:-1,
            frameRate:5,
            frames: this.anims.generateFrameNames('playerP2', {
                start:0, end:4
            })
        });
        this.player2.play('AnimShip');
        this.player2.setScale(0.6);
        this.player2.livesP2 = this.vidasP2;

        //Animacao Bala
        this.anims.create({
            key:'AnimBullet',
            repeat:-1,
            frameRate:20,
            frames: this.anims.generateFrameNames('bulletE', {
                start:0, end:3
            })
        });
        

        /** TEXT PLAYER 1 */
        this.labelNameP1 = this.add.text(20, 20, "PLAYER 1", {
            font: "20px GlaserSteD",
            fill: "#ffffff"
        });
        this.labelPointsP1 = this.add.text(50, 50, this.scoreP1, {
            font: "20px GlaserSteD",
            fill: "#FF0000"
        });
        this.labelLivesP1 = this.add.text(20, 80, "Lives P1: " + this.livesP1, {
            font: "20px GlaserSteD",
            fill: "#ffffff"
        });

        

        /** TEXT PLAYER 2 */
        this.labelNameP2 = this.add.text(width-130, 20, "PLAYER 2", {
            font: "20px GlaserSteD",
            fill: "#ffffff"
        });
        this.labelPointsP2 = this.add.text(width-100, 50, this.scoreP2, {
            font: "20px GlaserSteD",
            fill: "#FF0000"
        });
        this.labelLivesP2 = this.add.text(width-130 , 80, "Lives P2: " + this.livesP2, {
            font: "20px GlaserSteD",
            fill: "#ffffff"
        });


         /**
         * create text for Levels
         */
        this.labelLevel = this.add.text(width/2, 20, "Nível: " + this.currentLevel, {
            font: "15px GlaserSteD",
            fill: "#ffffff"
        });

        /**
         * create text for SILENC sound background
         */
        this.labelSound = this.add.text(20, height - 30, "Q (Silence) ", {
            font: "13px GlaserSteD",
            fill: "#ffffff"
        });

        /**
         * create text for ENEMIES sound background
         */
        /*
        this.labelNrTotalEnemys = this.add.text(250, height - 30, nrTotalEnemys + " Enemies", {
            font: "13px GlaserSteD",
            fill: "#ffffff"
        });
        */
        this.cursors=this.input.keyboard.createCursorKeys();
        this.q = this.input.keyboard.addKey("q");
        this.p = this.input.keyboard.addKey("p");

        
        //criar ENEMY
        //this.enemies = new EnemiesGroup(this.physics.world, this, 10,8);
        this.enemies = new EnemiesGroup(this.physics.world, this, this.currentLevel);//1 == nivel do jogo
 
        nrTotalEnemys = this.enemies.getNrNaves();

        
        this.anims.create({
            key:"AnimEnemy"+this.currentLevel,
            repeat:-1,
            frameRate:6,
            frames: this.anims.generateFrameNames("enemy"+this.currentLevel, {
                start:0, end:3
            })
        });
        

        this.enemies.playAnimation('AnimEnemy'+this.currentLevel);

        //this.enemies.play('bulletEE');
        
        /**
         * create text for ENEMIES sound background
         */
        this.labelNrTotalEnemys = this.add.text(width/2-20, height - 30, nrTotalEnemys + " Enemies", {
            font: "13px GlaserSteD",
            fill: "#ffffff"
        });

        /**
         * deal with overlap/collision of player1 bullets and enemies
         */
        this.physics.add.overlap(this.player1.bulletss, this.enemies, (bullet, enemy) => {
            //bullet.destroy(); //destroy method removes object from the memory
            //enemy.destroy();
            
            this.enemies.killAndHide(enemy);
            this.player1.bulletss.killAndHide(bullet);

            //prevent collision with multiple enemies by removing the bullet from screen and stoping it
            bullet.removeFromScreen();

            //remove enemy from screen and stop it
            enemy.removeFromScreen();

            this.scoreP1 += this.currentLevel * this.livesP1 * 2;//Nivel atual * Vidas atual * 2
            nrTotalEnemys -= 1;//desconta 1 enimigo
            

            //update the score text
            this.labelPointsP1.setText(this.scoreP1);
            this.labelNrTotalEnemys.setText(nrTotalEnemys + " Enemies");

            //Reset quando é outro nivel
            if(nrTotalEnemys==0){
                this.currentLevel+=1;
                this.scoreP1+=50;

                //this.enemies = new EnemiesGroup(this.physics.world, this, this.level);//1 == nivel do jogo
                nrTotalEnemys = this.currentLevel * this.currentLevel;
                this.labelNrTotalEnemys.setText(nrTotalEnemys + " Enemies");
                
                
                    
                //starts Next scene
                //this.scene.stop("PlayGame");
                //this.scene.start('Level', { nivel: this.level});

                this.scene.restart({
                    level: this.currentLevel, 
                    livesP1: this.player1.livesP1,
                    scoreP1: this.scoreP1, 
                    livesP2: this.player1.livesP2,
                    scoreP2: this.scoreP2
                });

               
            }

            /*
            //Se falhar a bala (Se sair do ecrã)
            this.player1.bulletss.children.iterate(function(bullet){
                
                if(bullet.isOutsideCanvas()){
                    console.log("FORAAAA");
                    this.scoreP1 -= 2 ;
                }
            }, this)//devido ao objeto
            */
         
        });     


        

        /**
         * deal with overlap/collision of player1 bullets and enemies
         */
        this.physics.add.overlap(this.player2.bulletss, this.enemies, (bullet, enemy) => {
            //bullet.destroy(); //destroy method removes object from the memory
            //enemy.destroy();
            
            this.enemies.killAndHide(enemy);
            this.player2.bulletss.killAndHide(bullet);

            //prevent collision with multiple enemies by removing the bullet from screen and stoping it
            bullet.removeFromScreen();

            //remove enemy from screen and stop it
            enemy.removeFromScreen();

            this.scoreP2 += this.currentLevel * this.livesP2 * 2;//Nivel atual * Vidas atual * 2
            nrTotalEnemys -= 1;//desconta 1 enimigo
            

            //update the score text
            this.labelPointsP2.setText(this.scoreP2);
            this.labelNrTotalEnemys.setText(nrTotalEnemys + " Enemies");

            //Reset quando é outro nivel
            if(nrTotalEnemys==0){
                this.currentLevel+=1;
                this.scoreP2+=50;

                //this.enemies = new EnemiesGroup(this.physics.world, this, this.level);//1 == nivel do jogo
                nrTotalEnemys = this.currentLevel * this.currentLevel;
                this.labelNrTotalEnemys.setText(nrTotalEnemys + " Enemies");
                
                
                    
                //starts Next scene
                //this.scene.stop("PlayGame");
                //this.scene.start('Level', { nivel: this.level});

                this.scene.restart({
                    level: this.currentLevel, 
                    livesP1: this.player1.livesP1,
                    scoreP1: this.scoreP1, 
                    livesP2: this.player1.livesP2,
                    scoreP2: this.scoreP2
                });

               
            }

            /*
            //Se falhar a bala (Se sair do ecrã)
            this.player1.bulletss.children.iterate(function(bullet){
                
                if(bullet.isOutsideCanvas()){
                    console.log("FORAAAA");
                    this.scoreP1 -= 2 ;
                }
            }, this)//devido ao objeto
            */
         
        });     




       



        this.themeSound = this.sound.add("theme", { volume: 0.1 });
        this.themeSound.stop();//STOPPPPPPPPPPP
        this.music = true;
        
        let fireSound = this.sound.add("fire", {
            volume: 0.1
        });

        this.player1.fireSound = fireSound;

        this.game.paused = false;

    }
    
    update(time, delta){
        //Mover o background
        bg.tilePositionY = -Math.fround(iter) * 150;
        bg.tilePositionX = Math.fround(iter) * 40;
        iter += bgSpeed;

        //if (this.player1.lives > 0) {
            //deal with enemies spawn rate
            //this.spawnNewEnemies();

            this.player1.update(this.cursors, time);
            this.player2.update(this.cursors, time);

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
                console.log("MUSIC: "+this.music);
            }
/*
            if(this.p.isDown==true )
            { 
                if (this.game.paused) { 
                    this.game.resume(); 
                }
                else
                {
                    this.game.pause();
                }
                this.game.paused=!this.game.paused;
                console.log("Pausa")
            } 
*/
        //}
    }
}