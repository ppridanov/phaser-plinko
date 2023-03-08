export default class PreviousBets extends Phaser.Scene {
  container
  buttons
  test
  constructor() {
    super({ key: 'PreviousBets' })
  }
  create() {
    this.container = this.add.container(75, 200)
    this.buttons = [
      { id: 1, color: '0xE81D25' },
      { id: 2, color: '0x000000' }, //2
      { id: 3, color: '0xE81D25' },
      { id: 4, color: '0x000000' }, //2
      { id: 5, color: '0xE81D25' },
      { id: 6, color: '0x000000' }, //2
      { id: 7, color: '0x000000' }, //2
      { id: 8, color: '0xE81D25' },
      { id: 9, color: '0x000000' }, //2
      { id: 10, color: '0xE81D25' },
      { id: 11, color: '0x000000' }, //2
      { id: 12, color: '0xE81D25' }
    ]
  }
  createBets(bets) {
    this.container.removeAll({ destroyChild: true })
    const MAX_RADIUS = 45
    const MARGIN = 10
    let allSize = 20
    bets.reverse().forEach((bet, idx) => {
      const radius = idx === 0 ? MAX_RADIUS : idx === 1 ? 35 : 24
      const position = { x: MAX_RADIUS / 2 - radius / 2, y: allSize }
      const currentBet = this.buttons.find(item => item.id === +bet)
      const bg = this.add.circle(0, 0, radius, currentBet.color, 1)
      const text = this.add.text(0, 0, currentBet.id, { font: `32px ${this.registry.get('fontBold')}` }).setOrigin(0.5)
      const container = this.add.container(0, position.y)
      container.add([bg, text])
      this.container.add(container)
      allSize += idx === 0 || idx === 1 ? bg.getBounds().height + 10 : bg.getBounds().height + 18
    })
  }

  _clearBets() {
    this.container.removeAll()
  }
}
