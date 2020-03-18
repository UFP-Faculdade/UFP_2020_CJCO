import Bullet from './Bullet.js';

export default class bird extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "playerD");
        this.scene.add.existing(this);
        //enable physics wo sprite
        this.scene.physics.world.enable(this);
        
        this.timeToShoot=0;//devido à bala do passaro
        this.fireRate = 250;
        this.bulletsMaxSize=5;

        //this.bullet=[]; //criar um array
        this.bulletss = this.scene.physics.add.group({
            maxSize: this.bulletsMaxSize,
            classType:Bullet
        });

    }

    update(cursors, time){
        
        if(cursors.space.isDown && this.timeToShoot < time){ //Disparar a bala

            let bullet=this.bulletss.getFirstDead(true, this.x, this.y, "bulletE");
            if(bullet){//Apos disparar 5 vezes bloqueia
                
                bullet.fire_to_enemy();
                
            }
            this.timeToShoot= time + this.fireRate;
        }

        this.bulletss.children.iterate(function(bullet){
            
            const width=this.scene.game.config.width;//Diz local da imagem
            const height=this.scene.game.config.height;//Diz local da imagem
        
            if(bullet.isOutsideCanvas()){ //se bala for maior que tamanho do ecra
                //bullet.active = false;//coloca a 0 nr balas
                this.bulletss.killAndHide(bullet);
            }
        }, this)//devido ao objeto
        
        
        //MOVER O PLAYER
        this.setVelocity(0);
        const width=this.scene.game.config.width;//Diz local da imagem
        const height=this.scene.game.config.height;//Diz local da imagem
        const velocityy = 200;
        if(cursors.down.isDown && this.y<height-this.frame.halfHeight){//Quando carrega em DOWN e não passar do ecra
            this.setVelocityY(velocityy);
        }
        if(cursors.up.isDown && this.y>this.frame.halfHeight){
            this.setVelocityY(-velocityy);
        }
        if(cursors.left.isDown && this.x>this.frame.halfWidth){
            this.setVelocityX(-velocityy);
        }
        if(cursors.right.isDown && this.x<width-this.frame.halfWidth){
            this.setVelocityX(velocityy);
        }

        
    }

}