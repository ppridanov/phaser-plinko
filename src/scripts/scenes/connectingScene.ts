export default class ConnectingScene extends Phaser.Scene {
    text
    constructor() {
        super({ key: 'ConnectingScene' })
    }
    create() {
        let { width, height } = this.sys.game.canvas;
        const rectangle = this.add.rectangle(0, 0, width, height, 0x00000, 7).setOrigin(0);
        this.text = this.add.text(width / 2, height / 2, 'Соединение с сервером', { font: "700 36px Calibri" }).setOrigin(.5, .5);
        rectangle.setInteractive();
        rectangle.on('pointerdown', (event) => {
            return
        })
    }
    update(time) { }
}
