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
    this.pins = []
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
        pin.setRectangle(11, 11)
        pin.setStatic(true)
        pin.setBounce(0)
        pin.setCollisionCategory(CATEGORY_PIN)
        pin.setName(String(row + 1))
        console.log(pin.width)
        this.pins.add(pin)
      }
    }

    // const greenBall = this.matter.add.image(560, -500, 'ball-green').setOrigin(0).setCircle(18)
    // this.matter.world.add(greenBall)
    const initialSettings = {
      x: 540,
      y: 0,
      velocityX: 0,
      velocityY: 0,
      mass: 1,
      friction: 0.1,
      restitution: 0.4,
      radius: 18
    }

    const direction = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1]

    let maxCount = 1
    let count = 1
    const interval = setInterval(() => {
      if (count === maxCount) {
        clearInterval(interval)
      }
      const greenBall = this.matter.add.image(initialSettings.x, initialSettings.y, 'ball-green')
      greenBall.setCircle(initialSettings.radius)
      greenBall.setVelocity(initialSettings.velocityX, initialSettings.velocityY)
      greenBall.setMass(initialSettings.mass)
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
          greenBall.setVelocityY(200)

          if (isRow !== dir || dir < dir - 1) {
            // console.log(isRow, dir)
            // if (direction[dir] === 1) {
            //   greenBall.setVelocityX(3)
            //   greenBall.setVelocityY(2)
            // } else if (direction[dir] === 0) {
            //   greenBall.setVelocityX(-3)
            //   greenBall.setVelocityY(2)
            // }
          }
          isRow = dir
        },
        context: this
      })
    }, 500)
  }

  createScene(rows) {}

  update(time: number, delta: number): void {
    // console.log(this.game.loop.actualFps)
  }
}
