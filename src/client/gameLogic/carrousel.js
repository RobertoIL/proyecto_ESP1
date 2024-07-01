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

        this.characters = characterKeys.map((key) => {
            return scene.add.image(x, y - 64, key).setVisible(false);
        });
        this.characters[0].setVisible(true);

        this.button1.on('pointerup', this.previousCharacter, this);
        this.button2.on('pointerup', this.nextCharacter, this);
        this.lockButton.on('pointerup', this.lockCharacter, this);

        this.lockedCharacter = null;
    }
    previousCharacter() {
        if(!this.lock){
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
        this.lock = !this.lock;
        this.lockedCharacter = this.characters[this.index];
        if (this.graphics) {
            this.graphics.destroy();
            this.graphics = null;
        }
        let selected = this.characters[this.index].texture.key;
        if (this.lock && (selected.includes("Saber") || selected.includes("Mage"))) {
            this.graphics = this.scene.add.graphics();
            this.graphics.fillStyle(0x00ff00, 0.5);
            this.graphics.fillRect(this.x - 50, this.y - this.characters[this.index].height - 50, 100, 100);
        }else if(this.lock){
            this.graphics = this.scene.add.graphics();
            this.graphics.fillStyle(0x00ff00, 0.5);
            this.graphics.fillRect(this.x - 50, this.y-this.button1.height*0.3/2-100-3, 100, 100);
        }
    }
}