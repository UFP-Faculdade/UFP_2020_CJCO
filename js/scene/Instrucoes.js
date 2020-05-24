export default class instrucoes extends Phaser.Scene{
    constructor(){
        super("Instrucoes");
    }

    create(){

        const width=this.game.config.width;
        const height=this.game.config.height;

        this.bg = this.add.tileSprite(0, 0, width*4, height*4, 'bg');

        this.labelName = this.add.text(width-450, height-600, "Teclas Jogador 1:", {
            font: "12px magv5",
            fill: "#ff0000",
            stroke: "#ffff00 ",
            strokeThickness: 2
        });

        this.labelName = this.add.text(width-400, height-580, "Esquerda: ", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.img = this.add.image(width-80,height-570,"se");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-400, height-560, "Direita:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.img = this.add.image(width-80,height-550,"sd");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-400, height-540, "Cima:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.img = this.add.image(width-80,height-530,"sc");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-400, height-520, "Baixo:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        
        this.img = this.add.image(width-80,height-510,"sb");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-400, height-500, "Disparo:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.img = this.add.image(width-80,height-490,"sp");
        this.img.setScale(0.2);
        
        this.labelName = this.add.text(width-450, height-460, "Teclas Jogador 2:", {
            font: "12px magv5",
            fill: "#ff0000",
            stroke: "#ffff00 ",
            strokeThickness: 2
        });

        this.labelName = this.add.text(width-400, height-440, "Esquerda: ", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });


        this.img = this.add.image(width-80,height-430,"ae");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-400, height-420, "Direita:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.img = this.add.image(width-80,height-410,"dd");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-400, height-400, "Cima:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.img = this.add.image(width-80,height-390,"wc");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-400, height-380, "Baixo:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        this.img = this.add.image(width-80,height-370,"ss");
        this.img.setScale(0.2);     
        this.labelName = this.add.text(width-400, height-360, "Disparo:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        this.img = this.add.image(width-80,height-350,"xp");
        this.img.setScale(0.2); 
        this.labelName = this.add.text(width-450, height-330, "Outras Teclas:", {
            font: "12px magv5",
            fill: "#ff0000",
            stroke: "#ffff00 ",
            strokeThickness: 2
        });

        this.labelName = this.add.text(width-400, height-310, "Ligar/Desligar Música: ", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        this.img = this.add.image(width-80,height-305,"vq");
        this.img.setScale(0.2); 

        this.labelName = this.add.text(width-400, height-290, "Baixar/Aumentar Volume Música:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });


        this.img = this.add.image(width-80,height-285,"vu");
        this.img.setScale(0.2);
        
        this.img = this.add.image(width-100,height-285,"vy");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-400, height-270, "Pausar Jogo:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        this.img = this.add.image(width-80,height-265,"ps");
        this.img.setScale(0.2);





        this.labelName = this.add.text(width-450, height-235, "Bónus no Jogo:", {
            font: "12px magv5",
            fill: "#ff0000",
            stroke: "#ffff00 ",
            strokeThickness: 2
        });


        this.img = this.add.image(width-390,height-210,"bonus1");
        this.img.setScale(0.5);

        this.labelName = this.add.text(width-370, height-218, "Proteção de Escudo", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });       

        this.img = this.add.image(width-390,height-185,"bonus2");
        this.img.setScale(0.5);

        this.labelName = this.add.text(width-370, height-192, "Vida Extra", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });    
        



        this.labelName = this.add.text(width-450, height-150, "Pontuação:", {
            font: "12px magv5",
            fill: "#ff0000",
            stroke: "#ffff00 ",
            strokeThickness: 2
        });

        this.labelName = this.add.text(width-400, height-130, "Nave Inimiga Abatida:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });

        this.labelName = this.add.text(width-170, height-130, "Nivel * Vidas * 2", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        

        this.labelName = this.add.text(width-400, height-110, "Nivel Seguinte:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        this.labelName = this.add.text(width-170, height-110, "50 Pontos", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        

        this.labelName = this.add.text(width-400, height-90, "Tiros no Boss:", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });
        this.labelName = this.add.text(width-170, height-90, "Nivel do boss", {
            font: "12px magv5",
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 6
        });


        this.labelName = this.add.text(width-380, height-40, "Press SPACE to continue", {
            font: "20px magv5",
            fill: "#ff0000",
            stroke: "#000000",
            strokeThickness: 6
        });
        


        this.input.keyboard.on('keyup_SPACE', function () {this.scene.start("Menu");}, this);   
    }
}