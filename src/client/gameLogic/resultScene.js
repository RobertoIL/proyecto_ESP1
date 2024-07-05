import historialService from "../services/historialService";
import { useAuthStore } from "../stores/authStore";
export default class ResultScene extends Phaser.Scene {
  constructor() {
    super({ key: "ResultScene" });
  }
  preload() {}
  create() {
    console.log("Ganador:", this.ganador);
    console.log("Vida restante:", this.vidaRestante);
    console.log("Clase seleccionada:", this.claseGanador);

    let graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 0.5);
    graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

    this.add.text(100, 200, `Ganador: ${this.ganador}`, {
      fontSize: "32px",
      fill: "#FFF",
    });
  }
  update(time, delta) {}
  init(data) {
    this.ganador = data.winner;
    this.claseGanador = data.classW;
    this.vidaRestante = data.hp;
    this.jugador2 = "Invitado";
    if(this.ganador != "Invitado"){
      this.jugador1 = this.ganador;
    }else{
      this.jugador1 = data.loser;
    }
  }

  guardarHistorial() {
    const store = useAuthStore();
    const historial = {
      jugador1: this.jugador1,
      jugador2: this.jugador2,
      ganador: this.ganador,
      user: store.getUserId,
    };
    historialService.addHistorial(historial);
  }
}
