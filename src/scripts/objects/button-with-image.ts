export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, sprite, label, onClick) {
    super(scene, x, y)
    const bg = this.scene.add.image(0, 0, sprite).setOrigin(0)
    const text = this.scene.add.text(0, 0, label).setOrigin(0)
    text.setX(bg.width / 2 - text.width / 2)
    text.setY(bg.height / 2 - text.height / 2)
    this.setX(x).setY(y)

    if (typeof onClick === 'function') {
        bg.setInteractive({cursor: "pointer"}).on("pointerdown", onClick);
    }

    this.add([bg, text]);
    return this;
  }
}
