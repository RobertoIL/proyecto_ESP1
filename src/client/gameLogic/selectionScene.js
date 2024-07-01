import Carrousel from "./carrousel.js";
export default class SelectionScene extends Phaser.Scene{
    constructor(){
        super({key: "SelectionScene"});
    }
    preload(){
        this.load.image("boton", "../assets/Botones/Boton.png");

        this.load.image("Boton-Izquierda", "../assets/Botones/Boton-Flecha-Izquierda.png");
        this.load.image("Boton-Derecha", "../assets/Botones/Boton-Flecha-Derecha.png");
        this.load.image("Boton-Lock", "../assets/Botones/Boton-Listo.png");


        this.load.image("Saber-solo", "../assets/Saber/Saber1.png");
        this.load.image("Archer-solo", "../assets/Archer/Archer1.png");
        this.load.image("Mage-solo", "../assets/Mage/Mage1.png");
        this.load.image("Lancer-solo", "../assets/Lancer/Lancer1.png");
    }
    create(){
        this.characters = ["Saber-solo","Archer-solo","Mage-solo","Lancer-solo"];

        this.carouselLeft = new Carrousel(this, this.cameras.main.width / 4, this.cameras.main.height / 2, 'Boton-Izquierda', 'Boton-Derecha', 'Boton-Lock', this.characters);
        this.carouselRight = new Carrousel(this, (this.cameras.main.width / 4) * 3, this.cameras.main.height / 2, 'Boton-Izquierda', 'Boton-Derecha', 'Boton-Lock', this.characters);
        this.index = 0;
    }
    update(time, delta){
        if(this.carouselLeft.lock && this.carouselRight.lock){
            this.scene.start("GameScene", {player1: this.carouselLeft.lockedCharacter, player2: this.carouselRight.lockedCharacter});
        }
    }

}