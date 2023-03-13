export default class Game extends Phaser.Scene {
  gameWidth
  gameHeigth
  ROWS
  BALL_SIZE
  spacesheep
  width
  heigth
  constructor() {
    super({ key: 'Game' })
    this.gameWidth = 868
    this.gameHeigth = 770
  }

  create() {
    // sizes
    this.width = this.sys.canvas.width
    this.heigth = this.sys.canvas.height

    // physics
    this.matter.world.setBounds(this.width / 2 - this.gameWidth / 2, 381, this.gameWidth, this.gameHeigth, 0, true, true, false, true);


    this.spacesheep = this.add.image(0, 0, 'spacesheep').setOrigin(0)
    this.spacesheep.setX(this.width / 2 - this.spacesheep.width / 2).setY(300)
    this.tweens.add({
      targets: this.spacesheep,
      y: Phaser.Math.Between(260, 300),
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 3000,
      yoyo: true,
      repeat: -1
    })
    this.tweens.add({
      targets: this.spacesheep,
      x: Phaser.Math.Between(400, 550),
      ease: Phaser.Math.Easing.Cubic.InOut,
      duration: 3000,
      yoyo: true,
      repeat: -1
    })
  }

  createScene(rows) {}
}
