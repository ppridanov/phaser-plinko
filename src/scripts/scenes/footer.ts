export default class Footer extends Phaser.Scene {
  width
  height
  container
  balanceContainer
  balance
  menu
  menuIcon
  menuContainer
  i18n: any
  constructor() {
    super({ key: 'Footer' })
  }

  create() {
    this.width = this.sys.canvas.width
    this.height = this.sys.canvas.height
    // balance
    this.balance = this.add.text(0, 0, '1000 KZT', { font: `36px ${this.registry.get('fontBold')}` }).setPadding(40, 15)

    // menu container
    this.menuContainer = this.add.container(this.balance.x + this.balance.width, 0).setActive(false)
    this.menuIcon = this.add.image(0, 0, 'menu').setOrigin(0)
    this.menu = this.add.circle(0, 0, 35, 0x000000, 0.5).setOrigin(0)
    this.menuIcon.setX(this.menu.width / 2 - this.menuIcon.width / 2)
    this.menuIcon.setY(this.menu.height / 2 - this.menuIcon.height / 2)

    this.menuContainer.add([this.menu, this.menuIcon])
    // container
    this.container = this.add.container(0)
    this.container.add([this.menuContainer, this.balance])
    this.container.setX(this.width - (this.menu.width + this.balance.width) - 20)
    this.container.setY(this.height - 85)
    // this.menuContainer = this.add.container(0, 0)
    // this.menuBg = this.add.circle(0, 0, 35, 0x000000, 0.5)
    // this.menu = this.add.image(0, 0, 'menu')
    // this.menuContainer.add([this.menuBg, this.menu])

    // this.balanceContainer = this.add.container()

    // this.balance = this.add
    //   .text(this.menuBg, 0, '1000 KZT', { font: `28px ${this.registry.get('fontBold')}` })
    //   .setPadding(10, 20)
    // this.balanceContainer.add(this.balance)
    // this.balanceContainer.setX(this.menuBg.width)

    // this.container.setX(this.width - this.balance.width)
    // // this.container.setY(200)
    // this.container.add([this.balanceContainer, this.menuContainer])
  }
}
