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
  currentBetIndex
  constructor() {
    super({ key: 'Bottom' })
    this.bets = [100, 200, 500]
    this.currentBetIndex = 0
    this.defaultBet = this.bets[this.currentBetIndex]
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

    const button = document.createElement('button');
    const buttonContainer = this.add.container()
    const domButton = this.add.dom(0, 0, button)
    buttonContainer.add(domButton)
    // for (let key in buttons) {
    //   const button = this.add.container()

    //   const sprite = this.add
    //     .image(0, 0, buttons[key].sprite)
    //     .setFrame(1)
    //     .setOrigin(0)
    //     .setInteractive({ cursor: 'pointer' })

    //   const text = this.add.text(0, 0, buttons[key].label, { font: `60px ${this.registry.get('font')}` })
    //   text.setX(sprite.width / 2 - text.width / 2).setY(32)
    //   sprite
    //     .on('pointerdown', () => {
    //       buttons[key].onClicK()
    //       sprite.setFrame(0)
    //       text.setStyle({color: 'black', opacity: .7})
    //     })
    //     .on('pointerup', () => {
    //       sprite.setFrame(1)
    //       text.setStyle({color: 'white', opacity: 1})
    //     })

    //   button.add([sprite, text])
    //   let x = +key === 0 ? 30 : +key === 1 ? 365 : 700
    //   button.setX(x).setY(85)
    //   buttonContainer.add(button)
    // }

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
    this.minus
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.onChangeBetDown(this.minus)
      })
      .on('pointerup', () => {
        this.onChangeBetUp(this.minus)
        this.decreseBet()
      })

    this.plus = this.add.image(0, 0, 'plus-button').setFrame(2).setOrigin(0)
    this.plus
      .setX(betsBg.width - this.plus.width - 25)
      .setY(44)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.onChangeBetDown(this.plus)
      })
      .on('pointerup', () => {
        this.onChangeBetUp(this.plus)
        this.increaseBet()
      })

    this.autoButton = this.add.image(0, 0, 'auto-button').setFrame(2).setOrigin(0)
    this.autoButton
      .setX(this.width - this.autoButton.width - 65)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.onChangeBetDown(this.autoButton)
        this.scene.launch("Autoplay")
      })
      .on('pointerup', () => {
        this.onChangeBetUp(this.autoButton)
      })
      
    this.currentBet = this.add.text(
      0,
      0,
      this.defaultBet + ' ₸',
      Object.assign(this.textStyle, { font: `62px ${this.registry.get('font')}` })
    )
    this.currentBet.setX(betsBg.width / 2 - this.currentBet.width / 2).setY(55)

    betContainer.add([betsBg, this.plus, this.minus, this.currentBet, this.autoButton])
    betContainer.setY(this.bottomBg.y + 215).setX(this.bottomBg.x + 41)
  }

  createAutoPlayButton() {}

  onChangeBetDown = target => {
    target.setFrame(1)
  }

  onChangeBetUp = target => {
    target.setFrame(2)
  }

  increaseBet = () => {
    if (this.currentBetIndex < this.bets.length - 1) {
      // проверяем, не достигли ли мы конца массива
      this.currentBetIndex++
      // делаем что-то с текущим элементом массива
    }
    // блокируем кнопку увеличения, если достигли конца массива
    if (this.currentBetIndex === this.bets.length - 1) {
      this.plus.disableInteractive()
      this.plus.setFrame(0)
    }
    // разблокируем кнопку уменьшения, если она была заблокирована ранее
    if (this.currentBetIndex > 0) {
      this.minus.setInteractive()
      this.minus.setFrame(2)
    }
    this.updateCurrentBet()
  }

  decreseBet = () => {
    if (this.currentBetIndex > 0) {
      // проверяем, не достигли ли мы начала массива
      this.currentBetIndex--
      // делаем что-то с текущим элементом массива
    }
    // блокируем кнопку уменьшения, если достигли начала массива
    if (this.currentBetIndex === 0) {
      this.minus.disableInteractive()
      this.minus.setFrame(0)
    }
    // разблокируем кнопку увеличения, если она была заблокирована ранее
    if (this.currentBetIndex < this.bets.length - 1) {
      this.plus.setInteractive()
      this.plus.setFrame(2)
    }
    this.updateCurrentBet()
  }

  updateCurrentBet = () => {
    this.currentBet.setText(this.bets[this.currentBetIndex] + ' ₸')
  }
}
