export default class Header extends Phaser.Scene {
  width
  buttons
  constructor() {
    super({ key: 'Header' })
    this.buttons = {
      answer: {
        sprite: "answer-icon",
        onClick: null
      },
      sound: {
        sprite: 'sound-icon',
        onClick: null
      },
      close: {
        sprite: 'close-icon',
        onClick: null
      }
    }
  }


  create() {
    this.width = this.sys.canvas.width

  }
}
