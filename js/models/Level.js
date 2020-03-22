export default class level extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        

    }

    currentLevel(levelGame){
        

    }

}