export default class bulletE extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, "bulletE");
        //super(scene, x, y, "bulletE");
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.baseVelocity=350;


    }

    
    fire_to_enemy(){//Dispara em direção ao enimigo
        this.setVelocityY(-200);


        this.active = true;  
        this.visible = true;
        this.play('AnimBullet');
        


        
       // this.setBounce(0.8);
        //this.setCollideWorldBounds(true);
        
        this.setScale(0.5);
    }

    fire_to_player(player1){//Dispara em direção ao PLAYER
        
        
        
        const dx = player1.x - this.x;
        const dy = player1.y - this.y;

        const alpha=Math.atan2(dy, dx);//Angolo da bala
        const vx=this.baseVelocity * Math.cos(alpha);
        const vy=this.baseVelocity * Math.sin(alpha);

        this.setVelocityX(vx);
        this.setVelocityY(vy);
        
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

}