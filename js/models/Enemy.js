import Bullet from './Bullet.js';

export default class enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "enemyD");
        this.scene.add.existing(this);
        //enable physics wo sprite
        this.scene.physics.world.enable(this);
        
        this.timeToShoot=0;//devido à bala do passaro
        this.fireRate = 100;
        this.bulletsMaxSize=1;

        //this.bullet=[]; //criar um array
        this.bulletss = this.scene.physics.add.group({
            maxSize: this.bulletsMaxSize,
            classType:Bullet
        });
    }
    
    update(cursors, time){
        if(this.timeToShoot < time){
            let bullet=this.bulletss.getFirstDead(true, this.x, this.y, "bullet");
            if(bullet){//Apos disparar 5 vezes bloqueia
                
                bullet.fire_to_player(this.scene.bird);
                bullet.setScale(1.25);
                
                //bullet.setBounce(0.8);//Quando bater, perde lanço
                //bullet.setCollideWorldBounds(true);
                



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



    }
        
        
}