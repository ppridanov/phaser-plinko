export default class Autoplay extends Phaser.Scene {
  constructor() {
    super({ key: 'Autoplay' })
  }

  create() {
    const buttons = [
      { label: 'Зеленый', sprite: 'autoplay-colors-btns', onClick: null, color: 0x4dc900 },
      { label: 'Желтый', sprite: 'autoplay-colors-btns', onClick: null, color: 0xffe600 },
      { label: 'Красный', sprite: 'autoplay-colors-btns', onClick: null, color: 0xff4d00 }
    ]

    const rounds = [
      {
        label: '3',
        sprite: 'round-btns',
        onClick: null
      },
      {
        label: '10',
        sprite: 'round-btns',
        onClick: null
      },
      {
        label: '25',
        sprite: 'round-btns',
        onClick: null
      },
      {
        label: '50',
        sprite: 'round-btns',
        onClick: null
      },
      {
        label: '100',
        sprite: 'round-btns',
        onClick: null
      },
      {
        label: '200',
        sprite: 'round-btns',
        onClick: null
      }
    ]

    const autoplayHeader = {
      font: `45px ${this.registry.get('font')}`,
      color: 'white'
    }

    const autoplayParagraph = { font: `42px ${this.registry.get('font')}`, color: 'white' }

    this.autoplayBg = this.add.image(0, 0, 'autoplay-bg').setOrigin(0)
    this.autoplayBg.setY(this.sys.canvas.height - this.autoplayBg.height)

    this.close = this.add.image(0, 0, 'autoplay-close').setOrigin(0)
    this.close
      .setX(this.sys.canvas.width - this.close.width - 60)
      .setY(this.autoplayBg.y + 40)
      .setInteractive({ cursor: 'pointer' })

    this.title = this.add
      .text(0, 0, 'Авто-режим', { font: `63px ${this.registry.get('font')}`, color: 'white' })
      .setOrigin(0)
    this.title.setX(this.sys.canvas.width / 2 - this.title.width / 2).setY(this.autoplayBg.y + 40)

    this.pickContainer = this.add.container()
    this.pickTitle = this.add.text(0, 0, 'Выберите цвета', autoplayHeader).setOrigin(0)
    this.pickTitle.setX(this.sys.canvas.width / 2 - this.pickTitle.width / 2).setY(this.autoplayBg.y + 250)

    this.buttons = this.add.container()

    buttons.forEach((button, index) => {
      const x = 337 * index + 35
      const btn = this.createButton(x, 0, button.label, button.sprite, button.onClick, button.color, autoplayParagraph)
      this.buttons.add(btn)
    })
    this.buttons.setY(this.autoplayBg.y + 324)

    this.pickContainer.add(this.pickTitle)
    this.pickContainer.add(this.buttons)

    this.roundsContainer = this.add.container()
    this.roundsTitle = this.add.text(0, 0, 'Количество раундов', autoplayHeader).setOrigin(0)
    this.roundsTitle
      .setX(this.sys.canvas.width / 2 - this.roundsTitle.width / 2)
      .setY(this.autoplayBg.y + this.buttons.y - 10)

    this.roundsRect = this.add.image(0, 0, 'rounds-rect').setOrigin(0)
    this.roundsRect
      .setX(this.sys.canvas.width / 2 - this.roundsRect.width / 2)
      .setY(this.autoplayBg.y + this.roundsTitle.y - 115)
    
    this.roundsBtns = this.add.container();

    rounds.forEach((round, index) => {
        const x = 310 * index + 35;
        const btn = this.createRoundsButton(x, 0, round.label, round.sprite, round.onClick, autoplayParagraph);
        this.roundsBtns.add(btn);
    });

    this.roundsContainer.add(this.roundsBtns);
    this.roundsContainer.add(this.roundsTitle);
  }

  createButton(x, y, label, sprite, onClick, color, styles) {
    const container = this.add.container()
    const image = this.add.image(0, 0, sprite, 0).setOrigin(0).setInteractive({ cursor: 'pointer' })

    image.on('pointerup', () => {
      image.setFrame(0)
    })

    image.on('pointerdown', () => {
      image.setFrame(1)
    })

    const text = this.add.text(0, 0, label, styles).setOrigin(0)
    text.setY(image.height / 2 - text.height / 2 - 10).setX(image.width - text.width - 50)
    const circle = this.add.circle(0, 0, 20, color).setOrigin(0)
    circle.setY(image.height / 2 - circle.height / 2 - 10).setX(image.x + 35)

    container.add([image, text, circle]).setX(x).setY(y)

    return container
  }

  createRoundsButton(x, y, label, sprite, onClick, styles) {
    const container = this.add.container()

    const image = this.add.image(0, 0, sprite, 0).setOrigin(0).setInteractive({ cursor: 'pointer' })

    const text = this.add.text(0, 0, label, styles).setOrigin(0)
    // if (index =)
    text.setY(image.height / 2 - text.height / 2 - 10).setX(image.width - text.width - 50)

    container.add([image, text]).setX(x).setY(y)

    return container
  }
}
