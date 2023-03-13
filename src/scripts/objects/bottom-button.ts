export default class BottomButton extends Phaser.GameObjects.Container {
  scene: Phaser.Scene
  constructor(scene, x, y, onClick, text, sprite) {
    super(scene)
    this.scene = scene;
    this.setX(x).setY(y);
    this.createButton(sprite, text, onClick);
    return this;
  }

  createButton(sprite, text, onClick) {
    const image = this.scene.add
      .image(0, 0, sprite)
      .setOrigin(0)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => onClick)
    const label = this.scene.add.text(0, 0, text, { font: `72px ${this.scene.registry.get('font')}` })
    label.setX(image.width / 2 - label.width / 2).setY(image.height / 2 - label.height / 2)
    this.add([image, label])
  }
}
