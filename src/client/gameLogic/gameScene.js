export default class GameScene extends Phaser.Scene{
    constructor(){
        super({key: "GameScene"});
    }
    preload(){    
        this.load.spritesheet('player1_walk',this.rutaP1, {frameWidth: this.walk1.size, frameHeight: this.walk1.size});
        this.load.spritesheet('player1_attack',this.rutaP1.replace("Walk", "Attack"), {frameWidth: this.attack1.size, frameHeight: this.attack1.size});

        this.load.spritesheet('player2_walk',this.rutaP2, {frameWidth: this.walk2.size, frameHeight: this.walk2.size});
        this.load.spritesheet('player2_attack',this.rutaP2.replace("Walk", "Attack"), {frameWidth: this.attack2.size, frameHeight: this.attack2.size});

        if(this.rutaP1.includes("Archer") || this.rutaP2.includes("Archer")){
            this.load.image('flecha', '../assets/Archer/Flecha.png');
        }
        if(this.rutaP1.includes("Mage") || this.rutaP2.includes("Mage")){
            this.load.image('fireball', '../assets/Mage/Fireball2.png');
        }
    }
    create(){
        this.physics.world.setBounds(0, 60, 800, 500);

        this.player1Sprite = this.physics.add.sprite(0,0,'player1_walk', this.walk1.total*2).setCollideWorldBounds(true).setInteractive();
        this.player2Sprite = this.physics.add.sprite(200, 0,'player2_walk', this.walk2.total*2).setCollideWorldBounds(true).setInteractive();

        this.flechas = this.physics.add.group();
        this.fireballs = this.physics.add.group();

        this.createAnims(this.anims);

        this.hitbox = [new Hitboxes(this.player1Class), new Hitboxes(this.player2Class)];

        this.player1Sprite.setSize(this.hitbox[0].hitbox.vertical_walk.width, this.hitbox[0].hitbox.vertical_walk.height);
        this.player1Sprite.setOffset(this.hitbox[0].hitbox.vertical_walk.offsetX, this.hitbox[0].hitbox.vertical_walk.offsetY);

        this.player2Sprite.setSize(this.hitbox[1].hitbox.vertical_walk.width, this.hitbox[1].hitbox.vertical_walk.height);
        this.player2Sprite.setOffset(this.hitbox[1].hitbox.vertical_walk.offsetX, this.hitbox[1].hitbox.vertical_walk.offsetY);

        this.gameKeysPlayer1 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.Q
        });
        this.gameKeysPlayer2 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.I,
            left: Phaser.Input.Keyboard.KeyCodes.J,
            down: Phaser.Input.Keyboard.KeyCodes.K,
            right: Phaser.Input.Keyboard.KeyCodes.L,
            attack: Phaser.Input.Keyboard.KeyCodes.U
        });

        this.direcctions = [{
            up: false,
            left: false,
            down: true,
            right: false
        },
        {
            up: false,
            left: false,
            down: true,
            right: false
        }];

        this.healthBar = [this.add.graphics(), this.add.graphics()];
        this.maxVelocity = 100;
        this.maxHp = 100;
        this.velocityX = [0,0];
        this.velocityY = [0,0];
        this.attacking = [false, false];
        this.walking = [false, false];
        this.isAttacking = [false, false];
        this.attackHitbox = [
            this.physics.add.sprite(-100, -100, null).setOrigin(0.5, 0.5).setVisible(false).setSize(this.hitbox[0].hitbox.vertical_walk.width, this.hitbox[0].hitbox.vertical_walk.height),
            this.physics.add.sprite(-100, -100, null).setOrigin(0.5, 0.5).setVisible(false).setSize(this.hitbox[0].hitbox.vertical_walk.width, this.hitbox[0].hitbox.vertical_walk.height)
        ];
        this.hp = [100,100];
        this.damage = [10,10];
        this.inmune = [false, false];

        this.player1Sprite.on('animationupdate', (animation, frame) =>{
            if(animation.key.includes("right") && animation.key.includes("attack") && frame.index >= this.attack1.total-2 && !(this.player1Class == "Archer") && !(this.player1Class == "Mage")){
                if(this.player1Class == "Lancer"){
                    this.updateAttackHitbox(0,this.player1Sprite.x, this.player1Sprite.y, 60,  15, 42, (12.5));
                }else if(this.player1Class == "Saber"){
                    this.updateAttackHitbox(0,this.player1Sprite.x, this.player1Sprite.y, 68,  29, 46, -(39));
                }
            }else if(animation.key.includes("left") && animation.key.includes("attack") && frame.index >= this.attack1.total-2 && !(this.player1Class == "Archer") && !(this.player1Class == "Mage")){
                if(this.player1Class == "Lancer"){
                    this.updateAttackHitbox(0,this.player1Sprite.x, this.player1Sprite.y, 60,  15, -42, (12.5));
                }else if(this.player1Class == "Saber"){
                    this.updateAttackHitbox(0,this.player1Sprite.x-64, this.player1Sprite.y, 68,  29, 18, -(39));
                }
            }else if(animation.key.includes("up") && animation.key.includes("attack") && frame.index >= this.attack1.total-2 && !(this.player1Class == "Archer") && !(this.player1Class == "Mage")){
                if(this.player1Class == "Lancer"){
                    this.updateAttackHitbox(0,this.player1Sprite.x, this.player1Sprite.y, 15,  53, 8, -(45));
                }else if(this.player1Class == "Saber"){
                    this.updateAttackHitbox(0,this.player1Sprite.x, this.player1Sprite.y, 68,  29, 0, -60);
                }
            }else if(animation.key.includes("down") && animation.key.includes("attack") && frame.index >= this.attack1.total-2 && !(this.player1Class == "Archer") && !(this.player1Class == "Mage")){
                if(this.player1Class == "Lancer"){
                    this.updateAttackHitbox(0,this.player1Sprite.x, this.player1Sprite.y, 15,  40, -3, (52));
                }else if(this.player1Class == "Saber"){
                    this.updateAttackHitbox(0,this.player1Sprite.x, this.player1Sprite.y, 68,  29, 0, -5);
                }
            }
            if(animation.key.includes("attack") && frame.index == this.attack1.total-4 && this.player1Class == "Archer"){
                this.dispararFlecha(this.player1Sprite, animation.key.replace("attack_", "").replace("_1", ""), this.player2Sprite);
            }
            if(animation.key.includes("attack") && frame.index == this.attack1.total && this.player1Class == "Mage"){
                this.lanzarHechizo(this.player1Sprite, animation.key.replace("attack_", "").replace("_1", ""), this.player2Sprite);
            }
        });
        this.player2Sprite.on('animationupdate', (animation, frame) =>{
            if(animation.key.includes("right") && animation.key.includes("attack") && frame.index >= this.attack2.total-2){
                if(this.player2Class == "Lancer"){
                    this.updateAttackHitbox(1,this.player2Sprite.x, this.player2Sprite.y, 60,  15, 42, (12.5));
                }else if(this.player2Class == "Saber"){
                    this.updateAttackHitbox(1,this.player2Sprite.x, this.player2Sprite.y, 68,  29, 46, -(39));
                }
            }else if(animation.key.includes("left") && animation.key.includes("attack") && frame.index >= this.attack2.total-2){
                if(this.player2Class == "Lancer"){
                    this.updateAttackHitbox(1,this.player2Sprite.x, this.player2Sprite.y, 60,  15, -42, (12.5));
                }else if(this.player2Class == "Saber"){
                    this.updateAttackHitbox(1,this.player2Sprite.x-64, this.player2Sprite.y, 68,  29, 18, -(39));
                }
            }else if(animation.key.includes("up") && animation.key.includes("attack") && frame.index >= this.attack2.total-2){
                if(this.player2Class == "Lancer"){
                    this.updateAttackHitbox(1,this.player2Sprite.x, this.player2Sprite.y, 15,  53, 8, -(45));
                }else if(this.player2Class == "Saber"){
                    this.updateAttackHitbox(1,this.player2Sprite.x, this.player2Sprite.y, 68,  29, 0, -60);
                }
            }else if(animation.key.includes("down") && animation.key.includes("attack") && frame.index >= this.attack2.total-2){
                if(this.player2Class == "Lancer"){
                    this.updateAttackHitbox(1,this.player2Sprite.x, this.player2Sprite.y, 15,  40, -3, (52));
                }else if(this.player2Class == "Saber"){
                    this.updateAttackHitbox(1,this.player2Sprite.x, this.player2Sprite.y, 68,  29, 0, -5);
                }
            }
            if(animation.key.includes("attack") && frame.index == this.attack2.total-4 && this.player2Class == "Archer"){
                this.dispararFlecha(this.player2Sprite, animation.key.replace("attack_", "").replace("_2", ""), this.player1Sprite);
            }
            if(animation.key.includes("attack") && frame.index == this.attack2.total && this.player2Class == "Mage"){
                this.lanzarHechizo(this.player2Sprite, animation.key.replace("attack_", "").replace("_2", ""), this.player1Sprite);
            }
        });

        this.physics.add.overlap(this.attackHitbox[0], this.player2Sprite, ()=>{
            if(this.attackHitbox[0].active && !this.inmune[1]){
                this.hp[1] -= this.damage[0];
                this.inmune[1] = true;
            }else if(!this.attackHitbox[0].active && this.inmune[1]){
                this.inmune[1] = false;
            }
        });
        this.physics.add.overlap(this.attackHitbox[1], this.player1Sprite, ()=>{
            if(this.attackHitbox[1].active && !this.inmune[0]){
                this.hp[0] -= this.damage[1];
                this.inmune[0] = true;
            }else if(!this.attackHitbox[1].active && this.inmune[0]){
                this.inmune[0] = false;
            }
        });
    }
    update(time, delta){
        //Player 1
        this.movePlayer(this.gameKeysPlayer1, 0);

        //Player 2
        this.movePlayer(this.gameKeysPlayer2, 1);

        this.updateAnimation(this.player1Sprite, 0, 1, this.attacking[0], this.walking[0]);
        this.updateAnimation(this.player2Sprite, 1, 2, this.attacking[1], this.walking[1]);

        this.player1Sprite.setVelocity(this.velocityX[0],this.velocityY[0]);
        this.player2Sprite.setVelocity(this.velocityX[1], this.velocityY[1]);

        this.updateHealthBars();

        if(this.hp[0] <= 0){
            this.hp[0] = 0;
            this.scene.launch("ResultScene", {winner: "Jugador 2", classW: this.player2Class, hp: this.hp[1]});
            this.scene.pause();
        }else if(this.hp[1] <= 0){
            this.hp[1] = 0;
            this.scene.launch("ResultScene", {winner: "Jugador 1", classW: this.player1Class, hp: this.hp[0]});
            this.scene.pause();
        }
    }
    init(data){
        const player1 = data.player1.texture.key.replace("-solo","");
        const player2 = data.player2.texture.key.replace("-solo","");

        this.player1Class = player1;
        this.player2Class = player2;

        this.rutaP1 = "../assets/"+player1+"/Walk.png";
        this.rutaP2 = "../assets/"+player2+"/Walk.png";

        this.verificarTamaños(player1, player2);
    }
    createAnims(animation){
        this.createAllAnimation(animation, this.player1Class, 1);
        this.createAllAnimation(animation, this.player2Class, 2);
    }
    updateDirection(direction, indexDirections){
        switch(direction){
            case("Up"):
                this.direcctions[indexDirections].up = true;
                this.direcctions[indexDirections].left = false;
                this.direcctions[indexDirections].down = false;
                this.direcctions[indexDirections].right = false;
                break;
            case("Left"):
                this.direcctions[indexDirections].up = false;
                this.direcctions[indexDirections].left = true;
                this.direcctions[indexDirections].down = false;
                this.direcctions[indexDirections].right = false;
                break;
            case("Down"):
                this.direcctions[indexDirections].up = false;
                this.direcctions[indexDirections].left = false;
                this.direcctions[indexDirections].down = true;
                this.direcctions[indexDirections].right = false;
                break;
            case("Right"):
                this.direcctions[indexDirections].up = false;
                this.direcctions[indexDirections].left = false;
                this.direcctions[indexDirections].down = false;
                this.direcctions[indexDirections].right = true;
                break;
            default:
                this.direcctions[indexDirections].up = false;
                this.direcctions[indexDirections].left = false;
                this.direcctions[indexDirections].down = true;
                this.direcctions[indexDirections].right = false;
                break;
        }
    }
    updateAnimation(player, indexDirections, indexPlayer, attacking, walking){
        if(attacking){
            this.updateAttackAnimation(player, indexDirections, indexPlayer);
        }else if(walking){
            this.updateWalkingAnimation(player, indexDirections, indexPlayer);
        }else{
            this.updateIdleAnimation(player, indexDirections, indexPlayer);
        }
    }
    updateAttackAnimation(player, indexDirections, indexPlayer){
        if(this.isAttacking[indexDirections]){
            return;
        }
        let nombreAnim = "";
        if(this.direcctions[indexDirections].up){
            nombreAnim = "attack_up_"+indexPlayer;
        }else if(this.direcctions[indexDirections].left){
            nombreAnim = "attack_left_"+indexPlayer;
        }else if(this.direcctions[indexDirections].down){
            nombreAnim = "attack_down_"+indexPlayer;
        }else{
            nombreAnim = "attack_right_"+indexPlayer;
        }
        if(nombreAnim.includes("left") || nombreAnim.includes("right")){
            player.setSize(this.hitbox[indexDirections].hitbox.horizontal_attack.width, this.hitbox[indexDirections].hitbox.horizontal_attack.height);
            player.setOffset(this.hitbox[indexDirections].hitbox.horizontal_attack.offsetX, this.hitbox[indexDirections].hitbox.horizontal_attack.offsetY);
        }else{
            player.setSize(this.hitbox[indexDirections].hitbox.vertical_attack.width, this.hitbox[indexDirections].hitbox.vertical_attack.height);
            player.setOffset(this.hitbox[indexDirections].hitbox.vertical_attack.offsetX, this.hitbox[indexDirections].hitbox.vertical_attack.offsetY);
        }
        if((this.player1Class == "Saber" && indexPlayer==1) || (this.player2Class == "Saber" && indexPlayer==2) && !this.isAttacking[indexDirections]){
            player.setPosition(player.x, player.y+39);
        }
        player.anims.play(nombreAnim, true);

        player.once('animationcomplete', (anim) => {
            if (anim.key === nombreAnim) {
                this.isAttacking[indexDirections] = false;
                if(nombreAnim.includes("left") || nombreAnim.includes("right")){
                    player.setSize(this.hitbox[indexDirections].hitbox.horizontal_walk.width, this.hitbox[indexDirections].hitbox.horizontal_walk.height);
                    player.setOffset(this.hitbox[indexDirections].hitbox.horizontal_walk.offsetX, this.hitbox[indexDirections].hitbox.horizontal_walk.offsetY);
                }else{
                    player.setSize(this.hitbox[indexDirections].hitbox.vertical_walk.width, this.hitbox[indexDirections].hitbox.vertical_walk.height);
                    player.setOffset(this.hitbox[indexDirections].hitbox.vertical_walk.offsetX, this.hitbox[indexDirections].hitbox.vertical_walk.offsetY);
                }
                if((this.player1Class == "Saber" && indexPlayer==1) || (this.player2Class == "Saber" && indexPlayer==2)){
                    player.setPosition(player.x, player.y-39);
                }
                this.attackHitbox[indexDirections].active = false;
                this.updateIdleAnimation(player, indexDirections, indexPlayer);
            }
        }, this);

        
        this.isAttacking[indexDirections] = true;
    }
    updateWalkingAnimation(player, indexDirections, indexPlayer){
        if(this.direcctions[indexDirections].up){
            player.anims.play("walk_up_"+indexPlayer, true);
        }else if(this.direcctions[indexDirections].left){
            player.anims.play("walk_left_"+indexPlayer, true);
        }else if(this.direcctions[indexDirections].down){
            player.anims.play("walk_down_"+indexPlayer, true);
        }else{
            player.anims.play("walk_right_"+indexPlayer, true);
        }
    }
    updateIdleAnimation(player, indexDirections, indexPlayer){
        if(this.direcctions[indexDirections].up){
            player.anims.play("still_up_"+indexPlayer, true);
        }else if(this.direcctions[indexDirections].left){
            player.anims.play("still_left_"+indexPlayer, true);
        }else if(this.direcctions[indexDirections].down){
            player.anims.play("still_down_"+indexPlayer, true);
        }else{
            player.anims.play("still_right_"+indexPlayer, true);
        }
    }
    updateAttackHitbox(playerId,x,y, width, height, offsetX, offsetY){
        this.attackHitbox[playerId].setActive(true);
        this.attackHitbox[playerId].setPosition(x + offsetX, y + offsetY);
        this.attackHitbox[playerId].setSize(width, height);
    }
    verificarTamaños(player1, player2){
        this.walk1 = this.devolverTamañosWalk(player1);
        this.walk2 = this.devolverTamañosWalk(player2);

        this.attack1 = this.devolverTamañosAttack(player1);
        this.attack2 = this.devolverTamañosAttack(player2);
    }
    devolverTamañosWalk(player){
        if(player == "Archer" || player == "Lancer"){
            return {total: 9, size: 128};
        }else{
            return {total: 9, size: 64};
        }
    }
    devolverTamañosAttack(player){
        if(player == "Lancer" || player == "Mage"){
            return {total: 8, size: 192};
        }else if(player=="Archer"){
            return {total: 13, size:64};
        }else{
            return {total: 6, size: 192};
        }
    }
    createAllAnimation(animation,player, index){
        let totalWalkFrames = this.devolverTamañosWalk(player).total;
        let totalAttackFrames = this.devolverTamañosAttack(player).total;
        animation.create({
            key: 'still_up_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_walk',{
                start: 0,
                end: (totalWalkFrames)-(totalWalkFrames-3)
            }),
            repeat: -1,
            frameRate: 5,
            yoyo: true
        });
        animation.create({
            key: 'still_left_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_walk',{
                start: totalWalkFrames,
                end: (totalWalkFrames*2)-(totalWalkFrames-3)
            }),
            repeat: -1,
            frameRate: 5,
            yoyo: true
        });
        animation.create({
            key: 'still_down_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_walk',{
                start: totalWalkFrames*2,
                end: (totalWalkFrames*3)-(totalWalkFrames-3)
            }),
            repeat: -1,
            frameRate: 5,
            yoyo: true
        });
        animation.create({
            key: 'still_right_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_walk',{
                start: totalWalkFrames*3,
                end: (totalWalkFrames*4)-(totalWalkFrames-3)
            }),
            repeat: -1,
            frameRate: 5,
            yoyo: true
        });
        animation.create({
            key: 'walk_up_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_walk',{
                    start: 0,
                    end: totalWalkFrames-1
            }),
            repeat: -1,
            frameRate: 15
        });
        animation.create({
            key: 'walk_left_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_walk',{
                    start: totalWalkFrames,
                    end: (totalWalkFrames*2)-1
            }),
            repeat: -1,
            frameRate: 15
        });
        animation.create({
            key: 'walk_down_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_walk',{
                    start: totalWalkFrames*2,
                    end: (totalWalkFrames*3)-1
            }),
            repeat: -1,
            frameRate: 15 
        });
        animation.create({
            key: 'walk_right_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_walk',{
                    start: totalWalkFrames*3,
                    end: (totalWalkFrames*4)-1
            }),
            repeat: -1,
            frameRate: 15
        });
        animation.create({
            key: 'attack_up_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_attack',{
                start: 0,
                end: totalAttackFrames-1
            }),
            repeat: 0,
            frameRate: 15
        });
        animation.create({
            key: 'attack_left_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_attack',{
                start: totalAttackFrames,
                end: (totalAttackFrames*2)-1
            }),
            repeat: 0,
            frameRate: 15
        });
        animation.create({
            key: 'attack_down_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_attack',{
                start: totalAttackFrames*2,
                end: (totalAttackFrames*3)-1
            }),
            repeat: 0,
            frameRate: 15
        });
        animation.create({
            key: 'attack_right_'+index,
            frames: animation.generateFrameNumbers('player'+index+'_attack',{
                start: totalAttackFrames*3,
                end: (totalAttackFrames*4)-1
            }),
            repeat: 0,
            frameRate: 15
        });
    }
    createInputs(playerSprite1, playerSprite2){
        //Inputs del usuario
        this.input.keyboard.on("keydown-D", ()=>{
            this.player1Sprite.setVelocity(100,0);
        });
        this.input.keyboard.on("keyup-D", ()=>{
            this.player1Sprite.setVelocity(0,0);
        });

        this.input.keyboard.on("keydown-A", ()=>{
            this.player1Sprite.setVelocity(-100,0);
        });
        this.input.keyboard.on("keyup-A", ()=>{
            this.player1Sprite.setVelocity(0,0);
        });
        this.input.keyboard.on("keydown-S", ()=>{
            this.player1Sprite.setVelocity(0,100);
        });
        this.input.keyboard.on("keyup-S", ()=>{
            this.player1Sprite.setVelocity(0,0);
        });
        this.input.keyboard.on("keydown-W", ()=>{
            this.player1Sprite.setVelocity(0,-100);
        });
        this.input.keyboard.on("keyup-W", ()=>{
            this.player1Sprite.setVelocity(0,0);
        });
    }
    movePlayer(player, indexAP){
        if(player.left.isDown){
            this.velocityX[indexAP] = -this.maxVelocity;
            this.updateDirection("Left",indexAP);
        }else if(player.right.isDown){
            this.velocityX[indexAP] = this.maxVelocity;
            this.updateDirection("Right", indexAP);
        }else{
            this.velocityX[indexAP] = 0;
        }
        if(player.up.isDown){
            this.velocityY[indexAP] = -this.maxVelocity;
            this.updateDirection("Up", indexAP);
        }else if(player.down.isDown){
            this.velocityY[indexAP] = this.maxVelocity;
            this.updateDirection("Down", indexAP);
        }else{
            this.velocityY[indexAP] = 0;
        }
        if(player.left.isDown || player.right.isDown || player.up.isDown || player.down.isDown){
            this.walking[indexAP] = true;
        }else{
            this.walking[indexAP] = false;
        }
        if(player.attack.isDown){
            this.attacking[indexAP] = true;
        }else{
            if(!this.isAttacking[indexAP]){
                this.attacking[indexAP] = false;
            }
        }
    }
    updateHealthBars() {
        this.healthBar[0].clear();
        this.healthBar[1].clear();

        this.drawHealthBar(this.healthBar[0], 10, 30, 200, 20, this.hp[0], this.maxHp, 0x00ff00);

        this.drawHealthBar(this.healthBar[1], this.cameras.main.width-210, 30, 200, 20, this.hp[1], this.maxHp, 0x00ff00);
    }
    drawHealthBar(graphics, x, y, width, height, currentHealth, maxHealth, color) {
        let healthPercentage = currentHealth / maxHealth;

        graphics.fillStyle(0x808080);
        graphics.fillRect(x, y, width, height);

        if(x >= this.cameras.main.width/2){
            graphics.fillStyle(color);
            graphics.fillRect(x+((width+x)-((width*healthPercentage)+x)), y, width*healthPercentage, height);
        }else{
            graphics.fillStyle(color);
            graphics.fillRect(x, y, width * healthPercentage, height);
        }
    }
    dispararFlecha(player, direction, enemy){
        let flecha = this.flechas.create(player.x, player.y, 'flecha');
        let widthT = flecha.width;
        let heightT = flecha.height;
        let indexEnemy = Number.parseInt(enemy.texture.key.replace("player", "").replace("_walk", "").replace("_attack", ""))-1;
        let indexPlayer = Number.parseInt(player.texture.key.replace("player", "").replace("_walk", "").replace("_attack", ""))-1;
        switch(direction){
            case "up":
                flecha.setVelocity(0, -500);
                flecha.angle = -90;
                flecha.setSize(heightT, widthT);
                break;
            case "left":
                flecha.setVelocity(-500, 0);
                flecha.angle = 180;
                break;
            case "down":
                flecha.setVelocity(0, 500);
                flecha.setSize(heightT, widthT);
                flecha.angle = 90;
                break;
            case "right":
                flecha.setVelocity(500, 0);
                break;
        }
        this.physics.add.collider(flecha, enemy, ()=>{
            this.hp[indexEnemy]-=this.damage[indexPlayer];
            flecha.destroy();
        });
        this.time.delayedCall(2000, () => {
            flecha.destroy();
        }, [], this);
    }
    lanzarHechizo(player, direction, enemy){
        let fireball = this.fireballs.create(player.x, player.y, 'fireball');
        let widthT = fireball.width;
        let heightT = fireball.height;
        let indexEnemy = Number.parseInt(enemy.texture.key.replace("player", "").replace("_walk", "").replace("_attack", ""))-1;
        let indexPlayer = Number.parseInt(player.texture.key.replace("player", "").replace("_walk", "").replace("_attack", ""))-1;
        switch(direction){
            case "up":
                fireball.setVelocity(0, -500);
                fireball.angle = -90;
                fireball.setSize(heightT, widthT);
                break;
            case "left":
                fireball.setPosition(player.x, player.y+heightT/2);
                fireball.setVelocity(-500, 0);
                fireball.angle = 180;
                break;
            case "down":
                fireball.setVelocity(0, 500);
                fireball.setSize(heightT, widthT);
                fireball.angle = 90;
                break;
            case "right":
                fireball.setPosition(player.x, player.y+heightT/2);
                fireball.setVelocity(500, 0);
                break;
        }
        this.physics.add.collider(fireball, enemy, ()=>{
            this.hp[indexEnemy]-=this.damage[indexPlayer];
            fireball.destroy();
        });
        this.time.delayedCall(2000, () => {
            fireball.destroy();
        }, [], this);
    }
}
class Hitboxes{
    constructor(classA){
        switch (classA){
            case "Archer":
                this.setArcher();
                break;
            case "Lancer":
                this.setLancer();
                break;
            case "Mage":
                this.setMage();
                break;
            case "Saber":
                this.setSaber();
                break;
        };
    }
    setArcher(){
        this.hitbox = {
            vertical_walk: {
                width: 30,
                height: 50,
                offsetX: 49,
                offsetY: 43
            },
            horizontal_walk: {
                width: 20,
                height: 50,
                offsetX: 55,
                offsetY: 44
            },
            vertical_attack: {
                width: 30,
                height: 50,
                offsetX: 16,
                offsetY: 12
            },
            horizontal_attack: {
                left: {
                    width: 19,
                    height: 51,
                    offsetX: 25,
                    offsetY: 11
                },
                right: {
                    width: 19,
                    height: 51,
                    offsetX: 20,
                    offsetY: 11
                },
                width: 19,
                height: 51,
                offsetX: 22.5,
                offsetY: 11
                
            }
        };
    }
    setLancer(){
        this.hitbox = {
            vertical_walk: {
                up:{
                    width: 30,
                    height: 47,
                    offsetX: 49,
                    offsetY: 46
                },
                down:{
                    width: 30,
                    height: 50,
                    offsetX: 49,
                    offsetY: 46
                },
                
                //Datos por default en caso de olvidar especificar la direccion.
                width: 30,
                height: 48.5,
                offsetX: 49,
                offsetY: 46
            },
            horizontal_walk: {
                width: 22,
                height: 49,
                offsetX: 53,
                offsetY: 46
            },
            vertical_attack: {
                up:{
                    width: 30,
                    height: 47,
                    offsetX: 81,
                    offsetY: 79,
                    attackWidth: 11,
                    attackHeight: 56,
                    attackOffsetX: 99,
                    attackOffsetY: 27
                },
                down:{
                    width: 30,
                    height: 50,
                    offsetX: 81,
                    offsetY: 78
                },

                //Datos por default en caso de olvidar especificar la direccion.
                width: 30,
                height: 48.5,
                offsetX: 81,
                offsetY: 78.5
            },
            horizontal_attack: {
                width: 22,
                height: 49,
                offsetX: 85,
                offsetY: 78,
                left:{
                    attackWidth: 56,
                    attackHeight: 11,
                    attackOffsetX: 25,
                    attackOffsetY: 103
                },
                right:{
                    attackWidth: 56,
                    attackHeight: 11,
                    attackOffsetX: 111,
                    attackOffsetY: 103
                }
            }
        };
    }
    setMage(){
        this.hitbox = {
            vertical_walk: {
                width: 28,
                height: 48,
                offsetX: 18,
                offsetY: 13
            },
            horizontal_walk: {
                width: 22,
                height: 48,
                offsetX: 20,
                offsetY: 15
            },
            vertical_attack: {
                width: 28,
                height: 44,
                offsetX: 82,
                offsetY: 82
            },
            horizontal_attack: {
                width: 24,
                height: 50,
                offsetX: 83,
                offsetY: 77
            }
        };
    }
    setSaber(){
        this.hitbox = {
            vertical_walk: {
                width: 30,
                height: 50,
                offsetX: 17,
                offsetY: 13
            },
            horizontal_walk: {
                width: 22,
                height: 49,
                offsetX: 21,
                offsetY: 14
            },
            vertical_attack: {
                width: 30,
                height: 49,
                offsetX: 81,
                offsetY: 38
            },
            horizontal_attack: {
                width: 22,
                height: 49,
                offsetX: 85,
                offsetY: 38
            }
        };
    }
}