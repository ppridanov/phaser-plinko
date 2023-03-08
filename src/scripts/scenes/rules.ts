export default class RulesScene extends Phaser.Scene {
  container
  bg
  modal
  buttons
  fullRules
  width
  height
  url
  i18n: any

  constructor() {
    super({ key: 'RulesScene' })
    this.url = null
    this.buttons = [
      [
        { id: 2, name: '2', color: '0x000000' },
        { id: 4, name: '4', color: '0x000000' },
        { id: 6, name: '6', color: '0x000000' },
        { id: 8, name: '8', color: '0xE81D25' },
        { id: 10, name: '10', color: '0xE81D25' },
        { id: 12, name: '12', color: '0xE81D25' }
      ],
      [
        { id: 1, name: '1', color: '0xE81D25' },
        { id: 3, name: '3', color: '0xE81D25' },
        { id: 5, name: '5', color: '0xE81D25' },
        { id: 7, name: '7', color: '0x000000' },
        { id: 9, name: '9', color: '0x000000' },
        { id: 11, name: '11', color: '0x000000' }
      ],
      [
        { id: 34, name: '1-6', color: '0xffffff', opacity: 0 },
        { id: 36, name: 'ЧЕТ', color: '0xffffff', opacity: 0 },
        { id: 38, name: '', color: '0x000000' },
        { id: 39, name: '', color: '0xE81D25' },
        { id: 37, name: 'НЕЧЕТ', color: '0xffffff', opacity: 0 },
        { id: 35, name: '7-12', color: '0xffffff', opacity: 0 }
      ]
    ]
  }
  create() {
    const style = {
      font: '700 34px Calibri',
      color: 'black'
    }
    this.width = this.sys.game.canvas.width
    this.height = this.sys.game.canvas.height
    const bg = this.add
      .rectangle(this.width / 2, this.height / 2, this.width, this.height, 0x000000, 0.75)
      .setInteractive()
      .on('pointerdown', () => {
        return
      })
    const modal = this.add.graphics().setDepth(1)
    modal.fillStyle(0x2c1d22, 1).fillRoundedRect(0, 0, this.width - 100, this.height - 1100, 8)
    modal.setX(50).setY(550)
    const text = this.add.text(70, 570, this.i18n.t('tableRules').toUpperCase(), {
      color: 'lightgrey',
      font: '700 48px Calibri'
    })
    const border = this.add.graphics({ lineStyle: { width: 4, color: 0x3d2e34 } })
    border.strokeLineShape(new Phaser.Geom.Line(70, 630, 1005, 630))
    const close = this.add.image(985, 590, 'close-icon')
    close.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => this.hideRules())
    const table = this.createTable(this.width / 2, this.height / 2)
    this.container = this.add.container(0, 0).setAlpha(0)
    const rules = this.add.text(0, 0, this.i18n.t('fullRules').toUpperCase(), {
      font: `27px ${this.registry.get('font')}`
    })
    rules.setX(this.sys.canvas.width / 2 - rules.width / 2).setY(1270)
    rules.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => this.onFullRules())
    const underline = this.add.graphics({ x: rules.x, y: rules.y + rules.height - 3 })
    underline.lineStyle(3, 0xffffff, 4)
    underline.beginPath()
    underline.moveTo(0, 0)
    underline.lineTo(rules.width, 0)
    underline.closePath()
    underline.strokePath()
    this.container.add([bg, modal, text, border, close, table, rules, underline]).setDepth(9999)
  }
  showRules() {
    this.sound.play('button')
    this.container.setAlpha(1)
  }
  hideRules() {
    this.sound.play('button')
    this.container.setAlpha(0)
  }
  createTable(x, y) {
    const container = this.add.container(20, 950)
    const table = this.add.image(520, 0, 'rules-table')
    const buttonContainer = this.add.container(207.5, -124)
    this.buttons.forEach((item, wtf) => {
      let Y = 124 * wtf - 1
      item.forEach((wtf, idx) => {
        const button = this.createButton(124 * idx + 1, Y, wtf.color, wtf.name, wtf.opacity)
        buttonContainer.add(button)
      })
    })
    container.add(buttonContainer)
    const ratioImage0 = this.add.image(210, -145, 'rules-table-ratio-0')
    const ratioImage1 = this.add.image(457, -82.5, 'rules-table-ratio-1')
    const ratioImage2 = this.add.image(767, -82.5, 'rules-table-ratio-2')
    const ratioImage3 = this.add.image(520, 190, 'rules-table-ratio-3')
    const ratio0 = this.add.text(165, -278, 'x10.2', { font: '700 42px Calibri', color: '#f8bb00' })
    const ratio1 = this.add.text(440, -280, 'x5', { font: '700 42px Calibri', color: '#f8bb00' })
    const ratio2 = this.add.text(735, -280, 'x2.5', { font: '700 42px Calibri', color: '#f8bb00' })
    const ratio3 = this.add.text(485, 240, 'x1.7', { font: '700 42px Calibri', color: '#f8bb00' })
    container.add([table, ratioImage0, ratioImage1, ratioImage2, ratioImage3, ratio0, ratio1, ratio2, ratio3])
    return container
  }
  createButton(x, y, color, id, opacity) {
    const button = this.add.container(x, y)
    const bg = this.add.graphics().fillStyle(color, opacity).fillCircle(0, 0, 40)
    const text = this.add.text(0, 0, id, { font: '700 36px Calibri', color: 'white' }).setOrigin(0.5)
    button.add([bg, text])
    return button
  }
  onFullRules() {
    if (this.url) {
      console.log('wtf')
      this.sound.play('button')
      top!.location.href = this.url
    }
    return
  }
  setUrl = url => {
    this.url = url
  }
}
