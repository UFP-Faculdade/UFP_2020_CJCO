import enemy from "./Enemy.js";


/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class EnemiesGroup extends Phaser.Physics.Arcade.Group {
  
    nrnaves;

    //constructor(world, scene, linhas, colunas) {
    constructor(world, scene, level) {
      var nrEnemysColunas;
      var nrEnemysLinhas;

      super(world, scene);

      this.nrnaves = 0;

      switch(level) {
        case 1:
          var MatrixLevel = [[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
                    
          break;
        case 2:
          var MatrixLevel = [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
          break;
        case 3:
          var MatrixLevel = [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
          break;
        case 4:
          var MatrixLevel = [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],
          [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
          break;
        case 5:
          var MatrixLevel = [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],
          [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
        break;
        case 6:
          var MatrixLevel = [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],
          [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
        break;
        case 7:
          var MatrixLevel = [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],
          [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
        break;          
        default:
            var MatrixLevel = [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],
                                [1,0,0,1,0,0,1,0],[1,0,0,0,0,1,1,0],[0,0,0,1,1,1,1,0],[1,1,0,1,0,1,1,0]];
      }


      
      const linhas = 8;
      const colunas = 8;
      const width = this.scene.game.config.width;
      const height = this.scene.game.config.height;
      const width_enemy = (width / colunas);
      const height_enemy = (height / 2 / linhas);                    

      for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {      
          if (MatrixLevel[j][i] == 1)
          {
            this.nrnaves+=1;
            let child = new enemy(scene, 30 + (i * width_enemy), 70 + (j * height_enemy),level);
            //child.active = false;
            this.add(child);

          }
        }
      }

       
        //enemies.playAnimation('AnimEnemy');
        //Local das naves
        /*
        for (let i = 0; i < nrEnemysColunas; i++) {
            for (let j = 0; j < nrEnemysLinhas; j++) {
                let child = new enemy(scene, 30 + (i * width_enemy), 70 + (j * height_enemy));

                //child.active = false;

                this.add(child);
            }
        }
        */


        console.log(this);



    }

    getNrNaves()
    {
      return this.nrnaves;
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
  }
}

