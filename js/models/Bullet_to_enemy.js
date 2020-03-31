export default class Bullet_to_E extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "bullet_to_enemy");
        //super(scene, x, y, "bullet_to_player");
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.baseVelocity=350;

    }

    fire_to_enemy(){//Dispara em direção ao enimigo
        this.setVelocityY(-200);

        this.active = true;  
        this.visible = true;
        this.play('AnimBullet_to_enemy');
        
       // this.setBounce(0.8);
        //this.setCollideWorldBounds(true);
        
        this.setScale(0.6);
    }


    removeFromScreen() {
        this.x = -100;
        this.setVelocity(0, 0);
    }

    isOutsideCanvas(){
        const width=this.scene.game.config.width;//Diz local da imagem
        const height=this.scene.game.config.height;//Diz local da imagem
        
        return this.x > width | this.y > height || this.x<0 || this.y<0;
    }

    isInsideCanvas100(){
        const width=this.scene.game.config.width;//Diz local da imagem
        //const height=this.scene.game.config.height;//Diz local da imagem
        
        return this.x>0 || this.x<width || this.y>0 || this.y<10;
    }

}