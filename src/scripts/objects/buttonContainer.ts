import Button from './button'
import eventsCenter from '../eventEmmiter';

export default class ButtonContainer extends Phaser.GameObjects.Container {
  bet
  betContainer
  button
  amount
  particle
  id
  graphics
  multiply
  currentBet
  bg
  constructor(scene, x, y, color, id, onClick, text, sound, multiply, opacity, type) {
    super(scene, x, y)
    this.multiply = multiply;
    this.button = new Button(scene, color, opacity, onClick, sound, text, type);
    this.betContainer = this.scene.add.container();
    this.add(this.button)
    this.amount = null
    this.bet = null;
    this.bg = null;
    this.currentBet = '';
    eventsCenter.on('getCurrentBet', (data) => {
      this.currentBet = data;
    })
    if (type === 1 || type === 2) {
      this.bet = this.scene.add.image(30, 60, 'bet_10').setScale(1.1);
      this.amount = this.scene.add.text(30, 60, '0', { color: 'white', font: 'bold 36px Calibri' }).setOrigin(0.5);
      this.bg = this.scene.add.circle(30, 60, 62.5, 0x000000, .7);
    }
    if (type === 0) {
      this.bet = this.scene.add.image(-50, 70, 'bet_10').setScale(1.1);
      this.amount = this.scene.add.text(-50, 70, '0', { color: 'white', font: '700 36px Calibri' }).setOrigin(0.5);
      this.bg = this.scene.add.circle(-50, 70, 62.5, 0x000000, .7);

    }
    if (type === 3 || type === 4) {
      this.bet = this.scene.add.image(30, 60, 'bet_10').setScale(1.1);
      this.amount = this.scene.add.text(30, 60, '0', { color: 'white', font: '700 36px Calibri' }).setOrigin(0.5);
      this.bg = this.scene.add.circle(30, 60, 62.5, 0x000000, .7);

    }
    if (this.bet !== null && this.amount !== null && this.bg !== null) {
      this.bg.setAlpha(0);
      this.betContainer.add([this.bet, this.amount, this.bg]);
      this.betContainer.setAlpha(0);
      this.add(this.betContainer);
    }
    this.setScale(1.05)
    this.id = id;
    return this
  }
  clearBetAmount = () => {
    this.amount.setText(0);
    this.betContainer.setAlpha(0);
    this.setDepth(0);
  }
  setBetAmount = (amount, depth, texture) => {
    this.amount.setText(amount);
    this.bet.setTexture(texture);
    this.betContainer.setAlpha(1);
    this.setDepth(depth);
  }
  setNotWin = () => {
    this.bg.setAlpha(1);
  }
  clearWin = () => {
    this.bg.setAlpha(0);
  }
}
