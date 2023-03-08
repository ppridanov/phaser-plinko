import Phaser from "phaser";

export default class GameStatusScene extends Phaser.Scene {
    status
    text
    bg
    width
    constructor() {
        super({ key: 'GameStatusScene' });
    }
    create() { 
        this.width = this.sys.game.canvas.width;
        this.status = this.add.container(0, 955);
        this.text = this.add.text(0, 0, 'Покупайте билеты', {font: `36px ${this.registry.get("font")}`}).setPadding(30, 0);
        this.bg =  this.add
            //@ts-ignore
            .rexRoundRectangle(0, 0, this.text.width, this.text.height, 25, 0xF8BB00, 1)
            .setOrigin(0);
        this.updateSize();
        this.status.add([this.bg, this.text]);
        this.add.existing(this.status);
    }
    updateText = (text) => {
        this.text.setText(text);
        this.updateSize();
    }

    updateSize() {
        this.bg.width = this.text.width;
        this.text.setX(this.bg.width / 2 - this.text.width / 2);
        this.text.setY(this.bg.height / 2 - this.text.height / 2);
        this.status.setX(this.sys.canvas.width / 2 - this.bg.width / 2);
    }
}