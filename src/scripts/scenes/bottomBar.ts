import { formatAmount } from '../helpers'
export default class BottomBar extends Phaser.Scene {
  bets
  renderBets
  bar
  bg
  text
  normalY
  callback

  constructor() {
    super({ key: 'BottomBar' })
    this.bets = []
    this.renderBets = []
  }
  create() {
    this.bar = this.add.container(30, 1730)
    this.bg = this.add
      //@ts-ignore
      .rexRoundRectangle(0, 0, 1016, 170, 85, 0x000000, 0.5)
      .setOrigin(0)
    this.bar.add(this.bg)
  }
  onBetClick = id => {
    this.callback(id)
    this.sound.play('chipChange');
    this.setCurrentBet(id)
  }
  setCurrentBet = id => {
    this.renderBets.forEach(bet => {
      if (bet.y !== this.normalY) {
        this.tweens.add({
          targets: bet,
          y: this.normalY,
          scale: 1,
          duration: 200,
          ease: Phaser.Math.Easing.Linear
        })
      }
    })
    let bet = this.renderBets.find(item => item.name === id)
    this.tweens.add({
      targets: bet,
      y: this.normalY - 20,
      scale: 1.1,
      duration: 200,
      ease: Phaser.Math.Easing.Linear
    })
  }

  setCallback = callback => {
    this.callback = callback
  }

  setBets = bets => {
    bets.forEach((item, idx) => {
      const spriteName = idx < 7 ? 'bet_' + idx : 'bet_0'
      const bg = this.add.image(0, 0, spriteName)
      const text = this.add
        .text(0, 0, formatAmount(item), { font: `42px ${this.registry.get('fontBold')}` })
        .setOrigin(0.5)
      const rT = this.add.container(30 + bg.width / 2 + idx * 141, bg.height / 2 + 30)
      rT.setName(item)
      bg.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
        this.onBetClick(item)
      })
      rT.add([bg, text])
      this.renderBets.push(rT)
      this.bar.add(rT)
      this.normalY = this.bg.y + this.bg.height / 2
    })
  }
}
