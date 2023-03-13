import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle'
import BottomButton from '../objects/bottom-button'

export default class Bottom extends Phaser.Scene {
  width: number
  height: number
  balanceText: Phaser.GameObjects.Text
  balance: Phaser.GameObjects.Text
  balanceBg: RoundRectangle
  balanceContainer: Phaser.GameObjects.Container
  textStyle
  plus
  minus
  betBg
  currentBet
  i18n: any

  constructor() {
    super({ key: 'Bottom' })
  }

  create() {
    this.width = this.sys.canvas.width
    this.height = this.sys.canvas.height
    this.textStyle = {
      font: `42px ${this.registry.get('font')}`,
      color: 'white'
    }

    // bg
    const bg = this.add.image(0, 0, 'bottom-bg').setOrigin(0)
    bg.setY(this.height - bg.height)

    // balance
    this.balanceContainer = this.add.container()

    this.balanceBg = new RoundRectangle(this, 0, 0, this.width - 84, 65, 52, 0x000000, 0.35).setOrigin(0)
    this.balanceBg.setX(this.width / 2 - this.balanceBg.width / 2)

    this.balanceText = this.add.text(0, 0, this.i18n.t('balance') + ': ', this.textStyle)
    this.balanceText.setX(this.balanceBg.x + 65).setY(this.balanceBg.height / 2 - this.balanceText.height / 2)

    this.balance = this.add.text(
      0,
      0,
      '350',
      Object.assign(this.textStyle, { font: `50px ${this.registry.get('font')}` })
    )
    this.balance
      .setX(this.balanceText.x + this.balanceText.width + 6)
      .setY(this.balanceBg.height / 2 - this.balance.height / 2)

    this.balanceContainer.add([this.balanceBg, this.balanceText, this.balance])
    this.balanceContainer.setY(bg.y + 25)

    //bets
    const betContainer = this.add.container()
    const betsBg = this.add.image(0, 0, 'bets-bg').setOrigin(0)

    this.minus = this.add.image(0, 0, 'minus-button').setFrame(0).setOrigin(0)
    this.minus.setX(80).setY(65)

    this.plus = this.add.image(0, 0, 'plus-button').setFrame(1).setOrigin(0)
    this.plus.setX(betsBg.width - this.plus.width - 75).setY(65)

    this.betBg = this.add.image(0, 0, 'bet-bg').setOrigin(0)
    this.betBg.setX(betsBg.width / 2 - this.betBg.width / 2).setY(60)

    this.currentBet = this.add.text(
      0,
      0,
      '100 ₸',
      Object.assign(this.textStyle, { font: `72px ${this.registry.get('font')}` })
    )
    this.currentBet.setX(betsBg.width / 2 - this.currentBet.width / 2).setY(75)

    betContainer.add([betsBg, this.plus, this.minus, this.betBg, this.currentBet])
    betContainer.setY(bg.y + 185).setX(this.width / 2 - betsBg.width / 2)

    // buttons
    const buttons = [
      { label: 'зеленый', sprite: 'button-green', onClicK: () => console.log('wtf') },
      { label: 'желтый', sprite: 'button-yellow', onClicK: () => console.log('wtf') },
      { label: 'красный', sprite: 'button-red', onClicK: () => console.log('wtf') }
    ]

    const buttonContainer = this.add.container()

    for (let key in buttons) {
      const button = this.add.container()

      const sprite = this.add
        .image(0, 0, buttons[key].sprite)
        .setOrigin(0)
        .setInteractive({ cursor: 'pointer' })
        .on('pointerdown', buttons[key].onClicK)

      const text = this.add.text(0, 0, buttons[key].label, { font: `60px ${this.registry.get('font')}` })
      text.setX(sprite.width / 2 - text.width / 2).setY(32)

      button.add([sprite, text])
      let x = +key === 0 ? 30 : +key === 1 ? 377 : 700
      button.setX(x).setY(85)
      buttonContainer.add(button)
    }

    buttonContainer.setY(1600)


    // this.add.
  }
}
