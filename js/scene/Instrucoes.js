export default class instrucoes extends Phaser.Scene{
    constructor(){
        super("Instrucoes");
    }

    create(){

        const width=this.game.config.width;
        const height=this.game.config.height;

        this.bg = this.add.tileSprite(0, 0, width*4, height*4, 'bg');

        this.labelName = this.add.text(width-400, height-600, "Teclas Jogador 1:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-350, height-580, "Esquerda: ", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-140,height-570,"se");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-350, height-560, "Direita:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-140,height-550,"sd");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-350, height-540, "Cima:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-140,height-530,"sc");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-350, height-520, "Baixo:", {
            font: "14px magv5",
            fill: "#ffffff"
        });
        
        this.img = this.add.image(width-140,height-510,"sb");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-350, height-500, "Disparo:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-140,height-490,"sp");
        this.img.setScale(0.2);
        
        this.labelName = this.add.text(width-400, height-460, "Teclas Jogador 2:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-350, height-440, "Esquerda: ", {
            font: "14px magv5",
            fill: "#ffffff"
        });


        this.img = this.add.image(width-140,height-430,"ae");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-350, height-420, "Direita:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-140,height-410,"dd");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-350, height-400, "Cima:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-140,height-390,"wc");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-350, height-380, "Baixo:", {
            font: "14px magv5",
            fill: "#ffffff"
        });
        this.img = this.add.image(width-140,height-370,"ss");
        this.img.setScale(0.2);     
        this.labelName = this.add.text(width-350, height-360, "Disparo:", {
            font: "14px magv5",
            fill: "#ffffff"
        });
        this.img = this.add.image(width-140,height-350,"xp");
        this.img.setScale(0.2); 
        this.labelName = this.add.text(width-400, height-320, "Outras Teclas:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-350, height-300, "Ligar/Desligar Música: ", {
            font: "14px magv5",
            fill: "#ffffff"
        });
        this.img = this.add.image(width-140,height-290,"vq");
        this.img.setScale(0.2); 

        this.labelName = this.add.text(width-350, height-280, "Baixar/Aumentar Volume Música:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-140,height-270,"vu");
        this.img.setScale(0.2);
        
        this.img = this.add.image(width-120,height-270,"vy");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-350, height-260, "Pausar Jogo:", {
            font: "14px magv5",
            fill: "#ffffff"
        });
        this.img = this.add.image(width-140,height-250,"ps");
        this.img.setScale(0.2);
        this.labelName = this.add.text(width-400, height-220, "Bónus no Jogo:", {
            font: "14px magv5",
            fill: "#ffffff"
        });


        this.img = this.add.image(width-350,height-190,"bonus1");
        this.img.setScale(0.6);

        this.labelName = this.add.text(width-320, height-195, "Proteção de Escudo", {
            font: "14px magv5",
            fill: "#ffffff"
        });       

        this.img = this.add.image(width-350,height-160,"bonus2");
        this.img.setScale(0.6);

        this.labelName = this.add.text(width-320, height-165, "Vida Extra", {
            font: "14px magv5",
            fill: "#ffffff"
        });    
        
        this.labelName = this.add.text(width-400, height-130, "Pontuação:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-350, height-110, "Nave Inimiga Abatida:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-140, height-110, "Nivel * Vidas * 2", {
            font: "14px magv5",
            fill: "#ffffff"
        });
        
        this.labelName = this.add.text(width-350, height-90, "Nivel Seguinte:", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-140, height-90, "50 Pontos", {
            font: "14px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-440, height-50, "Press SPACE to continue", {
            font: "20px magv5",
            fill: "#0000ff"
        });
        


        this.input.keyboard.on('keyup_SPACE', function () {this.scene.start("Menu");}, this);   
    }
}