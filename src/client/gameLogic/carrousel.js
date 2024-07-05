export default class Carrousel{
    constructor(scene, x, y, button1Key, button2Key, lockButtonKey, characterKeys) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.index = 0;
        this.lock = false;

        this.button1 = scene.add.image(x-64, y, button1Key).setInteractive().setScale(0.3);
        this.button2 = scene.add.image(x+64, y, button2Key).setInteractive().setScale(0.3);
        this.lockButton = scene.add.image(x, y + 50, lockButtonKey).setInteractive().setScale(0.5);
        this.blockImage = scene.add.image(x,y, "Lock").setScale(0.3).setVisible(false);

        this.characters = characterKeys.map((key) => {
            return scene.add.image(x, y - 64, key).setVisible(false);
        });
        this.characters[0].setVisible(true);

        this.button1.on('pointerup', this.previousCharacter, this);
        this.button1.on('pointerdown', ()=>{if(!this.lock){this.button1.setTexture("Izquierda-Pulsada");}});
        this.button1.on('pointerout', ()=>{if(!this.lock){this.button1.setTexture("Boton-Izquierda");}});

        this.button2.on('pointerup', this.nextCharacter, this);
        this.button2.on('pointerdown', ()=>{if(!this.lock){this.button2.setTexture("Derecha-Pulsada");}});
        this.button2.on('pointerout', ()=>{if(!this.lock){this.button2.setTexture("Boton-Derecha");}});

        this.lockButton.on('pointerup', this.lockCharacter, this);
        this.lockButton.on('pointerdown', function(){this.setTexture("Listo-Pulsado");});
        this.lockButton.on('pointerout', function(){this.setTexture("Boton-Lock");});


        this.lockedCharacter = null;
    }
    previousCharacter() {
        if(!this.lock){
            this.button1.setTexture("Boton-Izquierda");
            this.characters[this.index].setVisible(false);
            if (this.index === 0) {
                this.index = this.characters.length - 1;
            } else {
                this.index--;
            }
            this.characters[this.index].setVisible(true);
        }   
    }

    nextCharacter() {
        if(!this.lock){
            this.button2.setTexture("Boton-Derecha");
            this.characters[this.index].setVisible(false);
            if (this.index === this.characters.length - 1) {
                this.index = 0;
            } else {
                this.index++;
            }
            this.characters[this.index].setVisible(true);
        }
    }

    lockCharacter() {
        this.lockButton.setTexture("Boton-Lock");
        this.lock = !this.lock;
        this.lockedCharacter = this.characters[this.index];
        this.blockImage.setVisible(this.lock);
        if(this.lock){
            this.button1.setTexture("Izquierda-Pulsada");
            this.button2.setTexture("Derecha-Pulsada");
        }else{
            this.button1.setTexture("Boton-Izquierda");
            this.button2.setTexture("Boton-Derecha");
        }
    }
}