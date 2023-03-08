import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js'

export default class ControlButton extends Phaser.GameObjects.Container {
  buttonType
  bg
  text
  onClick
  constructor(scene, x, y, type, bg, text, onClick) {
    super(scene)

    const buttonText = scene.add
      .text(0, 0, text, { font: `42px ${scene.registry.get('fontBold')}` })
      .setOrigin(0)
      .setPadding(40, 40)
    const background = new RoundRectangle(scene, 0, 0, 250, buttonText.height, 60, bg, 1).setOrigin(0)
    background.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => onClick(type))
    this.add([background, buttonText])
    this.setX(x).setY(y)
    return this
  }
}
