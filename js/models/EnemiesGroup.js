import enemy from "./Enemy.js";

/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class EnemiesGroup extends Phaser.Physics.Arcade.Group {
    //constructor(world, scene, linhas, colunas) {
    constructor(world, scene, level) {

        switch(level) {
            case 1:
              var nrEnemysColunas=1;
              var nrEnemysLinhas=1;
              break;
            case 2:
                var nrEnemysColunas=2;
                var nrEnemysLinhas=2;
              break;
            case 3:
                var nrEnemysColunas=3;
                var nrEnemysLinhas=3;
              break;
            case 4:
                var nrEnemysColunas=4;
                var nrEnemysLinhas=4;
              break;
            default:
                var nrEnemysColunas=2;
                var nrEnemysLinhas=7;
          }
          var nrTotalEnemys=nrEnemysColunas*nrEnemysLinhas;//Calcular numero de enimigos para depois avançar de nivel

        super(world, scene);
        const width = this.scene.game.config.width;
        const height = this.scene.game.config.height;
        const width_enemy = (width / nrEnemysColunas);
        const height_enemy = (height / 2 / nrEnemysLinhas);
       
        //enemies.playAnimation('AnimEnemy');

        for (let i = 0; i < nrEnemysColunas; i++) {
            for (let j = 0; j < nrEnemysLinhas; j++) {
                let child = new enemy(scene, 30 + (i * width_enemy), 70 + (j * height_enemy));

                //child.active = false;

                this.add(child);
            }
        }

        console.log(this);

    }
}