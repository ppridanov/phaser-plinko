import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  isLoaded
  controller
  rulesText
  bet
  draw
  rulesScene
  underline
  _y
  timedEvent
  timer
  passed
  isBroadcast
  onePercent
  percentLine
  nmb
  bg
  currentButton
  i18n: any

  constructor() {
    super({ key: 'MainScene' })
    this._y = 960
    this.controller = null
    this.isLoaded = false
  }

  create() {
    this.timedEvent = this.time.addEvent({
      delay: 1000,
      callback: () => this.onTimerEvent(this.timer),
      callbackScope: this.controller,
      loop: true
    })

    this.bg = this.add.image(0, 0, 'bg').setOrigin(0)

    //Add callbacks from controller
    // @ts-ignore
    this.scene.get('Bets').setCallback(this.controller.addBet)

    this.scene
      .get('Control')
          // @ts-ignore
      .setCallbacks({
        bet: this.controller.addBet,
        auto: this.controller.autoBet
      })

    // @ts-ignore
    this.launchScenes()
  }

  launchScenes = () => {
    // @ts-ignore
    const waitEvents = this.plugins.get('rexWaitEvents').add(() => {
      this.isLoaded = true
    }, this)
    this.scene.launch('Header')
    this.scene.launch('Footer')
    this.scene.launch('Control')
    // this.scene.launch('WheelScene')
    // this.scene.launch('Bets')
    // this.scene.launch('Draw')

    // this.scene.launch('BottomBar');
    // this.scene.launch('PreviousBets');
    // this.scene.launch('GameStatusScene');
    // this.scene.launch('RulesScene');
    // this.scene.launch('Register');

    this.time.delayedCall(5, waitEvents.waitCallback())
  }

  setAmount = text => {
    return this.bet.setText(this.i18n.t('bet') + ': ' + text)
  }

  setController = controller => {
    this.controller = controller
  }

  onTimerEvent = timer => {
    if (timer) {
      this.timer--
      this.passed++
      this.updateTimer()
    }
  }

  startTimer() {
    if (!this.onePercent) {
      this.onePercent = this.sys.canvas.width / (this.passed + this.timer)
    }
    if (!this.percentLine) {
      this.percentLine = this.add.rectangle(0, 0, 0, 20, 0x18c83a, 1).setOrigin(0)
    }

    this.tweens.add({
      targets: this.percentLine,
      endAngle: { from: 0, to: this.onePercent * (this.passed + 2) },
      duration: 1000,
      onComplete: () => this.setBroadcast(false)
    })
  }

  updateTimer = () => {
    if (!this.isBroadcast) {
      this.tweens.addCounter({
        from: this.onePercent * this.passed,
        to: this.sys.canvas.width,
        duration: this.timer * 1000,
        onUpdate: tween => {
          let t = tween.getValue()
          this.percentLine.width = t
        }
      })
    }
  }

  setTimer = (timer, passed, nmb) => {
    this.timer = timer
    if (passed) this.passed = passed
    if (nmb) this.nmb = nmb
  }

  setPassed = (passed: number) => {
    this.passed = passed
  }

  setBroadcast(state) {
    this.isBroadcast = state
  }
}
