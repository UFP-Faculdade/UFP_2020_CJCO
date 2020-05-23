//import Bullet_to_E from './Bullet_to_enemy.js';
import Bullet_to_P from './Bullet_to_player.js';
import Explosion from './Explosion.js';

export default class enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, level){
        
        //console.log("enemy"+level);
        //super(scene, x, y, "enemy"+level);
        super(scene, x, y, "enemy"+level);
        
        this.scene.add.existing(this);
        //enable physics wo sprite
        this.scene.physics.world.enable(this);
        
        this.timeToShoot=0;//devido à bala do passaro
        this.fireRate = 3000;
        this.bulletsMaxSize=1;

        if (level==0){this.setScale(1.00);}
        else{this.setScale(0.35);}

        //this.bullet=[]; //criar um array
        this.bulletss = this.scene.physics.add.group({
            maxSize: this.bulletsMaxSize,
            classType:Bullet_to_P
        });

        this.sentido=0;

    }

    removeFromScreen() {
        new Explosion(this.scene, this.x, this.y);
        this.x = -200;
        this.setVelocity(0, 0);
    }

    isOutsideCanvas() {
        const width = this.scene.game.config.width;
        const height = this.scene.game.config.height;

        return this.x > width || this.y > height || this.x < 0 || this.y < 0;
    }

    update(cursors, time, nivel, boss){
        if(this.timeToShoot < time){
            let bullet=this.bulletss.getFirstDead(true, this.x, this.y, "bullet_to_player");
            if(bullet){//Apos disparar 5 vezes bloqueia
                

                bullet.fire_to_player(100+(nivel*10));//Velocidade bala inimigo por nivel
             

                /*
                var valueRandom = Phaser.Math.Between(1, 2);
                if(valueRandom==1){
                    bullet.fire_to_player(this.scene.player1);
                }else{
                    bullet.fire_to_player(this.scene.player2);
                }
                */
                bullet.setScale(1.1);
                

            }
            this.fireRate=3000;
            if (boss==1)
            {
                this.fireRate=0;
            }
            this.timeToShoot= time + this.fireRate;
        }

        if (boss==1)
        {
            if (this.sentido==0)
            {
                this.setVelocityX(-20);
            }
            else
            {
                this.setVelocityX(20);
            }

            if (this.x<100)
            {
                this.sentido=1;
            }
            else 
            if(this.x>this.scene.game.config.width-100){this.sentido=0;} 
            
            /*
            if(this.sentido==0 && this.x>50 && this.x<(this.scene.game.config.width-50)){
                
                this.setVelocityX(-100);
                this.sentido=1;
            }  else{
                    this.setVelocityX(100);
                    this.sentido=0;
            }
            */  
        }
        
             

        this.bulletss.children.iterate(function(bullet){
            
            const width=this.scene.game.config.width;//Diz local da imagem
            const height=this.scene.game.config.height;//Diz local da imagem
        
            if(bullet.isOutsideCanvas()){ //se bala for maior que tamanho do ecra
                //bullet.active = false;
                this.bulletss.killAndHide(bullet);
            }
        }, this)//devido ao objeto



    }
        
        
}