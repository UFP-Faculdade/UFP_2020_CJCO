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
            fill: "#ff0000"
        });

        this.labelName = this.add.text(width-400, height-580, "Esquerda: ", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-80,height-570,"se");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-400, height-560, "Direita:", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-80,height-550,"sd");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-400, height-540, "Cima:", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-80,height-530,"sc");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-400, height-520, "Baixo:", {
            font: "12px magv5",
            fill: "#ffffff"
        });
        
        this.img = this.add.image(width-80,height-510,"sb");
        this.img.setScale(0.08);

        this.labelName = this.add.text(width-400, height-500, "Disparo:", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-80,height-490,"sp");
        this.img.setScale(0.2);
        
        this.labelName = this.add.text(width-450, height-460, "Teclas Jogador 2:", {
            font: "12px magv5",
            fill: "#ff0000"
        });

        this.labelName = this.add.text(width-400, height-440, "Esquerda: ", {
            font: "12px magv5",
            fill: "#ffffff"
        });


        this.img = this.add.image(width-80,height-430,"ae");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-400, height-420, "Direita:", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-80,height-410,"dd");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-400, height-400, "Cima:", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.img = this.add.image(width-80,height-390,"wc");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-400, height-380, "Baixo:", {
            font: "12px magv5",
            fill: "#ffffff"
        });
        this.img = this.add.image(width-80,height-370,"ss");
        this.img.setScale(0.2);     
        this.labelName = this.add.text(width-400, height-360, "Disparo:", {
            font: "12px magv5",
            fill: "#ffffff"
        });
        this.img = this.add.image(width-80,height-350,"xp");
        this.img.setScale(0.2); 
        this.labelName = this.add.text(width-450, height-320, "Outras Teclas:", {
            font: "12px magv5",
            fill: "#ff0000"
        });

        this.labelName = this.add.text(width-400, height-300, "Ligar/Desligar Música: ", {
            font: "12px magv5",
            fill: "#ffffff"
        });
        this.img = this.add.image(width-80,height-295,"vq");
        this.img.setScale(0.2); 

        this.labelName = this.add.text(width-400, height-280, "Baixar/Aumentar Volume Música:", {
            font: "12px magv5",
            fill: "#ffffff"
        });


        this.img = this.add.image(width-80,height-275,"vu");
        this.img.setScale(0.2);
        
        this.img = this.add.image(width-100,height-275,"vy");
        this.img.setScale(0.2);

        this.labelName = this.add.text(width-400, height-260, "Pausar Jogo:", {
            font: "12px magv5",
            fill: "#ffffff"
        });
        this.img = this.add.image(width-80,height-255,"ps");
        this.img.setScale(0.2);
        this.labelName = this.add.text(width-450, height-220, "Bónus no Jogo:", {
            font: "12px magv5",
            fill: "#ff0000"
        });


        this.img = this.add.image(width-400,height-190,"bonus1");
        this.img.setScale(0.6);

        this.labelName = this.add.text(width-320, height-195, "Proteção de Escudo", {
            font: "12px magv5",
            fill: "#ffffff"
        });       

        this.img = this.add.image(width-400,height-160,"bonus2");
        this.img.setScale(0.6);

        this.labelName = this.add.text(width-320, height-165, "Vida Extra", {
            font: "12px magv5",
            fill: "#ffffff"
        });    
        
        this.labelName = this.add.text(width-450, height-130, "Pontuação:", {
            font: "12px magv5",
            fill: "#ff0000"
        });

        this.labelName = this.add.text(width-400, height-110, "Nave Inimiga Abatida:", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-170, height-110, "Nivel * Vidas * 2", {
            font: "12px magv5",
            fill: "#ffffff"
        });
        
        this.labelName = this.add.text(width-400, height-90, "Nivel Seguinte:", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-170, height-90, "50 Pontos", {
            font: "12px magv5",
            fill: "#ffffff"
        });

        this.labelName = this.add.text(width-380, height-50, "Press SPACE to continue", {
            font: "20px magv5",
            fill: "#ff0000"
        });
        


        this.input.keyboard.on('keyup_SPACE', function () {this.scene.start("Menu");}, this);   
    }
}