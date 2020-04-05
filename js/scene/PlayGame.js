import Player1 from "../models/Player1.js";
import Player2 from "../models/Player2.js";
import EnemiesGroup from "../models/EnemiesGroup.js";
//import enemy from "../models/Enemy.js";

var bg;
var iter = 0
var bgSpeed = 0.01
var nrTotalEnemys=1;//Calcular numero de enimigos para depois avançar de nivel
var InicialEnemys=1;
var timeshoot=0;
var nivelNaves=1;

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
        this.currentLevel = level;
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
        console.log("Starting game level " +  this.currentLevel);
        
        //Fazer o background sempre em primeiro (Imagens são ordenadas umas frentes a outras)
        const width=this.game.config.width;//Diz local da imagem
        const height=this.game.config.height;//Diz local da imagem
        
        //Background
        //this.add.image(0, 0, "bg").setDisplayOrigin(0,0).setDisplaySize(width, height);//Criei load no BootGame da imagem
        bg = this.add.tileSprite(0, 0, width*4, height*4, 'bg');



        //criar PLAYER1
        this.player1 = new Player1 (this, 200, height-90);//Posicao da img PLAYER1
        this.anims.create({
            key:'AnimShip1',
            repeat:-1,
            frameRate:5,
            frames: this.anims.generateFrameNames('playerP1', {
                start:0, end:4
            })
        });
        this.player1.play('AnimShip1');
        this.player1.setScale(0.6);
        //this.player1.livesP1 = this.vidasP1;
        this.player1.setValues(this.scoreP1, this.livesP1);


        //criar PLAYER2
        this.player2 = new Player2 (this, width - 50, height-90);//Posicao da img PLAYER2
        this.anims.create({
            key:'AnimShip2',
            repeat:-1,
            frameRate:5,
            frames: this.anims.generateFrameNames('playerP2', {
                start:0, end:4
            })
        });
        this.player2.play('AnimShip2');
        this.player2.setScale(0.6);


        //Animacao Bala bullet_to_enemy
        this.anims.create({
            key:'AnimBullet_to_enemy',
            repeat:-1,
            frameRate:30,
            frames: this.anims.generateFrameNames('bullet_to_enemy', {
                start:0, end:3
            })
        });

        //Passagem de parametros para ficheiro player1, player2
        this.player2.setValues(this.scoreP2, this.livesP2);
        

        /** TEXT PLAYER 1 */
        this.labelNameP1 = this.add.text(20, 20, "PLAYER 1", {
            font: "20px magv5",
            fill: "#ffffff"
        });
        this.labelPointsP1 = this.add.text(50, 50, this.player1.scoreP1, {
            font: "20px magv5",
            fill: "#FF0000"
        });
        this.labelLivesP1 = this.add.text(20, 80, "Lives: " + this.player1.livesP1, {
            font: "20px magv5",
            fill: "#ffffff"
        });

        

        /** TEXT PLAYER 2 */
        this.labelNameP2 = this.add.text(width-130, 20, "PLAYER 2", {
            font: "20px magv5",
            fill: "#ffffff"
        });
        this.labelPointsP2 = this.add.text(width-100, 50, this.player2.scoreP2, {
            font: "20px magv5",
            fill: "#FF0000"
        });
        this.labelLivesP2 = this.add.text(width-130 , 80, "Lives: " + this.player2.livesP2, {
            font: "20px magv5",
            fill: "#ffffff"
        });


         /**
         * create text for Levels
         */
        this.labelLevel = this.add.text(width/2-20, 20, "Nível " + this.currentLevel, {
            font: "15px magv5",
            fill: "#ffffff"
        });

        /**
         * create text for SILENC sound background
         */
        this.labelSound = this.add.text(20, height - 30, "Q (Silence) ", {
            font: "13px magv5",
            fill: "#ffffff"
        });

        /**
         * create text for ENEMIES sound background
         */
        /*
        this.labelNrTotalEnemys = this.add.text(250, height - 30, nrTotalEnemys + " Enemies", {
            font: "13px magv5",
            fill: "#ffffff"
        });z
        */
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.keysP1 = this.input.keyboard.addKeys('w,s,a,d')
        this.keysP2 = this.input.keyboard.addKeys('w,s,a,d,x');
        this.q = this.input.keyboard.addKey("q");
        this.p = this.input.keyboard.addKey("p");


        //criar ENEMY
        //this.enemies = new EnemiesGroup(this.physics.world, this, 10,8);
        nivelNaves = this.currentLevel;
        if (nivelNaves > 5) { nivelNaves = this.currentLevel%5}
        if (nivelNaves == 0) { nivelNaves = 5}
        console.log("nivel:"+nivelNaves); 
        
        this.enemies = new EnemiesGroup(this.physics.world, this, nivelNaves,1);//1 == nivel do jogo
        this.enemies2 = new EnemiesGroup(this.physics.world, this, nivelNaves,2);

        nrTotalEnemys = this.enemies.getNrNaves()+this.enemies2.getNrNaves();
        InicialEnemys = nrTotalEnemys;
        timeshoot=0;

      
        this.anims.create({
            key:"AnimEnemy"+this.currentLevel,
            repeat:-1,
            frameRate:6,
            frames: this.anims.generateFrameNames("enemy"+nivelNaves, {
                start:0, end:3
            })
        });
        this.enemies.playAnimation('AnimEnemy'+this.currentLevel);

        this.anims.create({
            key:"AnimEnemy2",
            repeat:-1,
            frameRate:6,
            frames: this.anims.generateFrameNames("enemy2", {
                start:0, end:3
            })
        });
        this.enemies2.playAnimation('AnimEnemy2');


        /**
         * create text for ENEMIES sound background
         */
        this.labelNrTotalEnemys = this.add.text(width/2-20, height - 30, nrTotalEnemys + " Enemies", {
            font: "13px magv5",
            fill: "#ffffff"
        });

        /** BALA PLAYER 1 bate no EMIMIGO */
        this.physics.add.overlap(this.player1.bulletss, this.enemies, (bullet, enemy) => {
            nrTotalEnemys -= 1;//desconta 1 enimigo
            this.enemies.killAndHide(enemy);
            this.player1.bulletss.killAndHide(bullet);

            //prevent collision with multiple enemies by removing the bullet from screen and stoping it
            bullet.removeFromScreen();

            //remove enemy from screen and stop it
            enemy.removeFromScreen();

            this.player1.scoreP1 += this.currentLevel * this.player1.livesP1 * 2;//Nivel atual * Vidas atual * 2
           
            

            //update the score text
            this.labelPointsP1.setText(this.player1.scoreP1);
            this.labelNrTotalEnemys.setText(nrTotalEnemys + " Enemies");

            this.validarNumEnemies();
         
        });     
        /** BALA PLAYER 1 bate no EMIMIGO */
        this.physics.add.overlap(this.player1.bulletss, this.enemies2, (bullet, enemy) => {
            nrTotalEnemys -= 1;//desconta 1 enimigo
            this.enemies2.killAndHide(enemy);
            this.player1.bulletss.killAndHide(bullet);

            //prevent collision with multiple enemies by removing the bullet from screen and stoping it
            bullet.removeFromScreen();

            //remove enemy from screen and stop it
            enemy.removeFromScreen();

            this.player1.scoreP1 += this.currentLevel * this.player1.livesP1 * 2;//Nivel atual * Vidas atual * 2
           
            

            //update the score text
            this.labelPointsP1.setText(this.player1.scoreP1);
            this.labelNrTotalEnemys.setText(nrTotalEnemys + " Enemies");

            this.validarNumEnemies();
         
        }); 

        /** BALA PLAYER 2 bate no EMIMIGO */
        this.physics.add.overlap(this.player2.bulletss, this.enemies, (bullet, enemy) => {
            //bullet.destroy(); //destroy method removes object from the memory
            //enemy.destroy();
            
            this.enemies.killAndHide(enemy);
            this.player2.bulletss.killAndHide(bullet);

            //prevent collision with multiple enemies by removing the bullet from screen and stoping it
            bullet.removeFromScreen();

            //remove enemy from screen and stop it
            enemy.removeFromScreen();

            this.player2.scoreP2 += this.currentLevel * this.player2.livesP2 * 2;//Nivel atual * Vidas atual * 2
            nrTotalEnemys -= 1;//desconta 1 enimigo
            

            //update the score text
            this.labelPointsP2.setText(this.player2.scoreP2);
            this.labelNrTotalEnemys.setText(nrTotalEnemys + " Enemies");

            this.validarNumEnemies();

         
        });
        

        
        /** BALA ENIMIGO bate no PLAYER 1 */
        /*
        this.physics.add.overlap(this.enemies.bullet, this.player1, (bullet, player1) => {
            console.log("Bata embateu no Player 1. Restam " + (player1.livesP1-1) + " vidas.");
            
        });
        */


        
        /** PLAYER 1 embate no ENIMIGO */
        this.physics.add.overlap(this.player1, this.enemies, (player1, enemy) => {
            console.log("Crash Player 1. Restam " + (player1.livesP1-1) + " vidas.");
            if (player1.canBeKilled) {

                player1.deadP1();
                this.labelLivesP1.setText("Lives: " + player1.livesP1);
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        player1.reviveP1();
                    }
                });
            }
        });


        /** PLAYER 2 embate no ENIMIGO */
        this.physics.add.overlap(this.player2, this.enemies, (player2, enemy) => {
            console.log("Crash Player 2. Restam " + (player2.livesP2-1) + " vidas.");
            if (player2.canBeKilled) {

                player2.deadP2();
                this.labelLivesP2.setText("Lives: " + player2.livesP2);
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        player2.reviveP2();
                    }
                });
            }
        });




        this.themeSound = this.sound.add("theme", { volume: 0.1 });
        this.themeSound.stop();//STOPPPPPPPPPPP
        this.music = true;
        
        let fireSound = this.sound.add("fire", {
            volume: 0.1
        });

        this.player1.fireSound = fireSound;
        this.player2.fireSound = fireSound;

        this.game.paused = false;

    }
    
    
    validarNumEnemies() 
    {
        //Reset quando é outro nivel
        if(nrTotalEnemys==0){
            this.currentLevel+=1;
            this.player1.scoreP1+=50;
            this.player2.scoreP2+=50;

            //this.enemies = new EnemiesGroup(this.physics.world, this, this.level);//1 == nivel do jogo
            nrTotalEnemys = this.currentLevel * this.currentLevel;
            this.labelNrTotalEnemys.setText(nrTotalEnemys + " Enemies");
            
            
            this.scene.restart({
                level: this.currentLevel,
                scoreP1: this.player1.scoreP1,
                scoreP2: this.player2.scoreP2,
                livesP1: this.player1.livesP1,
                livesP2: this.player2.livesP2
            });
            
           
        }
    }


    update(time, delta){
        /*
        if(timeshoot < time)
        {
            if(nrTotalEnemys>0){
                //console.log(nrTotalEnemys);
                var randEnimies = Phaser.Math.Between(0, InicialEnemys-1);
                    //console.log(randEnimies);
                var inimigo = this.enemies.getChildren()[randEnimies];
                while (inimigo==null)
                {
                    randEnimies++;
                    if (randEnimies>InicialEnemys-1){ randEnimies = 0;}
                    inimigo = this.enemies.getChildren()[randEnimies];
                }            
                inimigo.update(this.cursors,time);
                //console.log(nrTotalEnemys);
            }
            timeshoot= time + 300;
        }
*/
        this.enemies.update(this.cursors,time,nrTotalEnemys,InicialEnemys);
        //Mover o background
        bg.tilePositionY = -Math.fround(iter) * 150;    
        bg.tilePositionX = Math.fround(iter) * 40;
        iter += bgSpeed;

        if (this.player1.livesP1 > 0 || this.player2.livesP2 > 0) {
            //deal with enemies spawn rate
            //this.spawnNewEnemies();
            if(this.player1.livesP1 > 0){
                this.player1.update(this.cursors, time);
            }
            if(this.player2.livesP2 > 0){
                this.player2.update(this.keysP2, time);
            }
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
        }
    }
}