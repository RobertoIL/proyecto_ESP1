import connectDB from "@/server/config/mongo";
import GResult from "@/server/models/gameResult.model";
import User from "@/server/models/user.model";

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

        guardarResultado({
            "ganador": this.ganador,
            "perdedor": this.perdedor,
            "claseGanadora": this.claseGanador,
            "clasePerdedora": this.clasePerdedora,
            "tiempo": this.tiempo,
            "hp": this.vidaRestante,
        });
    }
    update(time, delta){
    }
    init(data){
        this.ganador = data.winner;
        this.perdedor = data.loser;
        this.claseGanador = data.classW;
        this.clasePerdedora = data.classL;
        this.tiempo = data.time;
        this.vidaRestante = data.hp;
    }
}
async function guardarResultado(data) {
    try{
        const ganador = await buscarUsuario(data.ganador);
        const perdedor = await buscarUsuario(data.perdedor);

        const nuevoJuego = new GResult({
            "ganador": ganador,
            "perdedor": perdedor,
            "claseGanadora": data.claseGanador,
            "clasePerdedora": data.clasePerdedora,
            "tiempo": data.tiempo,
            "hp": data.vidaRestante,
        })
        await nuevoJuego.save();
    }catch{
        console.log("No se ha podido generar el resultado.");
    }
}
async function buscarUsuario(username) {
    try {
      const usuario = await User.findOne({ username: username }).exec();
      return usuario;
    } catch (error) {
      console.error('Error buscando usuario por username:', error);
      return null;
    }
}