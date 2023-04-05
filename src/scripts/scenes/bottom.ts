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
  autoButton
  bets
  defaultBet
  bottomBg
  constructor() {
    super({ key: 'Bottom' })
    this.bets = [100, 200, 500]
    this.defaultBet = this.bets[0]
  }

  create() {
    this.width = this.sys.canvas.width
    this.height = this.sys.canvas.height
    this.textStyle = {
      font: `48px ${this.registry.get('font')}`,
      color: 'white'
    }

    // bg
    this.bottomBg = this.add.image(0, 0, 'bottom-bg').setOrigin(0)
    this.bottomBg.setY(this.height - this.bottomBg.height)

    // balance
    this.balanceContainer = this.add.container()

    this.balanceBg = new RoundRectangle(this, 0, 0, this.width - 88, 65, 52, 0x000000, 0.35).setOrigin(0)
    this.balanceBg.setX(this.width / 2 - this.balanceBg.width / 2)

    this.balanceText = this.add.text(0, 0, this.i18n.t('balance') + ': ', this.textStyle)
    this.balanceText.setX(this.balanceBg.x + 58).setY(this.balanceBg.height / 2 - this.balanceText.height / 2)

    this.balance = this.add.text(
      0,
      0,
      '350',
      Object.assign(this.textStyle, { font: `50px ${this.registry.get('fontBoldM')}` })
    )
    this.balance
      .setX(this.balanceText.x + this.balanceText.width + 6)
      .setY(this.balanceBg.height / 2 - this.balance.height / 2)

    this.balanceContainer.add([this.balanceBg, this.balanceText, this.balance])
    this.balanceContainer.setY(this.bottomBg.y + 46)

    this.createCurrentBets()
    this.createBetButtons()
  }
  increase() {}

  createBetButtons() {
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
  }

  createCurrentBets() {
    this.balanceContainer.add([this.balanceBg, this.balanceText, this.balance])
    this.balanceContainer.setY(this.bottomBg.y + 46)

    //bets
    const betContainer = this.add.container()
    const betsBg = this.add.image(0, 0, 'currents-bets-bg').setOrigin(0)

    this.minus = this.add.image(0, 0, 'minus-button').setFrame(0).setOrigin(0)
    this.minus.setX(32).setY(44)

    this.plus = this.add.image(0, 0, 'plus-button').setFrame(2).setOrigin(0)
    this.plus
      .setX(betsBg.width - this.plus.width - 25)
      .setY(44)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', this.onChangeBetDown)
      .on('pointerup', this.onChangeBetUp)

    this.currentBet = this.add.text(
      0,
      0,
      this.defaultBet + ' ₸',
      Object.assign(this.textStyle, { font: `62px ${this.registry.get('font')}` })
    )
    this.currentBet.setX(betsBg.width / 2 - this.currentBet.width / 2).setY(55)

    betContainer.add([betsBg, this.plus, this.minus, this.currentBet])
    betContainer.setY(this.bottomBg.y + 215).setX(this.bottomBg.x + 41)
  }

  onChangeBetDown = (event) => {
    console.log(event)
  }

  onChangeBetUp = (event, gameObject) => {
    console.log(gameObject)
  }
}
