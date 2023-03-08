export default class Modal extends Phaser.Scene {
  bg
  text
  width: number
  height: number
  private i18n: any
  type: string | number
  container: Phaser.GameObjects.Container
  url: string
  constructor() {
    super({ key: 'Modal' })
  }
  create(data) {
    if (data.type === 'connecting' || data.type === 'connectingLost') {
      this.connecting(data.type)
    } else if (data.type === 'register') {
      this.register()
    } else if (data.type === 'msg') {
      this.setMessageAndShow(data.msg)
    }
  }

  register() {
    const register = this.add.container(0, 0)
    const registerBg = this.add
      .rectangle(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 0x000000, 0.6)
      .setOrigin(0, 0)
    registerBg.setInteractive().on('pointerdown', () => {
      return
    })
    const registerText = this.add.text(0, 0, this.i18n.t('register').toUpperCase(), {
      font: `62px ${this.registry.get('fontBold')}`,
      align: 'center'
    })
    const button = this.add.container(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2 + 75)
    const text = this.add
      .text(0, 0, this.i18n.t('btns>register'), { font: `36px ${this.registry.get('fontBold')}`, color: 'white' })
      .setPadding(40, 10)
    //@ts-ignore
    const bg = this.add.rexRoundRectangle(0, 0, 410, 0, 38, 0x000000, 0).setOrigin(0).setStrokeStyle(4, 0xffffff, 1)
    text.setX(bg.width / 2 - text.width / 2)
    text.setY(bg.height / 2 - text.height / 2)
    button.setX(this.sys.game.canvas.width / 2 - bg.width / 2)
    button.add([bg, text])
    bg.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
      if (top && this.url) {
        this.sound.play('button')
        top.location.href = this.url
      }
    })

    registerText.setX(this.sys.game.canvas.width / 2 - registerText.width / 2)
    registerText.setY(this.sys.game.canvas.height / 2 - registerText.height / 2 - 70)
    register.add([registerBg, button, registerText])
    // this.time.delayedCall(10000, () => this.scene.stop());
  }

  connecting(message) {
    const bg = this.add
      .rectangle(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 0x000000, 0.9)
      .setOrigin(0, 0)
    bg.setInteractive().on('pointerdown', () => {
      return
    })
    const text = this.add.text(0, 0, this.i18n.t(message), {
      font: `60px ${this.registry.get('font')}`
    })
    text.setX(this.sys.canvas.width / 2 - text.width / 2)
    text.setY(this.sys.canvas.height / 2 - text.height / 2)
  }

  setMessageAndShow = text => {
    this.width = this.sys.game.canvas.width
    this.height = this.sys.game.canvas.height
    let errorText = ''
    if (text.includes(';')) {
      const codeMessage = text.split(';')[0]
      const code = codeMessage[codeMessage.length - 1]
      errorText = this.i18n.t(`errors>${code}`)
    }
    const bg = this.add
      .rectangle(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 0x000000, 0.9)
      .setOrigin(0, 0)
    bg.setInteractive().on('pointerdown', () => {
      return
    })
    this.container = this.add.container(0, 0)
    this.text = this.add.text(0, 0, '', { font: '700 54px Calibri', color: 'white' })
    this.text.setX(this.width / 2 - this.text.width / 2)
    this.text.setY(this.height / 2 - this.text.height / 2)
    this.container.add([bg, this.text]).setAlpha(0)
    this.text.setText(errorText ? errorText : text)
    this.text.setX(this.width / 2 - this.text.width / 2)
    this.text.setY(this.height / 2 - this.text.height / 2)
    this.tweens.add({
      targets: this.container,
      alpha: 1,
      ease: 'Sine.easeIn',
      duration: 300
    })

    this.time.delayedCall(2000, () =>
      this.tweens.add({
        targets: this.container,
        alpha: 0,
        ease: 'Sine.easeOut',
        duration: 300,
        onComplete: () => this.scene.stop()
      })
    )
  }

  createButton(options) {
    const button = this.add.container(0, options.y)

    const bg = this.add
      //@ts-ignore
      .rexRoundRectangle(0, 0, options.w, options.h, 6, options.color, 1)
      .setOrigin(0)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        options.onClick(this.url)
        this.sound.play('bongoClick')
      })

    const buttonText = this.add.text(0, 0, options.text, {
      font: `32px ${this.registry.get('font')}`,
      color: 'black'
    })
    buttonText.setX(bg.width / 2 - buttonText.width / 2)
    buttonText.setY(bg.height / 2 - buttonText.height / 2)
    button.setX(this.sys.canvas.width / 2 - bg.width / 2)
    button.add([bg, buttonText])
  }

  setUrl = url => {
    this.url = url
  }
}
