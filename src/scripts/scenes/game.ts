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
  initialBallSettings
  testDirection
  constructor() {
    super({ key: 'Game' })
    this.gameWidth = 868
    this.gameHeigth = 680
    this.ROWS = 14
    this.MIN_COLS = 3
    this.BALL_SIZE = 42
    this.SPACING = { x: 13, y: 4.5 }
    this.pins = []
    ;(this.initialBallSettings = {
      x: 540,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      mass: 1,
      friction: 0.1,
      restitution: 0.4,
      radius: 18
    }),
      (this.testDirection = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1])
  }

  create() {
    const CATEGORY_BALL = this.matter.world.nextCategory()
    const CATEGORY_PIN = this.matter.world.nextCategory()
    // sizes
    this.width = this.sys.canvas.width
    this.heigth = this.sys.canvas.height

    // physics
    this.matter.world.update60Hz()
    // this.matter.world.setBounds();
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

    this.matter.world.setGravity(0, 1)

    this.ufo = this.add.image(0, 0, 'spacesheep').setOrigin(0)
    this.ufo.setX(this.width / 2 - this.ufo.width / 2).setY(239)

    // Create pins
    this.createPins(CATEGORY_PIN)

    // test create ball
    this.createBall(1, CATEGORY_BALL, CATEGORY_PIN)
  }

  createScene(rows) {}

  createPins(CATEGORY_PIN) {
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
        pin.setRectangle(11, 11)
        pin.setStatic(true)
        pin.setBounce(0)
        pin.setCollisionCategory(CATEGORY_PIN)
        pin.setName(String(row + 1))
        console.log(pin.width)
        this.pins.add(pin)
      }
    }
  }

  createBall(maxCount, CATEGORY_BALL, CATEGORY_PIN) {
    let count = 1
    const interval = setInterval(() => {
      if (count === maxCount) {
        clearInterval(interval)
      }
      const greenBall = this.matter.add.image(this.initialBallSettings.x, this.initialBallSettings.y, 'ball-green')
      greenBall.setCircle(this.initialBallSettings.radius)
      greenBall.setVelocity(this.initialBallSettings.velocityX, this.initialBallSettings.velocityY)
      greenBall.setMass(this.initialBallSettings.mass)
      greenBall.setFriction(1)
      // greenBall.setBounce(initialSettings.restitution)
      greenBall.setCollisionCategory(CATEGORY_BALL)
      greenBall.setCollidesWith(CATEGORY_PIN)
      greenBall.setName(`ball_${count}`)
      let isRow = -1
      let isWTF = null
      count++
      this.matter.world.add(greenBall)
      // @ts-ignore
      this.matterCollision.addOnCollideStart({
        objectA: greenBall,
        callback: event => {
          const dir = +event.bodyB.gameObject.name
          greenBall.setVelocity(0)
          if (isRow !== dir || dir < dir - 1) {
            console.log(isRow, dir)
            if (this.testDirection[dir] === 1) {
              greenBall.setVelocityX(1)
            } else if (this.testDirection[dir] === 0) {
              greenBall.setVelocityX(-1)
            }
          }
          isRow = dir
        },
        context: this
      })
    }, 500)
  }

  update(time: number, delta: number): void {
    // console.log(this.game.loop.actualFps)
  }
}
