import eventsCenter from "../eventEmmiter"

export default class Bet extends Phaser.GameObjects.Container {
    onInputOver = () => { }
    onInputOut = () => { }
    onInputUp = () => { }
    isRotating
    notification
    isDisabled
    constructor(scene, texture, actionOnClick = () => { }, sound, label) {
        super(scene);
        scene.add.existing(this);
    }
    disableButton() {
        this.disableInteractive();
    }
}