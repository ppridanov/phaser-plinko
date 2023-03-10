export default class Button extends Phaser.GameObjects.Image {
  constructor(scene, x, y, sprite, onClick) {
    super(scene, x, y, sprite);
    this.setInteractive({cursor: "pointer"}).on("pointerdown", onClick)
    return this;
  }
}
