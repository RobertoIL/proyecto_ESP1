export default class mainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }
  preload() {
    this.load.image("boton-jugar", "public/Botones/Boton-jugar-arreglado.png");
    this.load.image(
      "boton-opciones",
      "public/Botones/Boton-opciones-arreglado.png"
    );
    this.load.image("boton-salir", "public/Botones/Boton-salir-arreglado.png");

    this.load.image("pulsar-jugar", "public/Botones/Boton-Jugar-Pulsado.png");
    this.load.image(
      "pulsar-opciones",
      "public/Botones/Boton-Opciones-Pulsado.png"
    );
    this.load.image("pulsar-salir", "public/Botones/Boton-Salir-Pulsado.png");
  }
  create() {
    this.boton1 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 - 100,
      "boton-jugar"
    );
    this.boton2 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "boton-opciones"
    );
    this.boton3 = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 100,
      "boton-salir"
    );

    this.boton1.setInteractive();
    this.boton2.setInteractive();
    this.boton3.setInteractive();

    this.boton1.on("pointerdown", function () {
      this.setTexture("pulsar-jugar");
    });
    this.boton1.on("pointerup", () => {
      this.scene.start("SelectionScene");
    });
    this.boton1.on("pointerout", function () {
      this.setTexture("boton-jugar");
    });

    this.boton2.on("pointerdown", function () {
      this.setTexture("pulsar-opciones");
    });
    this.boton2.on("pointerup", function () {
      this.setTexture("boton-opciones");
    });
    this.boton2.on("pointerout", function () {
      this.setTexture("boton-opciones");
    });

    this.boton3.on("pointerdown", function () {
      this.setTexture("pulsar-salir");
    });
    this.boton3.on("pointerup", function () {
      this.setTexture("boton-salir");
    });
    this.boton3.on("pointerout", function () {
      this.setTexture("boton-salir");
    });
  }
  update(time, delta) {}
  changeScene() {
    this.scene.start(SelectionScene);
  }
}
