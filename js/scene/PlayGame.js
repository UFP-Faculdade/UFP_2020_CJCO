import Player1 from "../models/Player1.js";
import Player2 from "../models/Player2.js";
import EnemiesGroup from "../models/EnemiesGroup.js";
import highscores from "./Highscores.js";
import Bonus from "../models/Bonus.js";

//import enemy from "../models/Enemy.js";

var bg;
var iter = 0
var bgSpeed = 0.01
var nrTotalEnemys=1;//Calcular numero de enimigos para depois avançar de nivel
var InicialEnemys=1;
var timeshoot=0;
var nivelNaves=1;
var nbonus;
var multiplicador;


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
    nplayer;
    Player1Name;
    Player2Name;
    escudoP1;
    escudoP2;    
    
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
        const { jogadores = 1 } = props
        this.nplayer = jogadores;	 
        const { nome1 = "Player1" } = props
        this.Player1Name = nome1;	 
        const { nome2 = "Player2" } = props
        this.Player2Name = nome2;
        const { escudoP1 = 0 } = props
        this.escudoP1 = escudoP1;
        const { escudoP2 = 0 } = props
        this.escudoP2 = escudoP2;
    }	
    create(){
       
        console.log("Starting Level " +  this.currentLevel + "\nJogadores: " + this.nplayer);
        
        //Fazer o background sempre em primeiro (Imagens são ordenadas umas frentes a outras)
        const width=this.game.config.width;//Diz local da imagem
        const height=this.game.config.height;//Diz local da imagem
        
        this.highscores = new highscores();

        //this.currentLevel=6;

        //Background
        //this.add.image(0, 0, "bg").setDisplayOrigin(0,0).setDisplaySize(width, height);//Criei load no BootGame da imagem
        bg = this.add.tileSprite(0, 0, width*4, height*4, 'bg');

        //criar PLAYER1
        if (this.livesP1 > 0) 
        {       
            this.player1 = new Player1 (this, 200, height-90);//Posicao da img PLAYER1
            this.anims.create({
                key:'AnimShip1',
                repeat:-1,
                frameRate:5,
                frames: this.anims.generateFrameNames('playerP1', {
                    start:0, end:4
                })
            });

            this.anims.create({
                key:'AnimShip1E',
                repeat:-1,
                frameRate:5,
                frames: this.anims.generateFrameNames('playerP1E', {
                    start:0, end:4
                })
            });

            if(this.escudoP1==0)
            {
                this.player1.play('AnimShip1');
            }
            else
            {
                this.player1.play('AnimShip1E'); 
            }
            this.player1.setScale(0.6);
            //this.player1.livesP1 = this.vidasP1;
            this.player1.setValues(this.scoreP1, this.livesP1);
        }

        if (this.nplayer==2 && this.livesP2 > 0)
        {
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

            this.anims.create({
                key:'AnimShip2E',
                repeat:-1,
                frameRate:5,
                frames: this.anims.generateFrameNames('playerP2E', {
                    start:0, end:4
                })
            });

            if(this.escudoP2==0)
            {
                this.player2.play('AnimShip2');
            }
            else
            {
                this.player2.play('AnimShip2E'); 
            }
            this.player2.setScale(0.6);
            //Passagem de parametros para ficheiro player1, player2
            this.player2.setValues(this.scoreP2, this.livesP2);
        }

        //Animacao Bala bullet_to_enemy
        this.anims.create({
            key:'AnimBullet_to_enemy',
            repeat:-1,
            frameRate:30,
            frames: this.anims.generateFrameNames('bullet_to_enemy', {
                start:0, end:3
            })
        });

        /** TEXT PLAYER 1 */
        this.labelNameP1 = this.add.text(20, 20, this.Player1Name, {
            font: "20px magv5",
            fill: "#ffffff"
        });
        this.labelPointsP1 = this.add.text(50, 50, this.player1.scoreP1, {
            font: "20px magv5",
            fill: "#FF0000"
        });
        this.labelLivesP1 = this.add.text(20, 80, "Vidas: " + this.player1.livesP1, {
            font: "20px magv5",
            fill: "#ffffff"
        });

        
        if (this.nplayer==2)
        {
            /** TEXT PLAYER 2 */
            this.labelNameP2 = this.add.text(width-130, 20, this.Player2Name, {
                font: "20px magv5",
                fill: "#ffffff"
            });
            this.labelPointsP2 = this.add.text(width-100, 50, this.player2.scoreP2, {
                font: "20px magv5",
                fill: "#FF0000"
            });
            this.labelLivesP2 = this.add.text(width-130 , 80, "Vidas: " + this.player2.livesP2, {
                font: "20px magv5",
                fill: "#ffffff"
            });
        }


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
        this.labelSound = this.add.text(20, height - 30, "Q (Silencio) ", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#ff0000",
            strokeThickness: 2
        });

        this.labelSound = this.add.text(width-100, height - 30, "P (Pausa) ", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#ff0000",
            strokeThickness: 2
        });

        /**
         * create text for ENEMIES sound background
         */
        /*
        this.labelNrTotalEnemys = this.add.text(250, height - 30, nrTotalEnemys + " Inimigos", {
            font: "13px magv5",
            fill: "#ffffff"
        });z
        */
        this.cursors = this.input.keyboard.createCursorKeys();
        //this.keysP1 = this.input.keyboard.addKeys('w,s,a,d')
        this.keysP2 = this.input.keyboard.addKeys('w,s,a,d,x');

        //criar ENEMY
        //this.enemies = new EnemiesGroup(this.physics.world, this, 10,8);
        //nivelNaves = this.currentLevel;
        //nivelBoss = 1;
        
        this.labelBoss = this.add.text(width/2-100, 100, "", {
            font: "40px magv5",
            fill: "#00cc00"
        });

        
        multiplicador = Phaser.Math.FloorTo(this.currentLevel/6);
        nivelNaves = this.currentLevel%6;
        if (nivelNaves == 0)
        { 
            this.enemies = new EnemiesGroup(this.physics.world, this, nivelNaves,2);
            this.boss=1;
            this.vidaBOSS=10*(multiplicador);
            this.vidaBossIni = this.vidaBOSS;
            this.labelBoss.setText("Poder: "+this.vidaBOSS);
        }
        else
        {
            this.enemies = new EnemiesGroup(this.physics.world, this, nivelNaves,1);//1 == nivel do jogo
            this.boss=0;
            this.vidaBOSS=0;
            this.vidaBossIni = this.vidaBOSS;
            this.labelBoss.setText("");
        }
        //this.enemies2 = new EnemiesGroup(this.physics.world, this, nivelNaves,2);

        nrTotalEnemys = this.enemies.getNrNaves();//+this.enemies2.getNrNaves();
        InicialEnemys = nrTotalEnemys;
        timeshoot=0;

        if (this.boss==0)
        {      
            this.anims.create({
                key:"AnimEnemy"+this.currentLevel,
                repeat:-1,
                frameRate:6,
                frames: this.anims.generateFrameNames("enemy"+nivelNaves, {
                    start:0, end:3
                })
            });
            this.enemies.playAnimation('AnimEnemy'+this.currentLevel);
        }


        /**
         * create text for ENEMIES sound background
         */
        this.labelNrTotalEnemys = this.add.text(width/2-25, 50, nrTotalEnemys + " Inimigos", {
            font: "13px magv5",
            fill: "#ffffff"
        });


        this.bonus11 = new Bonus(this, -500, -500, 1); 
        this.bonus21 = new Bonus(this, -500, -500, 2); 
        this.bonus12 = new Bonus(this, -500, -500, 1); 
        this.bonus22 = new Bonus(this, -500, -500, 2);       

        /** BALA PLAYER 1 bate no EMIMIGO */
        if (this.livesP1 > 0)
        {
            this.physics.add.overlap(this.player1.bulletss, this.enemies, (bullet, enemy) => {
                if (this.boss==1)
                {
                    this.player1.bulletss.killAndHide(bullet);
                    bullet.removeFromScreen();
                    this.vidaBOSS-=1;
                    if (this.vidaBOSS <= (this.vidaBossIni/10)*2){
                        this.labelBoss.setColor("#ff0000");}
                    else if (this.vidaBOSS <= (this.vidaBossIni/10)*6){
                        this.labelBoss.setColor("#ffff00");}
                    
                    this.labelBoss.setText("Poder: "+this.vidaBOSS);

                    this.player1.scoreP1 += this.vidaBossIni;

                    //update the score text
                    this.labelPointsP1.setText(this.player1.scoreP1);

                    
                }
                
                if (this.vidaBOSS==0)
                {
                    nrTotalEnemys -= 1;//desconta 1 enimigo

                    //Bonus
                    nbonus=Phaser.Math.Between(0, 100);
                    //console.log(bonus);
                    if(nrTotalEnemys>0){//Não lança bonus no ultimo enimigo morto
                        if (nbonus > 10 && nbonus < 30) {
                            console.log("Bonus vida. ++");     
                            this.bonus21.x=enemy.x;             
                            this.bonus21.y=enemy.y;             
                            this.bonus21.update();
                        } else if (nbonus > 60 && nbonus < 80) {
                                console.log("Bonus escudo. ++");  
                                this.bonus11.x=enemy.x;             
                                this.bonus11.y=enemy.y;                         
                                this.bonus11.update();               
                        } 
                    }
                    this.enemies.killAndHide(enemy);
                    this.player1.bulletss.killAndHide(bullet);
                    this.explosionSound.play();

                    //prevent collision with multiple enemies by removing the bullet from screen and stoping it
                    bullet.removeFromScreen();

                    //remove enemy from screen and stop it
                    enemy.removeFromScreen();

                    this.player1.scoreP1 += this.currentLevel * this.player1.livesP1 * 2;//Nivel atual * Vidas atual * 2
                
                    //update the score text
                    this.labelPointsP1.setText(this.player1.scoreP1);
                    this.labelNrTotalEnemys.setText(nrTotalEnemys + " Inimigos");

                    this.validarNumEnemies();
                }
            });     
        }
        /////////////// BONUS ///
        /** PLAYER 1 embate no BONUS */
        if (this.livesP1 > 0)
        {
            this.physics.add.overlap(this.player1, this.bonus11, (player1, bonus) => {
                console.log("Player 1 apanhou um bonus Escudo.");
                this.bonus11.x=-500;             
                this.bonus11.y=-500; 
                this.escudoP1=1;
                this.player1.play('AnimShip1E');
                this.bonusSound.play();
            });
            this.physics.add.overlap(this.player1, this.bonus21, (player1, bonus) => {
                console.log("Player 1 apanhou um bonus Vida.");
                this.bonus21.x=-500;             
                this.bonus21.y=-500;             
                player1.livesP1+=1;
                this.livesP1=player1.livesP1;
                this.labelLivesP1.setText("Vidas: " + this.livesP1);
                this.bonusSound.play();
            });   
            this.physics.add.overlap(this.player1, this.bonus12, (player1, bonus) => {
                console.log("Player 1 apanhou um bonus Escudo.");
                this.bonus12.x=-500;             
                this.bonus12.y=-500; 
                this.escudoP1=1;
                this.player1.play('AnimShip1E');
                this.bonusSound.play();           
            });
            this.physics.add.overlap(this.player1, this.bonus22, (player1, bonus) => {
                console.log("Player 1 apanhou um bonus Vida.");
                this.bonus22.x=-500;             
                this.bonus22.y=-500;             
                player1.livesP1+=1;
                this.livesP1=player1.livesP1;
                this.labelLivesP1.setText("Vidas: " + this.livesP1);
                this.bonusSound.play();
            });
        }

        
        if (this.nplayer==2 && this.livesP2 > 0)
        {
            /** BALA PLAYER 2 bate no EMIMIGO */
            this.physics.add.overlap(this.player2.bulletss, this.enemies, (bullet, enemy) => {
                //bullet.destroy(); //destroy method removes object from the memory
                //enemy.destroy();
                if (this.boss==1)
                {
                    this.player2.bulletss.killAndHide(bullet);
                    bullet.removeFromScreen();
                    this.vidaBOSS-=1;
                    if (this.vidaBOSS <= (this.vidaBossIni/10)*2){this.labelBoss.setColor("#ff0000");}
                    else if (this.vidaBOSS <= (this.vidaBossIni/10)*6){this.labelBoss.setColor("#ffff00");}
                    
                    this.labelBoss.setText("Poder: "+this.vidaBOSS);
                }

                if (this.vidaBOSS==0)
                {
                    nrTotalEnemys -= 1;//desconta 1 enimigo

                    //Bonus
                    nbonus=Phaser.Math.Between(0, 100);
                    //console.log(bonus);
                    if(nrTotalEnemys>0){//Não lança bonus no ultimo enimigo morto
                        if (nbonus > 10 && nbonus < 30) {
                            console.log("Bonus vida. ++");     
                            this.bonus22.x=enemy.x;             
                            this.bonus22.y=enemy.y;             
                            this.bonus22.update();
                        } else if (nbonus > 60 && nbonus < 80) {
                                console.log("Bonus escudo. ++");  
                                this.bonus12.x=enemy.x;             
                                this.bonus12.y=enemy.y;                         
                                this.bonus12.update();               
                        } 
                    }
                                    
                    this.enemies.killAndHide(enemy);
                    this.player2.bulletss.killAndHide(bullet);
                    this.explosionSound.play();

                    //prevent collision with multiple enemies by removing the bullet from screen and stoping it
                    bullet.removeFromScreen();

                    //remove enemy from screen and stop it
                    enemy.removeFromScreen();

                    this.player2.scoreP2 += this.currentLevel * this.player2.livesP2 * 2;//Nivel atual * Vidas atual * 2               

                    //update the score text
                    this.labelPointsP2.setText(this.player2.scoreP2);
                    this.labelNrTotalEnemys.setText(nrTotalEnemys + " Inimigos");

                    this.validarNumEnemies();
                }
            
            });
        }

         /////////////// BONUS ///
        /** PLAYER 2 embate no BONUS */
        if (this.nplayer==2 && this.livesP2 > 0)
        {
            this.physics.add.overlap(this.player2, this.bonus11, (player2, bonus) => {
                console.log("Player 1 apanhou um bonus Escudo.");
                this.bonus11.x=-500;             
                this.bonus11.y=-500; 
                this.escudoP2=1;
                this.player2.play('AnimShip2E');
                this.bonusSound.play();
            });
            this.physics.add.overlap(this.player2, this.bonus21, (player2, bonus) => {
                console.log("Player 1 apanhou um bonus Vida.");
                this.bonus21.x=-500;             
                this.bonus21.y=-500;             
                player2.livesP2+=1;
                this.livesP2=player2.livesP2;
                this.labelLivesP2.setText("Vidas: " + this.livesP2);
                this.bonusSound.play();
            });
     
            this.physics.add.overlap(this.player2, this.bonus12, (player2, bonus) => {
                console.log("Player 1 apanhou um bonus Escudo.");
                this.bonus12.x=-500;             
                this.bonus12.y=-500; 
                this.escudoP2=1;
                this.player2.play('AnimShip2E');
                this.bonusSound.play();
            });
            this.physics.add.overlap(this.player2, this.bonus22, (player2, bonus) => {
                console.log("Player 1 apanhou um bonus Vida.");
                this.bonus22.x=-500;             
                this.bonus22.y=-500;             
                player2.livesP2+=1;
                this.livesP2=player2.livesP2;
                this.labelLivesP2.setText("Vidas: " + this.livesP2);
                this.bonusSound.play();
            });
                      
        }

        /** BALA ENIMIGO bate no PLAYER 1 */
        if (this.livesP1 > 0)
        {
            for (let i = 0; i < this.enemies.getNrNaves(); i++) {
                this.physics.add.overlap(this.enemies.getChildren()[i].bulletss, this.player1, (player1,bullet) => {
                    if (this.escudoP1==0)
                    {
                        if (player1.canBeKilled) {
                            console.log("Bala embateu no Player 1. Restam " + (player1.livesP1-1) + " vidas.");
                            bullet.removeFromScreen();
                            player1.deadP1();
                            this.livesP1=player1.livesP1;
                            this.labelLivesP1.setText("Vidas: " + this.livesP1);
                            if (player1.livesP1 > 0)
                            {
                                this.time.addEvent({
                                    delay: 1000,
                                    callback: () => {
                                        player1.reviveP1();
                                    }
                                });
                            }
                            this.boosSound.play();
                        }
                    }
                    else
                    {
                        console.log("Bala embateu no Player 1 que perde Escudo.");
                        // Desactiva escudo
                        bullet.removeFromScreen();
                        this.escudoP1 = 0;
                        this.player1.play('AnimShip1');
                    }
                });
            }
        }

        /** BALA ENIMIGO bate no PLAYER 2 */
        if (this.nplayer==2 && this.livesP2 > 0)
        {       
            for (let i = 0; i < this.enemies.getNrNaves(); i++) {
                this.physics.add.overlap(this.enemies.getChildren()[i].bulletss, this.player2, (player2,bullet) => {
                    if (this.escudoP2==0)
                    {

                        if (player2.canBeKilled) {
                            console.log("Bala embateu no Player 2. Restam " + (player2.livesP2-1) + " vidas.");
                            bullet.removeFromScreen();
                            player2.deadP2();
                            this.livesP2=player2.livesP2;
                            this.labelLivesP2.setText("Vidas: " + this.livesP2);
                            if (player2.livesP2 > 0)
                            {
                                this.time.addEvent({
                                    delay: 1000,
                                    callback: () => {
                                        player2.reviveP2();
                                    }
                                });
                            }
                            this.boosSound.play();
                        }
                    }
                    else
                    {
                        console.log("Bala embateu no Player 2 que perde Escudo.");
                        // Desactiva escudo
                        bullet.removeFromScreen();
                        this.escudoP2 = 0;
                        this.player2.play('AnimShip2');
                    }   
                });
            }
        }
        
        /** PLAYER 1 embate no ENIMIGO */
        if(this.livesP1 > 0)
        {
            this.physics.add.overlap(this.player1, this.enemies, (player1) => {

                if (this.escudoP1==0)
                {
                    console.log("Crash Player 1. Restam " + (player1.livesP1-1) + " vidas.");   
                    if (player1.canBeKilled) {
                        player1.deadP1();
                        this.livesP1=player1.livesP1;
                        this.labelLivesP1.setText("Vidas: " + this.livesP1);
                        if (player1.livesP1 > 0)
                        {
                            this.time.addEvent({
                                delay: 1000,
                                callback: () => {
                                    player1.reviveP1();
                                }
                            });
                        }
                        this.boosSound.play();
                    }
                }    
                else
                {
                    console.log("Inimigo embateu no Player 1 que perde Escudo.");
                    if (player1.canBeKilled) {
                        //prevents new collision
                        player1.canBeKilled = false;
                        player1.x = -100;
                        player1.y = -100;                        
                        if (player1.livesP1 > 0)
                        {
                            this.time.addEvent({
                                delay: 1000,
                                callback: () => {
                                    player1.reviveP1();
                                }
                            });
                        }
                    }
                    this.escudoP1 = 0;
                    this.player1.play('AnimShip1');
                }
            });
        }

        if (this.nplayer==2 && this.livesP2 > 0)
        {
            /** PLAYER 2 embate no ENIMIGO */
            this.physics.add.overlap(this.player2, this.enemies, (player2) => {
                if (this.escudoP2==0)
                {
                    if (player2.canBeKilled) {
                        console.log("Crash Player 2. Restam " + (player2.livesP2-1) + " vidas.");
                        player2.deadP2();
                        this.livesP2=player2.livesP2;
                        this.labelLivesP2.setText("Vidas: " + this.livesP2);
                        if (player2.livesP2 > 0)
                        {                    
                            this.time.addEvent({
                                delay: 1000,
                                callback: () => {
                                    player2.reviveP2();
                                }
                            });
                        }
                        this.boosSound.play();
                    }
                }
                else
                {
                    console.log("Inimigo embateu no Player 2 que perde Escudo.");
                    if (player2.canBeKilled) {
                        //prevents new collision
                        player2.canBeKilled = false;
                        player2.x = -100;
                        player2.y = -100;                        
                        if (player2.livesP2 > 0)
                        {
                            this.time.addEvent({
                                delay: 1000,
                                callback: () => {
                                    player2.reviveP2();
                                }
                            });
                        }
                    }
                    this.escudoP2 = 0;
                    this.player2.play('AnimShip2');
                }
            });
        }


        //Audios
        this.themeSound = this.sound.add("theme", { volume: 0.1 });
        this.themeSound.play();
        let fireSound = this.sound.add("fire", { volume: 0.1 });
        this.explosionSound = this.sound.add("sound_explosion", { volume: 0.4 });
        this.bonusSound = this.sound.add("sound_bonus", { volume: 0.4 });
        this.boosSound = this.sound.add("sound_boos", { volume: 0.4 });
        this.music = false;


        if(this.livesP1 > 0){
            this.player1.fireSound = fireSound;
        }

        if (this.nplayer==2 && this.livesP2 > 0){
            this.player2.fireSound = fireSound;
        }

        this.input.keyboard.on('keyup-Q', function () {
            if (!this.music){
                console.log("Audio Desativo"); this.themeSound.pause();
            } else{
                console.log("Audio Ativo");this.themeSound.play();
            }
            this.music=!this.music;
        }, this);  


        this.input.keyboard.on('keyup-Y', function () {
            if (this.themeSound.volume<1)
            {this.themeSound.volume=this.themeSound.volume+0.1;}
            }, this);  

        this.input.keyboard.on('keyup-U', function () {
            if (this.themeSound.volume>0)
            {this.themeSound.volume=this.themeSound.volume-0.1;}
            }, this);  

        this.game.paused = false;
       
        this.input.keyboard.on('keyup-P', function () {
            console.log("Game Pause");
            this.game.paused = true;
            alert("GAME PAUSED!");
            this.game.paused = false;
            console.log("Game Continue");
            }, this);  

    }
    
    
    validarNumEnemies() 
    {
        //Reset quando é outro nivel
        if(nrTotalEnemys==0){
            this.currentLevel+=1;
            if (this.player1.livesP1 > 0)
            {
                this.player1.scoreP1+=50;
            }
            if (this.nplayer==2 && this.player2.livesP2 > 0)
            {
                this.player2.scoreP2+=50;
            }
            //this.enemies = new EnemiesGroup(this.physics.world, this, this.level);//1 == nivel do jogo
            nrTotalEnemys = this.currentLevel * this.currentLevel;
            this.labelNrTotalEnemys.setText(nrTotalEnemys + " Inimigos");
            
            if (this.nplayer==2)
            {
                this.scene.restart({
                    level: this.currentLevel,
                    scoreP1: this.player1.scoreP1,
                    scoreP2: this.player2.scoreP2,
                    livesP1: this.livesP1,
                    livesP2: this.livesP2,
                    jogadores: 2,
                    nome1: this.Player1Name,
                    nome2: this.Player2Name,
                    escudoP1: this.escudoP1,
                    escudoP2: this.escudoP2
                });
            }
            else
            {
                this.scene.restart({
                    level: this.currentLevel,
                    scoreP1: this.player1.scoreP1,
                    scoreP2: 0,
                    livesP1: this.livesP1,
                    livesP2: 0,
                    jogadores: 1,
                    nome1: this.Player1Name,
                    nome2: this.Player2Name,
                    escudoP1: this.escudoP1,
                    escudoP2: this.escudoP2
                });
            }
                
           
        }
    }


    update(time, delta){
        
        this.enemies.update(this.cursors,time,nrTotalEnemys,InicialEnemys,this.currentLevel, this.boss);
        //Mover o background
        bg.tilePositionY = -Math.fround(iter) * 150;    
        bg.tilePositionX = Math.fround(iter) * 40;
        iter += bgSpeed;

        if (this.livesP1 > 0 || this.livesP2 > 0) {
            //deal with enemies spawn rate
            //this.spawnNewEnemies();
            if(this.player1.livesP1 > 0){
                this.player1.update(this.cursors, time);
            }

            if (this.nplayer==2)
            {
                if(this.livesP2 > 0){
                    this.player2.update(this.keysP2, time);
                }
            }

            this.enemies.children.iterate(function (enemy) {
                if (enemy.isOutsideCanvas()) {
                    //bullet.active = false;
                    this.enemies.killAndHide(enemy);
                }
            }, this);

        }
        else
        {
            alert("GAME OVER!");
            var pos1 = this.highscores.verifyScore(this.player1.scoreP1);
            if (pos1 > 0) 
            {
                this.highscores.setHighscore(pos1,this.Player1Name,this.player1.scoreP1);
            }
            if (this.nplayer==2)
            {
                var pos2 = this.highscores.verifyScore(this.player2.scoreP2);
                if (pos2 > 0) 
                {
                    this.highscores.setHighscore(pos2,this.Player2Name,this.player2.scoreP2);
                }
            } 
            this.scene.start("Menu");
        }
    }
}