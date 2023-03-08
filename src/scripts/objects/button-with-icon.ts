// import { Game } from "phaser";
// import Button from "./button";

// export default class ButtonWithIcon extends Phaser.GameObjects.Container {
//     bet
//     id
//     constructor(scene, x, y, texture, id, onClick, text, scaleX, iconSprite, sound) {
//         super(scene, x, y);
//         const button = new Button(scene, texture, onClick, sound)
//         button.setScale(scaleX, 1.05);
//         this.add(button);
//         var style = { font: "36px Calibri", color: 'black', fontWeight: 'bold' };
//         const buttonText = this.scene.add.text(0, 0, text, style).setOrigin(0);
//         buttonText.x = button.getBounds().width / 2 - buttonText.width / 2;
//         buttonText.y = button.getBounds().height / 2 + 10;
//         this.add(buttonText);
//         if (iconSprite !== 'bet') {
//             const icon = this.scene.add.sprite(0, 0, iconSprite);
//             icon.x = button.getBounds().width / 2;
//             icon.y = button.getBounds().height / 2 - 25;
//             this.add(icon)
//         } else {
//             this.bet = this.scene.add.text(0, 0, '10', {font: '700 36px Calibri', color: '#6B213B'}).setOrigin(0.5);
//             this.bet.x = button.getBounds().width / 2;
//             this.bet.y = button.getBounds().height / 2 -25;
//             this.add(this.bet)
//         }
//         this.id = id;
//         return this;
//     }
//     setCurrentBet(text) {
//         return this.bet.setText(text);
//     }
// }