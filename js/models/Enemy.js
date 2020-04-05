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
        this.setScale(0.35);

        //this.bullet=[]; //criar um array
        this.bulletss = this.scene.physics.add.group({
            maxSize: this.bulletsMaxSize,
            classType:Bullet_to_P
        });

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

    update(cursors, time){
        if(this.timeToShoot < time){
            let bullet=this.bulletss.getFirstDead(true, this.x, this.y, "bullet_to_player");
            if(bullet){//Apos disparar 5 vezes bloqueia
                
                bullet.fire_to_player();
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
            this.timeToShoot= time + this.fireRate;
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