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
    this.SPACING = { x: 13, y: 4.5 }
  }

  create() {
    // sizes
    this.pins = this.physics.add.staticGroup()
    this.width = this.sys.canvas.width
    this.heigth = this.sys.canvas.height
    this.physics.world.gravity.y = 1
    const directions = [[1, 1, 0, 1, 0]]
    this.physics.world.setBounds(0, 0, this.gameWidth, this.gameHeigth, true, true, false, true)
    for (let row = 0; row < this.ROWS; row++) {
      const colsCount = row + this.MIN_COLS
      for (let col = 0; col < colsCount; col++) {
        const x =
          this.width / 2 -
          ((this.BALL_SIZE + this.SPACING.x) / 2) * (colsCount - 1) +
          (this.BALL_SIZE + this.SPACING.x) * col

        const y = (this.BALL_SIZE + this.SPACING.y) * row + 390

        const pin = this.physics.add.staticImage(x, y, 'pin').setCircle(9)
        //@ts-ignore
        pin.id = row
        this.pins.add(pin)
      }
    }

    const initialSettings = {
      x: Phaser.Math.Between(400, 600),
      y: 200
    }

    let maxCount = 100
    let count = 0
    const interval = setInterval(() => {
      console.log('update: ' + count)
      if (count === maxCount) {
        clearInterval(interval)
      }
      const greenBall = this.physics.add.image(541, initialSettings.y, 'ball-green')
      const direction = directions[Phaser.Math.Between(0, directions.length - 1)]
      greenBall
        .setGravityY(300)
        .setBounce(0.1)
        .setFriction(0)
        .setMass(1)
        .setCircle(20)
        .setName(`ball_${count}`)
        .setScale(0.8)
      greenBall.setVelocity(0.1)
      //@ts-ignore
      let isRow = null
      count++
      let isAnimate = false
      this.physics.add.collider(
        greenBall,
        this.pins,
        (ball, pin) => {
          //@ts-ignore
          const pinId = pin.id
          ball.body.velocity.y = 0
          ball.body.velocity.x = 0
          greenBall.setFriction(999)
          const dir = direction[pinId]
          //@ts-ignore
          console.log(pinId, isRow)
          //@ts-ignore
          if (!isRow || isRow !== pinId) {
            if (!isAnimate) {
              isAnimate = true
              this.tweens.add({
                targets: greenBall,
                y: pin.body.y,
                x: dir === 1 ? pin.body.x + pin.body.width + 18 : pin.body.x - 18,
                ease: Phaser.Math.Easing.Linear,
                duration: 300,
                onComplete: () => {
                  isAnimate = false
                }
              })
            }

            //@ts-ignore
            isRow = pinId
          }
        },
        () => {},
        this
      )
      this.cameras.main.setBounds(0, 0, this.gameWidth, this.gameHeigth)
    }, 800)
  }

  createScene(rows) {}

  update(time: number, delta: number): void {
    // console.log(this.game.loop.actualFps)
  }
}
