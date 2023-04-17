import ToggleSwitch from 'phaser3-rex-plugins/plugins/toggleswitch.js'

export default class Autoplay extends Phaser.Scene {
  constructor() {
    super({ key: 'Autoplay' })
  }

  preload() {
    this.load.plugin(
      'rextoggleswitchplugin',
      'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextoggleswitchplugin.min.js',
      true
    )
  }

  create() {
    const ROUNDS_WIDTH = 310
    const ROUNDS_MARGIN = 25
    const SECOND_ROW_Y = 130
    const AUTOSTOP_RECT_Y = 395
    const FIRST_STRING_Y = 455
    const SECOND_STRING_Y = 510
    const SWITCHER_Y = 130
    const SWITCHER_X = 360
    const ROUNDS_BTNS_X = 50
    const ROUNDS_RECT_Y = 115
    const PICK_TITLE_Y = 250
    const COLOR_BTNS_Y = 324
    const COLOR_BTN_WIDTH = 337
    const COLOR_BTN_MARGIN = 35
    const AUTOPLAY_TITLES_X = 80

    this.CANVAS_WIDTH = this.sys.canvas.width
    this.CANVAS_HEIGHT = this.sys.canvas.height

    const buttons = [
      { label: 'Зеленый', sprite: 'autoplay-colors-btns', onClick: null, color: 0x4dc900 },
      { label: 'Желтый', sprite: 'autoplay-colors-btns', onClick: null, color: 0xffe600 },
      { label: 'Красный', sprite: 'autoplay-colors-btns', onClick: null, color: 0xff4d00 }
    ]

    const rounds = [
      [
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
        }
      ],
      [
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
    ]

    const autoplayHeaderStyles = {
      font: `45px ${this.registry.get('font')}`,
      color: 'white'
    }

    const autoplayParagraphStyles = {
      font: `42px ${this.registry.get('font')}`,
      color: 'white'
    }

    const autoplayRoundsTitleStyles = {
      font: `42px ${this.registry.get('font')}`,
      wordWrap: {
        width: 800, 
        useAdvancedWrap: true, 
        align: "left"
      }
    }

    this.autoplayAllContainer = this.add.container();

    this.headerContainer = this.add.container();

    this.autoplayBg = this.add.image(0, 0, 'autoplay-bg').setOrigin(0).setAlpha(1);
    this.autoplayBg.setY(this.sys.canvas.height - this.autoplayBg.height)

    this.close = this.add.image(0, 0, 'autoplay-close').setOrigin(0)
    this.close
      .setX(this.sys.canvas.width - this.close.width - 60)
      .setY(this.autoplayBg.y + 40)
      .setInteractive({ cursor: 'pointer' })

    this.close.on('pointerdown', () => {
      console.log("wtf")
      this.tweens.add({ 
        targets: this.autoplayAllContainer,
        x: 0, 
        y: this.sys.canvas.height, 
        alpha: 0, 
        duration: 500, 
        onComplete: () => {
          this.scene.stop(this);
        }
      })
    })

    this.title = this.add
      .text(0, 0, 'Авто-режим', { font: `63px ${this.registry.get('font')}`, color: 'white' })
      .setOrigin(0)
    this.title.setX(this.sys.canvas.width / 2 - this.title.width / 2).setY(this.autoplayBg.y + 40)

    this.headerContainer.add(this.autoplayBg);
    this.headerContainer.add(this.close);
    this.headerContainer.add(this.title);

    this.pickContainer = this.add.container()
    this.pickTitle = this.add.text(0, 0, 'Выберите цвета', autoplayHeaderStyles).setOrigin(0)
    this.pickTitle.setX(this.sys.canvas.width / 2 - this.pickTitle.width / 2).setY(this.autoplayBg.y + PICK_TITLE_Y)

    this.buttons = this.add.container()

    buttons.forEach((button, index) => {
      const x = COLOR_BTN_WIDTH * index + COLOR_BTN_MARGIN
      const btn = this.createButton(
        x,
        0,
        button.label,
        button.sprite,
        button.onClick,
        button.color,
        autoplayParagraphStyles
      )
      this.buttons.add(btn)
    })
    this.buttons.setY(this.autoplayBg.y + COLOR_BTNS_Y)

    this.pickContainer.add(this.pickTitle)
    this.pickContainer.add(this.buttons)

    this.roundsContainer = this.add.container()
    this.roundsTitle = this.add.text(0, 0, 'Количество раундов', autoplayHeaderStyles).setOrigin(0)
    this.roundsTitle
      .setX(this.sys.canvas.width / 2 - this.roundsTitle.width / 2)
      .setY(this.autoplayBg.y + this.buttons.y - 10)

    this.roundsRect = this.add.image(0, 0, 'rounds-rect').setOrigin(0)
    this.roundsRect
      .setX(this.sys.canvas.width / 2 - this.roundsRect.width / 2)
      .setY(this.autoplayBg.y + this.roundsTitle.y - ROUNDS_RECT_Y)

    this.roundsBtns = this.add.container()

    rounds.forEach((round, arrIndex) => {
      round.map((item, index) => {
        const x = ROUNDS_WIDTH * index + ROUNDS_MARGIN
        const btn = this.createRoundsButton(
          x,
          arrIndex === 1 ? SECOND_ROW_Y : 0,
          item.label,
          item.sprite,
          item.onClick,
          autoplayParagraphStyles
        )
        console.log(index)
        this.roundsBtns.add(btn)
      })
    })

    this.roundsBtns.setY(this.roundsRect.y + 45).setX(ROUNDS_BTNS_X)
    this.roundsContainer.add(this.roundsRect)
    this.roundsContainer.add(this.roundsBtns)
    this.roundsContainer.add(this.roundsTitle)

    // autostop
    this.autostopContainer = this.add.container()
    this.autostopRect = this.add.image(0, 0, 'stop-round-rect').setOrigin(0)

    this.autostopRect
      .setX(this.sys.canvas.width / 2 - this.autostopRect.width / 2)
      .setY(this.roundsRect.y + AUTOSTOP_RECT_Y)
    this.autostopContainer.add(this.autostopRect)

    this.autoplayTitles = this.add.text(0,0, "Остановиться, если денежных средсв останеться меньше чем", autoplayRoundsTitleStyles);

    this.autoplayTitles.setX(this.CANVAS_WIDTH / 2 - this.autoplayTitles.width / 2 + AUTOPLAY_TITLES_X).setY( this.roundsRect.y + FIRST_STRING_Y)

    this.autostopContainer.add(this.autoplayTitles)

    // switch
    this.switcher = this.add.rexToggleSwitch(
      this.sys.canvas.width / 2 - SWITCHER_X,
      this.autostopRect.y + SWITCHER_Y,
      150,
      130,
      0x6fdd00,
      {
        trackHeight: 0.5,
        trackWidth: 0.9,

        thumbHeight: 0.4,
        thumbWidth: 0.35,
        click: {
          mode: 1
        }
      }
    )

    this.switcher.input.cursor = "pointer";

    this.switcher.setInteractive({ cursor: 'pointer' })

    this.autostopContainer.add(this.switcher)

    this.buttonAccept = this.add.image(0, 0, 'button-accept').setOrigin(0).setFrame(1)
    this.buttonAccept
      .setX(this.sys.canvas.width / 2 - this.buttonAccept.width / 2)
      .setY(this.sys.canvas.height + 100)
      .setInteractive({ cursor: 'pointer' })
    
    this.autoplayAllContainer.add(this.headerContainer);
    this.autoplayAllContainer.add(this.autostopContainer);
    this.autoplayAllContainer.add(this.roundsContainer);
    this.autoplayAllContainer.add(this.pickContainer)
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

    const image = this.add.image(0, 0, sprite, 0).setFrame(2).setOrigin(0).setInteractive({ cursor: 'pointer' })

    image.on('pointerup', () => {
      image.setFrame(2)
    })

    image.on('pointerdown', () => {
      image.setFrame(1)
    })

    const text = this.add.text(0, 0, label, styles).setOrigin(0)
    text.setY(image.height / 2 - text.height / 2 - 10).setX(image.width / 2 - text.width / 2)

    container.add([image, text]).setX(x).setY(y)

    return container
  }

  setAutostopText(xMargin, yMargin, label, styles) {
    const container = this.add.container()
    const title = this.add.text(0, 0, label, styles)


    return container
  }
}
