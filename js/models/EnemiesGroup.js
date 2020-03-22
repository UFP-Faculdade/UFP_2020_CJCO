import enemy from "./Enemy.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class EnemiesGroup extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, linhas, colunas) {
        super(world, scene);
        const width = (this.scene.game.config.width / colunas);
        const height = ((this.scene.game.config.height / 2) / linhas);
       
        //enemies.playAnimation('AnimEnemy');

        for (let i = 0; i < colunas; i++) {
            for (let j = 0; j < linhas; j++) {
                let child = new enemy(scene, 30 + (i * width), 70 + (j * height));
                //child.active = false;
                this.add(child);
            }
        }

        console.log(this);

    }
}