import Phaser from "phaser";

export default class Draw extends Phaser.Scene {
    container: Phaser.GameObjects.Container;
    draw: Phaser.GameObjects.Text;
    version: Phaser.GameObjects.Text;
    private i18n: any;

    constructor() {
        super({key: "Draw"});
    }

    create() {
        // Draw Container
        this.container = this.add.container(0, 1030);

        // Draw Text
        this.draw = this.add
            .text(0, 0, this.i18n.t('draw') + " 313131", {font: `20px ${this.registry.get("fontBold")}`})
            .setAngle(90)
            .setOrigin(0);
        this.draw.setX(this.sys.canvas.width - 5).setY(509 / 2 - this.draw.width / 2);

        this.container.add([this.draw]);
    }

    setData(data) {
        if (data) {
            this.draw.setText('Тираж: ' + data);
            this.draw.setX(this.sys.canvas.width - 5).setY(509 / 2 - this.draw.width / 2);
        }
    }
}
