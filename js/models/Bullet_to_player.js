export default class Bullet_to_P extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        //super(scene, x, y, "bullet_to_enemy");
        super(scene, x, y, "bullet_to_player");
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.baseVelocity=100;
    }

    fire_to_player(velocidade){//Dispara em direção ao PLAYER
        
        this.setVelocityY(velocidade);

        /*
        const dx = player1.x - this.x;
        const dy = player1.y - this.y;

        const alpha=Math.atan2(dy, dx);//Angolo da bala
        const vx=this.baseVelocity * Math.cos(alpha);
        const vy=this.baseVelocity * Math.sin(alpha);

        this.setVelocityX(vx);
        this.setVelocityY(vy);
        */

        this.active = true;
        this.visible = true;

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