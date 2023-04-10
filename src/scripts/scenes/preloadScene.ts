import Controller from '../controller'

export default class PreloadScene extends Phaser.Scene {
  width
  height
  bg
  logo
  clickText
  controller
  container
  isLoading
  asteroids
  private i18n: any

  constructor() {
    super({ key: 'PreloadScene' })
    this.isLoading = true
  }

  preload() {
    let LNG = 'ru-RU'
    this.i18n.initialize({
      fallbackLng: LNG,
      lng: LNG,
      loadPath: 'assets/i18n/{{lng}}/{{ns}}.json',
      debug: false,
      keySeparator: '>',
      nsSeparator: '|'
    })
    this.width = this.cameras.main.width
    this.height = this.cameras.main.height

    const progressBar = this.add.graphics()
    const progressBox = this.add.graphics()
    progressBox.fillStyle(0xf7f7f7, 0.2)
    progressBox.fillRect(this.width / 2 - 300, this.height / 2, 600, 50)
    this.load.on('progress', value => {
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(this.width / 2 - 290, this.height / 2 + 10, 580 * value, 30)
    })
    this.load.on('complete', function () {
      progressBar.destroy()
      progressBox.destroy()
    })

    this.load.image('bg', 'assets/img/bg.png')
    this.load.image('preloader-bg', 'assets/img/preloader-bg.png')
    this.load.image('logo', 'assets/img/logo.png')
    this.load.image('asteroid-1', 'assets/img/asteroid-green.png')
    this.load.image('asteroid-2', 'assets/img/asteroid-yellow.png')
    this.load.image('asteroid-3', 'assets/img/asteroid-red.png')
    this.load.image('exit-button', 'assets/img/close-icon.png')
    this.load.image('rules-button', 'assets/img/rules-icon.png')
    this.load.image('sound-button', 'assets/img/sound-icon.png')
    this.load.image('bottom-bg', 'assets/img/bottom-bar.png')
    this.load.image('bets-bg', 'assets/img/bets-bg.png')
    this.load.image('bet-bg', 'assets/img/bet-bg.png')
    this.load.spritesheet('plus-button', 'assets/img/plus.png', { frameWidth: 154, frameHeight: 118 })
    this.load.spritesheet('minus-button', 'assets/img/minus.png', { frameWidth: 154, frameHeight: 118 })
    this.load.spritesheet('auto-button', 'assets/img/autoButton.png', { frameWidth: 229, frameHeight: 196 })
    this.load.spritesheet('button-green', 'assets/img/green-button.png', { frameWidth: 352, frameHeight: 137 })
    this.load.spritesheet('button-yellow', 'assets/img/yellow-button.png', { frameWidth: 352, frameHeight: 137 })
    this.load.spritesheet('button-red', 'assets/img/red-button.png', { frameWidth: 352, frameHeight: 137 })
    this.load.image('rate-green', 'assets/img/rate-green.png')
    this.load.image('rate-yellow', 'assets/img/rate-yellow.png')
    this.load.image('rate-red', 'assets/img/rate-red.png')
    this.load.image('spacesheep', 'assets/img/space.png')
    this.load.image('ball-green', 'assets/img/ball-green.png')
    this.load.image('ball-yellow', 'assets/img/ball-yellow.png')
    this.load.image('ball-red', 'assets/img/ball-red.png')
    this.load.image('pin', 'assets/img/pin.png')
    this.load.image('history-button', 'assets/img/history-icon.png')
    this.load.image('currents-bets-bg', 'assets/img/currents-bets-bg.png')
    // AUDIO
    // this.load.audio('button', 'assets/sounds/button.mp3')
    // this.load.audio('chipChange', 'assets/sounds/chips-change.mp3')
    // this.load.audio('chipSet', 'assets/sounds/chips-set.mp3')
    // this.load.audio('undo', 'assets/sounds/undo.mp3')
    // this.load.audio('win', 'assets/sounds/win.mp3')
    // this.load.audio('bg', 'assets/sounds/background.mp3')
    // @ts-ignore
    this.load.rexWebFont({
      custom: {
        families: ['Montserrat', 'Montserrat Bold', 'Inter'],
        urls: ['./assets/fonts/fonts.css']
      }
    })
  }

  create() {
    // Top scene
    this.scene.bringToTop()

    // Register fonts
    this.registry.set('font', 'Inter')
    this.registry.set('fontM', 'Montserrat')
    this.registry.set('fontBoldM', 'Montserrat Bold')

    // Create controller
    this.controller = new Controller(this, this.i18n)
    // // @ts-ignore
    // this.scene.get('MainScene').setController(this.controller)

    // create main container
    this.container = this.add.container()

    // create bg and logo
    this.bg = this.add
      .image(0, 0, 'preloader-bg')
      .setOrigin(0)
      .setInteractive()
      .on('pointerdown', () => this.onClick())
    // create asteroids
    this.asteroids = this.add.container()

    // green
    const green = this.add.image(0, 0, 'asteroid-1').setOrigin(0.5)
    green.setX(this.width - green.width / 2 + green.width / 2 - 10).setY(this.height - green.height / 2 - 40)
    this.tweens.add({
      targets: green,
      angle: +360,
      duration: 50000,
      repeat: -1
    })

    // yellow
    const yellow = this.add.image(0, 0, 'asteroid-2').setOrigin(0)
    yellow.setY(1630).setX(20)
    this.tweens.add({
      targets: yellow,
      y: {
        from: 1570,
        to: 1630
      },
      duration: 4000,
      ease: Phaser.Math.Easing.Cubic.InOut,
      repeat: -1,
      yoyo: true
    })

    // red
    const red = this.add.image(0, 0, 'asteroid-3').setOrigin(0).setX(-90).setY(115)
    this.tweens.add({
      targets: red,
      angle: {
        from: 60,
        to: -140
      },
      duration: 50000,
      repeat: -1
    })

    this.asteroids.add([red, yellow, green])

    const clickText = this.add
      .text(this.width / 2, 1330, this.i18n.t('loading').toUpperCase(), {
        font: `84px ${this.registry.get('fontBoldM')}`,
        align: 'center'
      })
      .setOrigin(0.5, 0)
    const clickTextSec = this.add
      .text(this.width / 2, 1420, '', {
        font: `84px ${this.registry.get('fontBoldM')}`,
        align: 'center'
      })
      .setOrigin(0.5, 0)

    this.container.add([this.bg, this.asteroids, clickText, clickTextSec])
    const timer = setInterval(() => {
      if (this.controller.ws.readyState === 1) {
        this.scene.stop()
        clickText.setText(this.i18n.t('preload>first').toUpperCase())
        clickTextSec.setText(this.i18n.t('preload>second').toUpperCase())
        this.tweens.add({
          targets: [clickText, clickTextSec],
          alpha: {
            from: 0,
            to: 1
          },
          yoyo: true,
          repeat: -1,
          duration: 1000
        })
        this.isLoading = false
        clearInterval(timer)
      }
    }, 50)
  }

  onClick = () => {
    if (!this.isLoading) {
      this.tweens.add({
        targets: this.container,
        alpha: 0,
        duration: 300,
        ease: Phaser.Math.Easing.Linear,
        onComplete: () => {
          this.scene.stop()
        }
      })
    } else {
      return
    }
  }
}
