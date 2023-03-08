import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js'

export default class Bet extends Phaser.GameObjects.Container {
  label: string
  color: string
  colors: string[]
  constructor(scene, options) {
    super(scene)
    this.label = options.label
    this.color = options.label
    this.colors = ['green', 'yellow', 'red']
    scene.add.existing(this)
  }
  create() {
    const bg = new RoundRectangle(this.scene, 0, 0, 100, 50, 20, this.colors[this.color])
    const text = this.scene.add.text(0, 0, this.label, { font: `${this.scene.registry.get('fontBold')}` })
    text.setX(bg.width / 2 - text.width / 2)
    text.setY(bg.height / 2 - text.height / 2)
    this.add([bg, text]);
  }
}
