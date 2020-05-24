import enemy from "./Enemy.js";


/**
 * Class created to include logic to group creation
 * classType argument for Scene::add.group does not call overriden constructor
 * it will create as many Enemy objects as passed by maxSize argument
 */
export default class EnemiesGroup extends Phaser.Physics.Arcade.Group {
  
    nrnaves;

    //constructor(world, scene, linhas, colunas) {
    constructor(world, scene, level, nave) {
      var nrEnemysColunas;
      var nrEnemysLinhas;

      super(world, scene);

      this.nrnaves = 0;

      switch(level) {
        case 1:
          var MatrixLevel =[[1,0,0,0,0,0,0,0],
                            [0,1,0,0,0,0,0,0],
                            [0,0,1,1,0,0,0,0],
                            [0,0,0,0,1,1,0,0],
                            [0,0,0,0,0,0,1,0],
                            [0,0,0,0,0,0,0,1]];
          break;
        case 2:
          var MatrixLevel =[[0,1,0,0,0,0,0,1],
                            [0,0,0,0,0,0,1,0],
                            [0,0,0,0,1,1,0,0],
                            [0,0,1,1,0,0,0,0],
                            [0,1,0,0,0,0,0,0],
                            [1,0,0,0,0,0,1,0]];
          break;
        case 3:
          var MatrixLevel =[[1,0,0,0,0,0,0,1],
                            [0,1,0,0,0,0,1,0],
                            [0,0,1,0,1,1,0,0],
                            [0,0,1,1,0,1,0,0],
                            [0,1,0,0,0,0,1,0],
                            [1,0,0,0,0,0,0,1]];
          break;
        case 4:
          var MatrixLevel =[[1,1,1,1,1,1,1,1],
                            [0,1,0,0,0,0,1,0],
                            [0,0,1,0,0,1,0,0],
                            [1,1,0,1,1,0,1,1],
                            [0,0,1,0,0,1,0,0],
                            [0,0,0,1,1,0,0,0]];
          break;  
        case 5:
          var MatrixLevel =[[1,0,1,0,1,0,1,0],
                            [0,1,0,1,0,1,0,1],
                            [1,0,1,0,1,0,1,0],
                            [0,1,0,1,0,1,0,1],
                            [1,0,1,0,1,0,1,0],
                            [0,1,0,1,0,1,0,1]];
          break;                       
        default:
          var MatrixLevel =[[0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,2,0,0,0],
                            [0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0]];
      }

     
      
      const linhas = 6;
      const colunas = 8;
      const width = this.scene.game.config.width;
      const height = this.scene.game.config.height;
      const width_enemy = (width / colunas);
      const height_enemy = (height / 2 / linhas - 10);                    

      for (let i = 0; i < colunas; i++) {
        for (let j = 0; j < linhas; j++) {      
          if (MatrixLevel[j][i] == nave)
          {
            this.nrnaves+=1;
            let child = new enemy(scene, 30 + (i * width_enemy), 140 + (j * height_enemy), level);
            //child.active = false;
            this.add(child);

          }
        }
      }
      this.timeToShoot=0;
      this.FireRate=800;

    }

    getNrNaves()
    {
      return this.nrnaves;
    }

    update(cursors, time, nrTotalEnemys, InicialEnemys, nivel, boss)
    {
      //console.log("Entrou");
      
      if(this.timeToShoot < time)
      {
        this.timeToShoot = time + this.FireRate;
        //console.log("Entrou");
        /*
        let bullet=this.bulletss.getFirstDead(true, this.x, this.y, "bullet");
        if(bullet){//Apos disparar 5 vezes bloqueia
            
            bullet.fire_to_player(this.scene.player1);
            bullet.setScale(1.25);
            
            //bullet.setBounce(0.8);//Quando bater, perde lanço
            //bullet.setCollideWorldBounds(true);
         */   
            this.fireRate=800;
            if (boss==1)
            {
                this.fireRate=0;
            }
            this.timeToShoot= time + this.fireRate;

            if(nrTotalEnemys>0)
            {
              //console.log(nrTotalEnemys);
              var randEnimies = Phaser.Math.Between(0, InicialEnemys-1);
              //console.log(randEnimies);
              var inimigo = this.getChildren()[randEnimies];
              while (inimigo==null)
              {
                  randEnimies++;
                  if (randEnimies>InicialEnemys-1){ randEnimies = 0;}
                  inimigo = this.getChildren()[randEnimies];
              }            
              inimigo.update(this.cursors,time, nivel, boss);
              //console.log(nrTotalEnemys);
            }
            

      }
    }
        
}

