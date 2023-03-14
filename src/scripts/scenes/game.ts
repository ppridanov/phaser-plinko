export default class Game extends Phaser.Scene {
  gameWidth
  gameHeigth
  ROWS
  MIN_COLS
  BALL_SIZE
  SPACING
  X_START
  Y_START
  ufo
  width
  heigth
  pins
  constructor() {
    super({ key: 'Game' })
    this.gameWidth = 868
    this.gameHeigth = 680
    this.ROWS = 14
    this.MIN_COLS = 3
    this.BALL_SIZE = 42
    this.SPACING = {x: 13, y: 4.5}
    this.pins = []
  }

  create() {
    // sizes
    this.width = this.sys.canvas.width
    this.heigth = this.sys.canvas.height

    // physics
    this.matter.world.setBounds(
      this.width / 2 - this.gameWidth / 2,
      380,
      this.gameWidth,
      this.gameHeigth,
      1,
      true,
      true,
      false,
      true
    )
    this.ufo = this.add.image(0, 0, 'spacesheep').setOrigin(0)
    this.ufo.setX(this.width / 2 - this.ufo.width / 2).setY(239)
    console.log(this.BALL_SIZE)
    this.pins = this.add.container()
    for (let row = 0; row < this.ROWS; row++) {
      const colsCount = row + this.MIN_COLS
      for (let col = 0; col < colsCount; col++) {
        const x =
          this.width / 2 -
          ((this.BALL_SIZE + this.SPACING.x) / 2) * (colsCount - 1) +
          (this.BALL_SIZE + this.SPACING.x) * col

        const y = (this.BALL_SIZE + this.SPACING.y) * row + 390

        const pin = this.matter.add.image(x, y, 'pin')
        pin.setCircle(3)
        pin.setStatic(true)
        pin.setBounce(.5)
        console.log(pin.width)
        this.pins.add(pin)
      }
    }

    // const greenBall = this.matter.add.image(560, -500, 'ball-green').setOrigin(0).setCircle(18)
    // this.matter.world.add(greenBall)

    for (let i = 0; i < 10; i++) {
        const greenBall = this.matter.add.image(Phaser.Math.Between(500, 560), Phaser.Math.Between(-200, 0), 'ball-green').setOrigin(0).setCircle(18)
        this.matter.world.add(greenBall)
    }


    //     this.spacesheep = this.add.image(0, 0, 'spacesheep').setOrigin(0)
    //     this.spacesheep.setX(this.width / 2 - this.spacesheep.width / 2).setY(300)
        this.tweens.add({
          targets: this.ufo,
          y: Phaser.Math.Between(260, 300),
          ease: Phaser.Math.Easing.Cubic.InOut,
          duration: 3000,
          yoyo: true,
          repeat: -1
        })
        this.tweens.add({
          targets: this.ufo,
          x: Phaser.Math.Between(400, 550),
          ease: Phaser.Math.Easing.Cubic.InOut,
          duration: 3000,
          yoyo: true,
          repeat: -1
        })
  }

  createScene(rows) {}
}
