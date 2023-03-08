import eventsCenter from "../eventEmmiter"

export default class Button extends Phaser.GameObjects.Container {
    onInputOver = () => { }
    onInputOut = () => { }
    onInputUp = () => { }
    isRotating
    notification
    isDisabled
    renderTexture
    i18n: any
    constructor(scene, color, opacity, actionOnClick, sound, label, type) {
        super(scene);
        const text = new Phaser.GameObjects.Text(scene, 70, 60, label, { font: '700 54px Calibri' }).setOrigin(.5);
        const bg = new Phaser.GameObjects.Graphics(scene).fillStyle(color, opacity).fillRoundedRect(10, 0, 120, 120, 60);
        this.renderTexture = null;
        if (type === 1) {
            this.renderTexture = this.scene.add.renderTexture(-40, 0, 162, 120);
        } else if (type === 2) {
            this.renderTexture = this.scene.add.renderTexture(-40, 0, 162, 120);
        } else if (type === 3 || type === 4) {
            this.renderTexture = this.scene.add.renderTexture(-40, 0, 162, 120);
        } else {
            this.renderTexture = this.scene.add.renderTexture(-120, 10, 162, 120);
        }
        this.isRotating = false;
        this.notification = null;
        this.isDisabled = false;
        // const bet = new Phaser.GameObjects.Image(scene, 0, 0, '')
        eventsCenter.on('isRotating', (data) => {
            this.isRotating = data.isRotating,
                this.notification = data.notification
        });
        eventsCenter.on('disableButton', (data) => {
            if (JSON.parse(data)) {
                this.renderTexture.disableInteractive();
            } else {
                this.renderTexture.setInteractive();
            }
        })
        this.renderTexture.draw([bg, text]);
        this.renderTexture.setInteractive(new Phaser.Geom.Rectangle((type === 1 || type === 0) ? 15 : 50, 12, (type === 1 || type === 0) ? 110 : 50, (type === 1 || type === 0) ? 110 : 100), Phaser.Geom.Rectangle.Contains).on('pointerdown', () => {
            if (!this.isRotating) {
                this.scene.sound.play(sound)
                actionOnClick();
            } else {
                this.notification.setText(this.i18n.t('closeDraw'));
            }
        })
        this.add(this.renderTexture);
        return this;
    }
    disableButton() {
        this.disableInteractive();
    }
}