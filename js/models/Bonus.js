

export default class Bonus extends Phaser.Physics.Arcade.Sprite{

    constructor(scene, x, y, bonus){
        super(scene, x, y, "bonus"+bonus);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        
        this.baseVelocity=100;
    }

    dropar(){
        
        this.setVelocityY(80);

        this.active = true;
        this.visible = true;

        this.setScale(0.8);
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

    update(){
        this.dropar();
    }

}  