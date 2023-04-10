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
  bounds
  constructor() {
    super({ key: 'Game' })
    this.gameWidth = 868
    this.gameHeigth = 680
    this.ROWS = 14
    this.MIN_COLS = 3
    this.BALL_SIZE = 42
    this.SPACING = { x: 13, y: 4.5 }
    this.pins = []
  }

  create() {
    const CATEGORY_BALL = this.matter.world.nextCategory()
    const CATEGORY_PIN = this.matter.world.nextCategory()
    // sizes
    this.width = this.sys.canvas.width
    this.heigth = this.sys.canvas.height

    // physics
    this.matter.world.update30Hz()
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
        pin.setBounce(0)
        pin.setCollisionCategory(CATEGORY_PIN)
        console.log(pin.width)
        this.pins.add(pin)
      }
    }

    // const greenBall = this.matter.add.image(560, -500, 'ball-green').setOrigin(0).setCircle(18)
    // this.matter.world.add(greenBall)
    const initialSettings = {
      x: 500,
      y: 0,
      velocityX: 2,
      velocityY: -2,
      mass: 1,
      friction: 0.1,
      restitution: 0.8,
      radius: 18
    }

    let maxCount = 100
    let count = 0
    const interval = setInterval(() => {
      if (count === maxCount) {
        clearInterval(interval)
      }
      const greenBall = this.matter.add.image(initialSettings.x, initialSettings.y, 'ball-green')
      greenBall.setCircle(initialSettings.radius)
      greenBall.setVelocity(initialSettings.velocityX, initialSettings.velocityY)
      greenBall.setMass(initialSettings.mass)
      greenBall.setFriction(initialSettings.friction)
      console.log(greenBall.body)
      greenBall.setBounce(initialSettings.restitution)
      greenBall.setCollisionCategory(CATEGORY_BALL)
      greenBall.setCollidesWith(CATEGORY_PIN)
      greenBall.setName(`ball_${count}`)

      count++
      this.matter.world.add(greenBall)
    }, 500)

    this.matter.world.autoUpdate = false
  }

  createScene(rows) {}

  update(time: number, delta: number): void {
    console.log(this.matter.world.getDelta())
    this.matter.world.step(delta)
  }
}
