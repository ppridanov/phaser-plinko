export default class MenuScene extends Phaser.Scene {
  menuContainer
  buttons
  switcher
  isMute
  exitUrl
  profileUrl
  i18n: any

  constructor() {
    super({ key: 'MenuScene' })
    this.isMute = false
    this.menuContainer = null
    this.buttons = [
      { name: '', texture: 'avatar-icon', id: 'name' },
      {
        name: 'sound',
        texture: 'sound-icon',
        id: 'sound',
        action: this.changeSound
      },
      { name: 'exit', texture: 'exit-icon', action: this.onExitAction }
    ]
    this.exitUrl = null
    this.profileUrl = null
  }

  create(data) {
    this.menuContainer = this.add.container(465, 160).setAlpha(1)
    const bg = this.add.rectangle(0, 0, 580, 320, 0x2c1d22, 1).setOrigin(0)

    const rows = this.buttons.map((item, idx) =>
      this.createRow(20, 100 * idx + 1, item.name, item.action, item.texture, item.id ? item.id : null)
    )
    this.menuContainer.add(bg)
    this.menuContainer.add(rows)

    const closeBg = this.add
      .rectangle(510, 40, 80, 80, 0x000000, 0)
      .setOrigin(0.5)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.sound.play('button')
        // @ts-ignore
        this.scene.get('HeaderBar').setIsOpenedScene()
        this.scene.stop('MenuScene')
      })

    const close = this.add.image(510, 30, 'close-icon').setOrigin(0)

    this.menuContainer.add([closeBg, close])
    this.add.existing(this.menuContainer)

    if (data.sound) {
      this.setWhiteSwitcher()
      this.switcher.list[1].x = 5
    } else {
      this.setGreenSwitcher()
      this.switcher.list[1].x = 58
    }
  }

  createRow(x, y, name, action, texture, id = null) {
    const container = this.add
      .container(x, y + 42)
      .setInteractive(new Phaser.Geom.Rectangle(0, -20, 530, 75), Phaser.Geom.Rectangle.Contains)
      .on('pointerdown', () => {
        if (typeof action === 'function') {
          action()
          this.sound.play('button')
        }
      })
    container.input.cursor = 'pointer'
    const image = this.add.image(10, 0, texture).setOrigin(0)
    const text = this.add.text(0, 0, this.i18n.t(name), { font: `34px ${this.registry.get('font')}` }).setOrigin(0)
    text.setX(70).setY(image.height / 2 - text.height / 2)
    if (id === 'name') {
      container.setY(20);
      text.setStyle({font: `42px ${this.registry.get('fontBold')}`});
      text.setY(image.height / 2 - text.height / 2)
      text.setX(100)
    }
    container.add([image, text])
    if (id === 'sound') {
      this.switcher = this.add.container(420, -12)
      const switchBar = this.add.graphics().fillStyle(0x018a16, 1).fillRoundedRect(0, 0, 110, 56, 30)
      const checkbox = this.add.circle(45, 5, 24, 0xffffff, 1).setOrigin(0)
      this.switcher.add([switchBar, checkbox])
      container.add(this.switcher)
    }
    return container
  }

  changeSound = () => {
    this.isMute = !this.isMute
    this.sound.mute = this.isMute
    if (this.isMute === false) {
      this.tweens.add({
        targets: this.switcher.list[1],
        x: 58,
        onStart: () => {
          this.setGreenSwitcher()
        },
        duration: 150
      })
    } else {
      this.tweens.add({
        targets: this.switcher.list[1],
        x: 5,
        duration: 150,
        onStart: () => {
          this.setWhiteSwitcher()
        }
      })
    }
  }

  setGreenSwitcher() {
    this.switcher.list[0].clear()
    this.switcher.list[0].fillStyle(0x018a16, 1).fillRoundedRect(0, 0, 110, 58, 30)
    this.switcher.list[1].fillColor = 0xffffff
  }

  setWhiteSwitcher() {
    this.switcher.list[0].clear()
    this.switcher.list[0].fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 110, 58, 30)
    this.switcher.list[1].fillColor = 0x018a16
  }

  changeName = name => {
    this.buttons[0].name = name ? name : 'Пользователь'
  }

  setProfileAction = link => {
    this.menuContainer.list[2].on('pointerdown', () => {
      if (top) top.location.href = link
    })
  }

  onExitAction = () => {
    if (top && this.exitUrl) top.location.href = this.exitUrl
  }

  setUrl = url => {
    this.exitUrl = url
  }
}
