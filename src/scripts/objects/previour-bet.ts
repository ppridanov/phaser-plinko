import { Game } from "phaser";
import Button from "./button";

export default class PreviousBet extends Phaser.GameObjects.Container {
    bet
    sprite
    constructor(scene, x, y, texture, text, scaleX) {
        super(scene, x, y);
        this.sprite = this.scene.add.sprite(x, y, texture);
        this.sprite.setScale(scaleX, 1.05);
        this.add(this.sprite);
        var style = { font: "36px Calibri", color: 'black', fontWeight: 'bold' };
        const buttonText = this.scene.add.text(0, 0, text, style).setOrigin(0);
        buttonText.x = this.sprite.getBounds().width / 2 - buttonText.width / 2;
        buttonText.y = this.sprite.getBounds().height / 2 - buttonText.height / 2;
        this.add(buttonText);
        this.setScale(1.05);
        return this;
    }
}