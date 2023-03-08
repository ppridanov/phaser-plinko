import Phaser from 'phaser'
import { formatAmount } from '../helpers'

export default class Bets extends Phaser.Scene {
    bg
    buttons
    bets
    winSum

    rows
    container
    callback
    currentBet
    depth
    betLadder
    constructor() {
        super({ key: 'Bets' })
        this.buttons = []
        this.rows = [
            [
                { id: 2, name: '2', sound: 'bet', multi: 10.2, opacity: 1, color: '0x000000', type: 1 },
                { id: 13, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 4, name: '4', sound: 'bet', multi: 10.2, opacity: 1, color: '0x000000', type: 1 },
                { id: 14, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 6, name: '6', sound: 'bet', multi: 10.2, opacity: 1, color: '0x000000', type: 1 },
                { id: 15, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 8, name: '8', sound: 'bet', multi: 10.2, opacity: 1, color: '0xEA001B', type: 1 },
                { id: 16, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 10, name: '10', sound: 'bet', multi: 10.2, opacity: 1, color: '0xEA001B', type: 1 },
                { id: 17, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 12, name: '12', sound: 'bet', multi: 10.2, opacity: 1, color: '0xEA001B', type: 1 }
            ],
            [
                { id: 28, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 3 },
                { id: 29, name: '', sound: 'bet', multi: 2.5, opacity: 0, color: '0x000000', type: 4 },
                { id: 27, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 3 },
                { id: 30, name: '', sound: 'bet', multi: 2.5, opacity: 0, color: '0x000000', type: 4 },
                { id: 26, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 3 },
                { id: 31, name: '', sound: 'bet', multi: 2.5, opacity: 0, color: '0x000000', type: 4 },
                { id: 25, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0xEA001B', type: 3 },
                { id: 32, name: '', sound: 'bet', multi: 2.5, opacity: 0, color: '0x000000', type: 4 },
                { id: 24, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0xEA001B', type: 3 },
                { id: 33, name: '', sound: 'bet', multi: 2.5, opacity: 0, color: '0x000000', type: 4 },
                { id: 23, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0xEA001B', type: 3 }
            ],
            [
                { id: 1, name: '1', sound: 'bet', multi: 10.2, opacity: 1, color: '0xEA001B', type: 1 },
                { id: 18, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 3, name: '3', sound: 'bet', multi: 10.2, opacity: 1, color: '0xEA001B', type: 1 },
                { id: 19, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 5, name: '5', sound: 'bet', multi: 10.2, opacity: 1, color: '0xEA001B', type: 1 },
                { id: 20, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 7, name: '7', sound: 'bet', multi: 10.2, opacity: 1, color: '0x000000', type: 1 },
                { id: 21, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 9, name: '9', sound: 'bet', multi: 10.2, opacity: 1, color: '0x000000', type: 1 },
                { id: 22, name: '', sound: 'bet', multi: 5, opacity: 0, color: '0x000000', type: 2 },
                { id: 11, name: '11', sound: 'bet', multi: 10.2, opacity: 1, color: '0x000000', type: 1 }
            ],
            [
                { id: 34, name: '1-6', sound: 'bet', multi: 1.7, opacity: 0, color: '0xffffff', type: 0 },
                { id: 36, name: 'ЧЕТ', sound: 'bet', multi: 1.7, opacity: 0, color: '0xffffff', type: 0 },
                { id: 38, name: '', sound: 'bet', multi: 1.7, opacity: 1, color: '0x000000', type: 0 },
                { id: 39, name: '', sound: 'bet', multi: 1.7, opacity: 1, color: '0xEA001B', type: 0 },
                { id: 37, name: 'НЕЧЕТ', sound: 'bet', multi: 1.7, opacity: 0, color: '0xffffff', type: 0 },
                { id: 35, name: '7-12', sound: 'bet', multi: 1.7, opacity: 0, color: '0xffffff', type: 0 }
            ]
        ]
        this.bets = []
        this.depth = 1
        this.betLadder = null
    }

    create() {
        this.bg = this.add.image(0, 0, 'buttons-bg').setOrigin(0)

        this.container = this.add.container(28, 1030)

        this.buttons = this.add.container(0, 0)
        this.container.add([this.buttons])

        this.rows[0].forEach((button, idx) => {
            this.renderRow(button, idx, 0)
        })
        this.rows[2].forEach((button, idx) => {
            this.renderRow(button, idx, 1)
        })
        this.rows[1].forEach((button, idx) => {
            this.renderRowA(button, idx, 0)
        })
        this.rows[3].forEach((button, idx) => {
            this.renderRowA(button, idx, 1)
        })
        this.container.add([this.bg])
    }

    getButtons = () => {
        return this.buttons
    }

    setWinSum(sum) {
        this.winSum.setAlpha(1)
        this.winSum.setText('+' + sum)
        this.tweens.add({
            targets: this.winSum,
            scale: 2.0,
            duration: 500,
            repeat: 5,
            yoyo: true,
            onComplete: () => {
                this.tweens.add({
                    targets: this.winSum,
                    x: 0,
                    y: 0,
                    alpha: 0,
                    duration: 1000
                })
            }
        })
    }

    createWinZone(x, y, name) {
        const rectangle = new Phaser.GameObjects.Rectangle(this, x, y, 165, 165, 0x808080, 1)
        rectangle.name = name
        rectangle.setDepth(-1)
        return rectangle
    }

    showWinBg(num, callback) {
        const buttons = [
            [2, 4, 6, 8, 10, 12],
            [1, 3, 5, 7, 9, 11]
        ]
        const x1 = 115
        const x2 = 285
        const x3 = 455
        const x4 = 625
        const x5 = 794
        const x6 = 965
        const y1 = 1114
        const y2 = 1285
        const y3 = 1452
        const winRow = buttons.findIndex(item => item.find(bet => bet === num))
        if (num % 2 === 0) {
            const rectangle = this.createWinZone(x2, y3, 'even')
            this.add.existing(rectangle)
        } else {
            const rectangle = this.createWinZone(x5, y3, 'odd')
            this.add.existing(rectangle)
        }
        if (num >= 1 && num <= 6) {
            const rectangle = this.createWinZone(x1, y3, '1-6')
            this.add.existing(rectangle)
        }
        if (num >= 7 && num <= 12) {
            const rectangle = this.createWinZone(x6, y3, '7-12')
            this.add.existing(rectangle)
        }
        const currentNumberRow = this.rows.find(item => item.find(bet => bet.id == num))
        const color = currentNumberRow.find(bet => bet.id == num).color
        if (color) {
            const rectangle = this.createWinZone(color == 0xea001b ? x4 : x3, y3, 'color')
            this.add.existing(rectangle)
        }
        if (num === 1) {
            const rectangle = this.createWinZone(x1, y2, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 2) {
            const rectangle = this.createWinZone(x1, y1, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 3) {
            const rectangle = this.createWinZone(x2, y2, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 4) {
            const rectangle = this.createWinZone(x2, y1, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 5) {
            const rectangle = this.createWinZone(x3, y2, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 6) {
            const rectangle = this.createWinZone(x3, y1, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 7) {
            const rectangle = this.createWinZone(x4, y2, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 8) {
            const rectangle = this.createWinZone(x4, y1, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 9) {
            const rectangle = this.createWinZone(x5, y2, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 10) {
            const rectangle = this.createWinZone(x5, y1, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 11) {
            const rectangle = this.createWinZone(x6, y2, 'bet_' + num)
            this.add.existing(rectangle)
        }
        if (num === 12) {
            const rectangle = this.createWinZone(x6, y1, 'bet_' + num)
            this.add.existing(rectangle)
        }
        this.time.delayedCall(5000, () => {
            callback();
        })
    }

    hideWinBg(num) {
        const removeList = this.children.list.filter(
            item =>
                item.name === 'even' ||
                item.name === 'odd' ||
                item.name === 'color' ||
                item.name === '1-6' ||
                item.name === '7-12' ||
                item.name === 'bet_' + num
        )
        removeList.map(item => item.destroy())
    }

    renderBets = bets => {
        if (bets || bets.length === 0) {
            this.clearBets()
        }
        for (let bet of bets) {
            this.renderBet(bet)
        }
    }

    clearBets = () => {
        for (let button of this.bets) {
            button.destroy()
            this.bets = this.bets.filter(item => item !== button)
        }
    }

    setCallback = callback => {
        this.callback = callback
    }

    renderBet = ({ button, bets, amount }) => {
        let allAmount = this.currentBet
        if (bets && Array.isArray(bets)) {
            amount = bets.reduce((acc, item) => acc + item.amount, 0)
            allAmount = bets[bets.length - 1].amount
        }
        let btn = this.buttons.getByName(button)
        // find created bet or not!?
        const bet = this.bets.find(btn => btn.name === 'bet_' + button)
        if (bet) {
            this.setBet(bet, amount / 100, allAmount)
            this.increaseDepth()
        } else {
            const options = { width: 170, height: 170, x: 0, y: 0 }

            if (btn.type === 'Container') {
                // If this standart bet
                options.x = this.bg.getBounds().x + btn.x + 170 / 2
                options.y = this.bg.getBounds().y + btn.y + 170 / 2
            } else if (btn.name >= 23 && btn.name <= 33) {
                // If this rebra bet
                options.x = btn.getBounds().x + btn.getBounds().width / 2
                options.y = btn.getBounds().y + btn.getBounds().height / 2
            } else {
                // If this another bet
                options.x = btn.getBounds().x + btn.getBounds().width / 2
                options.y = btn.getBounds().y + 170 / 2
            }
            const bet = this.createBet({ button, amount, allAmount,  }, options)
            this.bets.push(bet)
        }
    }

    createBet = (data, size) => {
        const bet = this.add.container(size.x, size.y)
        bet.name = `bet_${data.button}`
        // @ts-ignore
        bet.multiply = data.multiply;

        //@ts-ignore
        bet.hide = () => {
            const hideBg = this.add.circle(0, 0, 60, 0x000000, 0.4);
            bet.add(hideBg);
        }

        //@ts-ignore
        bet.win = (text) => {
            //@ts-ignore
            bet.getByName("amount").setText(text);
            this.tweens.add({
                targets: bet,
                scale: 1.1,
                duration: 300,
                yoyo: true,
                ease: Phaser.Math.Easing.Sine.InOut,
            })
        }
        const betSprite = this.getSpriteByAmount(+data.amount / 100)

        const image = this.add.image(0, 0, 'bet_' + betSprite)

        const text = this.add
            .text(0, 0, formatAmount(data.amount / 100), {
                font: `32px ${this.registry.get('font')}`,
                color: 'white'
            })
            .setOrigin(0.5)
        text.name = 'amount'
        image.name = 'sprite'
        bet.add([image, text])
        bet.setDepth(this.depth)
        this.increaseDepth()
        return bet
    }

    setBet = (bet, amount, allAmount) => {
        if (!bet) {
            return
        }
        const betSprite = this.getSpriteByAmount(amount);
        const amountText = bet.getByName('amount')
        const sprite = bet.getByName('sprite')
        amountText.setText(formatAmount(amount))
        sprite.setTexture('bet_' + betSprite)
        bet.setDepth(this.depth)
    }

    renderRow = (obj, idx, row) => {
        let ROW_HEIGHT = 170
        if (idx % 2 == 0) {
            const btn = this.add.container(0, ROW_HEIGHT * row)
            btn.name = obj.id
            const text = this.add
                .text(0, 0, obj.name, {
                    font: `52px ${this.registry.get('fontBold')}`,
                    color: 'white'
                })
                .setOrigin(0)

            const bg = this.add
                .circle(0, 0, 57, obj.color, 1)
                .setOrigin(0)
                .setInteractive({ cursor: 'pointer' })
                .on('pointerdown', () => {
                    this.callback(obj.id);
                })

            const options = { x: 0, y: 0, width: 0 }
            options.x = 85 * idx
            options.width = 170
            bg.setX(options.width / 2 - bg.width / 2).setY(options.width / 2 - bg.height / 2)
            text.setX(options.width / 2 - text.width / 2).setY(options.width / 2 - text.height / 2)

            btn.setX(options.x)
            btn.add([bg, text])
            this.buttons.add(btn)
        } else {
            const width = 170
            const bg = this.add
                .rectangle(0, ROW_HEIGHT * row, 40, 170, 0xffffff, 0)
                .setOrigin(0)
                .setInteractive({ cursor: 'pointer' })
                .on('pointerdown', () => {
                    this.callback(obj.id)
                })

            bg.name = obj.id
            bg.setX((width / 2) * idx - bg.width / 2 + 85)
            this.buttons.add(bg)
        }
    }
    renderRowA(object, idx, type) {
        if (type === 0) {
            const bg = this.add
                .rectangle(85 * idx + 20, 150, 130, 40, 0x1f1f1f, 0)
                .setOrigin(0)
                .setInteractive({ cursor: 'pointer' })
                .on('pointerdown', () => {
                    this.callback(object.id)
                })
            bg.name = object.id
            if (idx % 2 == 0) {
                bg.setX(85 * idx + 20).setY(150)
                bg.width = 130
                bg.height = 40
            } else {
                const width = 170
                bg.width = 35
                bg.height = 40
                bg.setX((width / 2) * idx - bg.width / 2 + 85).setY(150)
            }
            this.buttons.add(bg)
        } else if (type === 1) {
            const options = { x: 170 * idx, y: 0, width: 170 }
            const btn = this.add.container(0, 340)
            btn.name = object.id
            const text = this.add
                .text(0, 0, object.name, {
                    font: `51px ${this.registry.get('fontBold')}`,
                    color: 'white'
                })
                .setOrigin(0)
            text.setX(options.width / 2 - text.width / 2).setY(options.width / 2 - text.height / 2)
            const bg = this.add
                .circle(0, 0, 57, object.color, 1)
                .setOrigin(0)
                .setAlpha(0)
                .setInteractive({ cursor: 'pointer' })
                .on('pointerdown', () => {
                    this.callback(object.id)
                })
            bg.setX(options.width / 2 - bg.width / 2).setY(options.width / 2 - bg.height / 2)

            if (idx == 2 || idx == 3) {
                bg.setAlpha(1)
            } else {
                text.setInteractive({ cursor: 'pointer' }).on('pointerdown', () => {
                    this.callback(object.id)
                })
            }
            btn.setX(options.x)
            btn.add([bg, text])
            this.buttons.add(btn)
        }
    }

    increaseDepth = () => {
        return this.depth++
    }

    decreaseDepth = () => {
        return this.depth--
    }

    setBetLadder = (bets) => {
        this.betLadder = bets
    }

    setCurrentBet = (currentBet) => {
        this.currentBet = currentBet
    }

    getSpriteByAmount(amount) {
        if (amount < +this.betLadder[1]) {
            return 0
        }
        if (amount >= +this.betLadder[1] && amount < +this.betLadder[2]) {
            return 1
        }
        if (amount >= +this.betLadder[2] && amount < +this.betLadder[3]) {
            return 2
        }
        if (amount >= +this.betLadder[3] && amount < +this.betLadder[4]) {
            return 3
        }
        if (amount >= +this.betLadder[4] && amount < +this.betLadder[5]) {
            return 4
        }
        if (amount >= +this.betLadder[5] && amount < +this.betLadder[6]) {
            return 5
        }
        if (amount >= +this.betLadder[6]) {
            return 6
        }
        if (!amount) {
            return 0;
        }

    }
}
