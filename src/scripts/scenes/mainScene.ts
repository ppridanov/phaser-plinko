import Phaser from 'phaser'
import Button from '../objects/button'

export default class MainScene extends Phaser.Scene {
  isLoaded
  controller
  bg
  logo
  exitButton
  soundButton
  rulesButton
  historyButton
  i18n: any

  constructor() {
    super({ key: 'MainScene' })
    this.controller = null
    this.isLoaded = false
  }

  create() {
    const width = this.sys.canvas.width;
    // Add bg image
    this.bg = this.add.image(0, 0, 'bg').setOrigin(0)
    this.logo = this.add.image(0, 8, 'logo').setOrigin(0)
    this.logo.setX(width / 2 - this.logo.width / 2 + 4);

    // Add buttons
    this.exitButton = this.add.image(0, 60, 'exit-button').setOrigin(0);
    this.exitButton.setX(width - this.exitButton.width - 45);

    this.rulesButton = this.add.image(45, 60, 'rules-button').setOrigin(0);

    this.soundButton = this.add.image(45, 180, 'sound-button').setOrigin(0);

    this.historyButton = this.add.image(0, 180, 'history-button').setOrigin(0);
    this.historyButton.setX(width - this.historyButton.width - 45);
    // //Add callbacks from controller
    // // @ts-ignore
    // this.scene.get('Bets').setCallback(this.controller.addBet)

    // this.scene
    //   .get('Control')
    //       // @ts-ignore
    //   .setCallbacks({
    //     bet: this.controller.addBet,
    //     auto: this.controller.autoBet
    //   })

    // // @ts-ignore
    this.launchScenes()
  }

  launchScenes = () => {
    // @ts-ignore
    const waitEvents = this.plugins.get('rexWaitEvents').add(() => {
      this.isLoaded = true
    }, this)
    this.scene.launch('Bottom')
    this.scene.launch('Control')
    this.scene.launch('Game')
    this.scene.launch("Autoplay")

    // this.scene.launch('BottomBar');
    // this.scene.launch('PreviousBets');
    // this.scene.launch('GameStatusScene');
    // this.scene.launch('RulesScene');
    // this.scene.launch('Register');

    this.time.delayedCall(5, waitEvents.waitCallback())
  }
}
