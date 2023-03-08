export default class Header extends Phaser.Scene {
  width
  height
  balanceText
  balance
  i18n: any
  constructor() {
    super({ key: 'Header' })
  }

  create() {
    this.width = this.sys.canvas.width
    // logo
    const logo = this.add.text(0, 60, 'PLINKO', { font: `42px ${this.registry.get('fontBold')}` })
    logo.setX(this.width / 2 - logo.width / 2)

    // history
    const container = this.add.container();
    

    // // balance
    // const balance = this.add.container(20, 60)
    // this.balanceText = this.add.text(0, 0, this.i18n.t('balance'), {font: `36px ${this.registry.get('fontBold')}`})
    // this.balance = this.add.text(this.balanceText.width + 10, 0, '100000', {font: `36px ${this.registry.get('fontBold')}`})
    // balance.add([this.balanceText, this.balance]);
  }
}
