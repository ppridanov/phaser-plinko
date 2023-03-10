import RoundRectangle from 'phaser3-rex-plugins/plugins/roundrectangle.js'

export default class Control extends Phaser.Scene {
  width
  height
  i18n: any
  autoPlay
  green
  yellow
  red
  container
  buttons
  callbacks
  increment
  decrement
  currentBet
  currentBetText
  ladder
  constructor() {
    super({ key: 'Control' })
    this.buttons = {
      autoPlay: 'autoPlay',
      green: 'green',
      yellow: 'yellow',
      red: 'red'
    }
    this.callbacks = null
    this.ladder = [100, 200, 500]
  }

  preload() {}

  create() {}
    // this.width = this.sys.canvas.width
    // this.height = this.sys.canvas.height
    // this.container = this.add.container(20, 0)
    // const bg = new RoundRectangle(this, 0, 0, this.width - 40, 300, 20, 0x000000, 0.3).setOrigin(0)
    // this.container.setY(this.height - bg.height - 100)

    // const buttonWidth = bg.width / 4
    // // Autoplay
    // this.autoPlay = this.add.image(0, 0, 'autoPlay').setOrigin(0).setScale(0.5)
    // this.autoPlay.setX(buttonWidth + 20 - this.autoPlay.width).setY(30)
    // this.autoPlay.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
    //   console.log(234)
    // })

    // Types = 0 - green, 1 - yellow, 2 - red
    // Green
    // curr ent bet
  //   const currentBet = this.add.container()
  //   this.currentBetText = this.add
  //     .text(0, 0, 'Цена', { font: `36px ${this.registry.get('fontBold')}`, color: 'black' })
  //     .setOrigin(0)
  //     .setPadding(15, 20)
  //   this.currentBet = this.add
  //     .text(0, 0, '200', { font: `36px ${this.registry.get('fontBold')}`, color: 'black' })
  //     .setPadding(15, 20)
  //   this.currentBet.setX(this.currentBetText.width)
  //   const currentBetBg = this.add
  //     .rectangle(0, 0, this.currentBetText.width + this.currentBet.width, 80, 0xc9c9c9)
  //     .setOrigin(0)
  //   currentBet.add([currentBetBg, this.currentBetText, this.currentBet])
  //   currentBet.setX(this.width / 2 - currentBetBg.width / 2).setY(190)

  //   // Plus
  //   const plusButton = {
  //     tl: { x: 30, y: 30 },
  //     tr: { x: 0, y: 0 },
  //     bl: { x: 30, y: 30 },
  //     br: { x: 0, y: 0 }
  //   }

  //   const incrementContainer = this.add.container()
  //   this.increment = new RoundRectangle(this, 0, 0, 55, 80, plusButton, 0xc9c9c9, 1).setOrigin(0)
  //   const incrementText = this.add
  //     .text(0, 0, '+', { font: `48px ${this.registry.get('fontBold')}`, color: 'black' })
  //     .setOrigin(0)
  //   incrementText.setX(this.increment.width / 2 - incrementText.width / 2)
  //   incrementText.setY(this.increment.height / 2 - incrementText.height / 2)
  //   incrementContainer.add([this.increment, incrementText])
  //   incrementContainer.setX(currentBet.x - this.increment.width - 1).setY(currentBet.y)

  //   //Minus

  //   // Plus
  //   const minusButton = {
  //     tl: { x: 0, y: 0 },
  //     tr: { x: 30, y: 30 },
  //     bl: { x: 0, y: 0 },
  //     br: { x: 30, y: 30 }
  //   }

  //   const decrementContainer = this.add.container()
  //   this.decrement = new RoundRectangle(this, 0, 0, 55, 80, minusButton, 0xc9c9c9, 1).setOrigin(0)
  //   const decrementText = this.add
  //     .text(0, 0, '-', { font: `48px ${this.registry.get('fontBold')}`, color: 'black' })
  //     .setOrigin(0)
  //   decrementText.setX(this.decrement.width / 2 - decrementText.width / 2)
  //   decrementText.setY(this.decrement.height / 2 - decrementText.height / 2)
  //   decrementContainer.add([this.decrement, decrementText])
  //   decrementContainer.setX(currentBet.x + currentBetBg.width + 0.5).setY(currentBet.y)

  //   this.container.add([
  //     bg,
  //     this.autoPlay,
  //     this.green,
  //     this.yellow,
  //     this.red,
  //     currentBet,
  //     incrementContainer,
  //     decrementContainer
  //   ])
  // }

  // setCallbacks = callbacks => {
  //   this.callbacks = callbacks
  // }

  // setLadder = ladder => {
  //   this.ladder = ladder
  // }

  // setView(value) {
  //   this.currentBet.setText(value)
  // }
}
