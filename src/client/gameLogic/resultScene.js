export default class ResultScene extends Phaser.Scene{
    constructor(){
        super({key: "ResultScene"});
    }
    preload(){
    }
    create(){
        console.log('Ganador:', this.ganador);
        console.log('Vida restante:', this.vidaRestante);
        console.log('Clase seleccionada:', this.claseGanador);

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.5);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        this.add.text(100, 200, 'Overlay Scene', { fontSize: '32px', fill: '#FFF' });
    }
    update(time, delta){
    }
    init(data){
        this.ganador = data.winner;
        this.claseGanador = data.classW;
        this.vidaRestante = data.hp;
    }
}