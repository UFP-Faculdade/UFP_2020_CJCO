import Bullet_to_E from './Bullet_to_enemy.js';
import Explosion from './Explosion.js';

export default class Player1 extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "playerP1");
        this.scene.add.existing(this);
        //enable physics wo sprite
        this.scene.physics.world.enable(this);
        
        
        this.livesP1 = 3;
        this.scoreP1 = 0;
        this.timeToShoot=0;//devido à bala do passaro
        this.fireRate = 500;
        this.bulletsMaxSize=5;

        //this.bullet=[]; //criar um array
        this.bulletss = this.scene.physics.add.group({
            maxSize: this.bulletsMaxSize,
            classType:Bullet_to_E
        });

        //used to create an invencibility time window after a death
        this.canBeKilled = true;


    }

    setValues(pontos, vidas)
    {
        this.scoreP1 = pontos;
        this.livesP1 = vidas;
    }

    update(cursors, time){
        //acrescentei esta linha teste github
        
        if(cursors.space.isDown && this.timeToShoot < time){ //Disparar a bala

            let bullet=this.bulletss.getFirstDead(true, this.x, this.y, "bullet_to_player", "bullet_to_enemy");



            if(bullet){//Apos disparar 5 vezes bloqueia
                
                bullet.fire_to_enemy();
                
            }
            this.timeToShoot= time + this.fireRate;
            if (this.fireSound) {
                this.fireSound.play();
            }
        }

        this.bulletss.children.iterate(function(bullet){
            
            const width=this.scene.game.config.width;//Diz local da imagem
            const height=this.scene.game.config.height;//Diz local da imagem
        
            if(bullet.isOutsideCanvas()){ //se bala for maior que tamanho do ecra
                
                this.bulletss.killAndHide(bullet);
                //this.scoreP1 -= 2;
                //console.log("123abc");
            }
        }, this)//devido ao objeto
        

        //MOVER O PLAYER
        this.setVelocity(0);
        const width=this.scene.game.config.width;//Diz local da imagem
        const height=this.scene.game.config.height;//Diz local da imagem
        const velocityy = 200;
        if(cursors.down.isDown && this.y<height-this.frame.halfHeight-25){//Quando carrega em DOWN e não passar do ecra
            this.setVelocityY(velocityy);
        }
        if(cursors.up.isDown && this.y>this.frame.halfHeight +50){
            this.setVelocityY(-velocityy);
        }

        //if(cursors.left.isDown && this.x>this.frame.halfWidth){
        if(cursors.left.isDown && this.x>10){

            this.setVelocityX(-velocityy);
        }
        //if(cursors.right.isDown && this.x<width-this.frame.halfWidth){
        if(cursors.right.isDown && this.x<width-10){    
            this.setVelocityX(velocityy);
        }

        
    }

    
    /**
     * create an explosion, decrease one life, prevent a new collision and put the player1 off-screen
     */
    deadP1() {
        let x = this.x;
        let y = this.y;
        new Explosion(this.scene, x, y);
        this.livesP1 -= 1;

        //prevents new collision
        this.canBeKilled = false;
        this.x = -100;
        this.y = -100;

    }


    
    /**
     * replace the player1 on-screen, change the player1 color (tint) and re-enable collisions
     */
    reviveP1() {
        const width = this.scene.game.config.width;
        const height = this.scene.game.config.height;
       
        this.x = 100;
        this.y = (height - 100);

        let i = 0;
        let repetition = 200
        let changeTint = true;

        /**
         * timer to change the player1's color/tint 
         */
        this.scene.time.addEvent({
            repeat: repetition,
            loop: false,
            callback: () => {

                //in the last repetition replace the normal color (tint) and re-enables collision
                if (i >= repetition) {
                    this.tint = 0xFFFFFF
                    this.canBeKilled = true;
                } else {

                    if (changeTint) {
                        this.tint = 0xFF0000
                    } else {
                        this.tint = 0xFFFFFF
                    }
                    if (i % 20 == 0) {
                        changeTint = !changeTint;
                    }

                }
                i++
            }
        });
    }


}