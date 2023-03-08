export default class View {
  scene: any
  header: any
  footer: any
  game: any
  menu: any
  constructor(scene) {
    this.scene = scene
    this.header = this.scene.get('Header')
    this.footer = this.scene.get('Footer')
    this.game = this.scene.get('Game')
    this.menu = this.scene.get('Menu')
  }
}
