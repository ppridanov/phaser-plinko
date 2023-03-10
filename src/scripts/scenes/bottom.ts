import RoundRectangle from "phaser3-rex-plugins/plugins/roundrectangle"

export default class Bottom extends Phaser.Scene {
  width: number
  height: number
  balanceText: Phaser.GameObjects.Text
  balance: Phaser.GameObjects.Text
  balanceBg: RoundRectangle
  balanceContainer: Phaser.GameObjects.Container
  textStyle
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
    const bg = this.add.image(0, 0, 'bottom-bg').setOrigin(0);
    bg.setY(this.height - bg.height)

    // balance
    this.balanceContainer = this.add.container();

    this.balanceBg = new RoundRectangle(this, 0, 0, this.width - 84, 65, 52, 0x000000, .35).setOrigin(0);
    this.balanceBg.setX(this.width / 2 - this.balanceBg.width / 2);

    this.balanceText = this.add.text(0, 0, this.i18n.t('balance') + ": ", this.textStyle);
    this.balanceText.setX(this.balanceBg.x + 65).setY(this.balanceBg.height / 2 - this.balanceText.height / 2);

    this.balance = this.add.text(0, 0, '350', Object.assign(this.textStyle, { font: `50px ${this.registry.get('font')}` }));
    this.balance.setX(this.balanceText.x + this.balanceText.width + 6).setY(this.balanceBg.height / 2 - this.balance.height / 2)

    this.balanceContainer.add([this.balanceBg, this.balanceText, this.balance]);
    this.balanceContainer.setY(bg.y + 25)

    
  }
}
