<template>
    <div id="container"></div>
</template>
<script>
import MainScene from "../gameLogic/mainScene.js";
import SelectionScene from "../gameLogic/selectionScene.js";
import GameScene from "../gameLogic/gameScene.js";
import ResultScene from "../gameLogic/resultScene.js";

export default {
    mounted() {
        const config = {
            width: 800,
            height: 500,
            parent: "container",
            type: Phaser.AUTO,
            pixelArt: true,
            scene: [MainScene, SelectionScene, GameScene, ResultScene],
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            backgroundColor: 0x1E1613
        };

        this.game = new Phaser.Game(config);
    },
    destroyed() {
        if (this.game) {
            this.game.destroy(true);
        }
    }
};
</script>