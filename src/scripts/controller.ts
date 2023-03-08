import Phaser from 'phaser'
import Model from './model'
import { between, formatAmount, formatTime } from './helpers'
import View from './view'

export default class Controller {
  sceneManager
  model
  ws: WebSocket | null
  isLoaded: boolean
  scenesLoaded: boolean
  version: string
  isFirstLoad: boolean
  isRepeat
  isCancel
  isDouble
  isRotating
  isBroadcast
  bet
  timer
  passed
  nmb
  isFR
  i18n
  isDemo
  setLNG
  setBet
  currentButton
  view
  constructor(scene, i18n) {
    this.sceneManager = scene.scene
    this.model = new Model()
    this.view = new View(this.sceneManager)
    this.isLoaded = false
    this.ws = null
    this.scenesLoaded = false
    this.isFirstLoad = true
    this.isBroadcast = false
    this.bet = []
    this.init()
    this.timer = null
    this.passed = null
    this.isFR = false
    this.setLNG = false
    this.i18n = i18n
    this.setBet = false
  }

  init() {
    let SESSION_ID =
      new URL(String(document.location)).searchParams.get('session') || '42B2EFAD97B0F0663FB08486ECDCA870'
    this.ws = new WebSocket(`wss://${url}/${SESSION_ID}`) //threemen
    this.ws.onmessage = this.onMessage
    this.ws.onclose = () => {
      // Reconnect if socket close
      this.sceneManager.start('Modal', { type: 'connectingLost' })
      this.init()
    }
    const callback = () => {
      this.sceneManager.stop('Modal')
      this.sceneManager.scene.scale.updateScale()
      // window.onfocus = function () {
      //   window.location.reload()
      // }
    }
    this.waitSocket(this.ws, callback)
  }

  waitSocket(socket, callback) {
    setTimeout(() => {
      if (socket.readyState === 1) {
        if (callback != null) {
          callback()
        }
      } else {
        this.waitSocket(socket, callback)
      }
    }, 5)
  }

  getIsLoading() {
    return this.ws?.readyState === 1 && this.scenesLoaded
  }

  getBalance() {
    return this.model.getBalance()
  }

  addBet(type) {
    if (this.isDemo) {
      //@ts-ignore
      return this.sceneManager.start('Modal', { type: 'register' })
    }

    this.ws?.send(type);
  }

  autoBet(types) {
    if (this.isDemo) {
      //@ts-ignore
      return this.sceneManager.start('Modal', { type: 'register' })
    }
    
  }

  repeatBets = () => {
    if (this.isDemo) {
      return
    }
    if (!this.isRotating) {
      this.isRepeat = true
      //@ts-ignore
      this.sceneManager.scene.sound.play('chipSet')

      this.ws?.send('repeat')
    }
  }

  doubleBet = () => {
    if (!this.isRotating && !this.isBroadcast) {
      this.ws?.send('double')
      this.isDouble = true
      const selected = this.model.doubleBet()
      if (selected) {
        //@ts-ignore
        this.sceneManager.scene.sound.play('chipSet')
        // @ts-ignore
        this.sceneManager.get('Bets').renderBets(selected)
        // @ts-ignore
        this.sceneManager.get('HeaderBar').setBalance(this.getBalance() / 100)
        // @ts-ignore
        this.sceneManager.get('MainScene').setAmount(formatAmount(this.model.getAllAmount() / 100))
      }
    }
  }

  clearBets = () => {
    if (this.isDemo) {
      return
    }
    if (!this.isRotating && !this.isBroadcast) {
      this.ws?.send('clear')
      this.model.clearBets()
      //@ts-ignore
      this.sceneManager.scene.sound.play('undo')
      // @ts-ignore
      this.sceneManager.get('Bets').clearBets()
      // @ts-ignore
      this.sceneManager.get('HeaderBar').setBalance(this.getBalance() / 100)
      // @ts-ignore
      this.sceneManager.get('MainScene').setAmount(0)
      this.setRightButton(this.model.selected)
    }
  }

  cancelBet = () => {
    if (this.isDemo) {
      return
    }
    if (!this.isRotating && !this.isBroadcast) {
      this.ws?.send('cancel')
      this.isCancel = true
      //@ts-ignore
      this.sceneManager.scene.sound.play('undo')
    }
  }

  setTimer = timer => {
    if (!this.isRotating && !this.isBroadcast) {
      if (timer <= 1) {
        this.setBet = false
        this.isRotating = true
        // @ts-ignore
        this.sceneManager.get('GameStatusScene').updateText(this.i18n.t('nmb'))
      }
      if (!this.setBet && timer >= 1) {
        this.setBet = true
        // @ts-ignore
        this.sceneManager.get('GameStatusScene').updateText(this.i18n.t('setBet'))
      }
    }
  }

  getAmountAndBalance = () => {
    return { balance: this.model.getBalance(), amount: this.model.getAmount() }
  }

  changeBet = id => {
    this.model.setCurrentBet(+id)
    //@ts-ignore
    this.sceneManager.get('Bets').setCurrentBet(this.model.state.currentBet)
    this.ws?.send('bet_' + id)
  }

  renderBets = bets => {
    if (bets && bets.length > 0) {
      // @ts-ignore
      this.sceneManager.get('Bets').renderBets(bets)
    }
  }

  getCurrentBet = () => {
    return this.model.getCurrentBet()
  }

  getBetLadder = () => {
    return this.bet
  }

  onMessage = async event => {
    // Get event data
    const data = await JSON.parse(event.data)
    if (!this.setLNG) {
      this.setLNG = true
      this.i18n.changeLanguage(data.lng, () => {
        //@ts-ignore
        this.sceneManager.launch('MainScene')
      })
    }
    // if (data.state === 'error') {
    //   if (data.msg.includes('errorCode:0')) {
    //     return this.ws?.close()
    //   }
    //   this.model.setBets(data.bets)
    //   this.model.setBalance(data.balance)
    //   this.model.setAmount(data.bet / 100)
    //   //@ts-ignore
    //   this.sceneManager.get('MainScene').setAmount(formatAmount(data.bet / 100))
    //   // @ts-ignore
    //   this.sceneManager.get('HeaderBar').setBalance(this.getBalance() / 100)
    //   //@ts-ignore
    //   this.sceneManager.get('Bets').renderBets(data.bets)
    //   //@ts-ignore
    //   this.sceneManager.start('Modal', { type: 'msg', msg: data.msg })
    //   return
    // }
    // // If broadcast state;
    // if (data.state === 'broadcast') {
    //   this.stop(data.win_number)
    //   this.isFirstLoad = false
    //   this.isBroadcast = true
    //   return
    // }

    // this.model.setDraw(data.drawNo)
    // this.model.setBalance(data.balance)
    // this.model.setAmount(data.bet)
    // this.model.setWins(data.win)
    // if (!this.isFR) {
    //   this.bet = data.betLadder.split(',').sort((a, b) => a - b)
    //   //@ts-ignore
    //   this.sceneManager.get('Bets').setBetLadder(this.bet)
    // }
    // // @ts-ignore
    // const mainScene = this.sceneManager.get('MainScene')

    // // If repeat state;
    // if (this.isRepeat) {
    //   this.isRepeat = false
    //   this.model.setBets(data.bets)
    //   this.setRightButton(data.bets)
    //   //@ts-ignore
    //   this.sceneManager.get('Bets').renderBets(data.bets)
    //   //@ts-ignore
    //   this.sceneManager.get('MainScene').setAmount(formatAmount(data.bet / 100))
    //   // @ts-ignore
    //   this.sceneManager.get('HeaderBar').setBalance(this.getBalance() / 100)
    // }

    // // If cancel state
    // if (this.isCancel) {
    //   this.isCancel = false
    //   this.model.setBets(data.bets)
    //   this.model.setBalance(data.balance)
    //   this.model.setAmount(data.bet / 100)
    //   this.setRightButton(data.bets)
    //   //@ts-ignore
    //   this.sceneManager.get('Bets').renderBets(data.bets)
    //   //@ts-ignore
    //   this.sceneManager.get('MainScene').setAmount(formatAmount(data.bet / 100))
    //   // @ts-ignore
    //   this.sceneManager.get('HeaderBar').setBalance(this.getBalance() / 100)
    // }

    // // If double state
    // // Off 10.02
    // // if (this.isDouble) {
    // //   this.isDouble = false
    // //   //@ts-ignore
    // //   this.sceneManager.get('Bets').renderBets(data.bets)
    // // }

    // if (!this.isBroadcast) {
    //   // mainScene.startRender(data);
    // }

    // // When scene is loaded;
    // if (mainScene.isLoaded) {
    //   mainScene.setTimer(data.timer, data.passed, data.nmb)
    //   mainScene.setPassed(data.passed)
    //   // FIRST LOAD FOR THIS DRAW
    //   if (this.isFirstLoad) {
    //     this.model.setBets(data.bets)
    //     this.isFirstLoad = false
    //     this.timer = data.timer
    //     this.passed = data.passed
    //     this.nmb = data.nmb
    //     //@ts-ignore
    //     this.sceneManager.get('Bets').renderBets(data.bets)
    //     //@ts-ignore
    //     this.sceneManager.get('MainScene').setAmount(formatAmount(data.bet / 100))
    //     // @ts-ignore
    //     this.sceneManager.get('HeaderBar').setBalance(this.getBalance() / 100)
    //     this.setRightButton(data.bets)
    //     // @ts-ignore
    //     this.sceneManager.get('RulesScene').setUrl(data.rulesUrl)
    //     // @ts-ignore
    //     // this.sceneManager.get("Control").setUrl(data.backUrl);

    //     // FIRST RENDER;
    //     if (!this.isFR) {
    //       // set first render
    //       this.isFR = true
    //       // set demo
    //       this.isDemo = data.demo

    //       //set current bet
    //       this.model.setCurrentBet(data.currentBet)

    //       //@ts-ignore
    //       this.sceneManager.get('Bets').setCurrentBet(data.currentBet)
    //       // set text to status
    //       // @ts-ignore
    //       this.sceneManager.get('GameStatusScene').updateText(this.i18n.t('setBet'))

    //       // set prev wins
    //       // @ts-ignore
    //       this.sceneManager.get('PreviousBets').createBets(this.model.state.win)

    //       // set draw
    //       // @ts-ignore
    //       this.sceneManager.get('Draw').setData(data.drawNo)

    //       // set registerUrl
    //       // @ts-ignore
    //       this.sceneManager.get('Modal').setUrl(data.registerUrl)

    //       // set name
    //       // @ts-ignore
    //       this.sceneManager.get('MenuScene').changeName(data.nick)

    //       // set urls
    //       // @ts-ignore
    //       this.sceneManager.get('MenuScene').setUrl(data.backUrl)
    //       //@ts-ignore
    //       this.sceneManager.get('Bets').setBetLadder(this.bet)
    //       //@ts-ignore
    //       this.sceneManager.get('BottomBar').setBets(this.bet)
    //       //@ts-ignore
    //       this.sceneManager.get('BottomBar').setCurrentBet(String(data.currentBet))
    //       //@ts-ignore
    //       this.sceneManager.get('WheelScene').setWheelPosition(this.model.state.win[0])
    //       // set timer
    //       mainScene.startTimer()
    //       this.i18n.changeLanguage(data.lng)
    //     }
    //   }
    //   if (!this.isBroadcast) {
    //     //@ts-ignore
    //     this.sceneManager.get('HeaderBar').setBalance(this.model.state.balance / 100)
    //   }
    // } else {
    //   setTimeout(() => {
    //     this.onMessage(event)
    //   }, 500)
    // }
  }

  stop(winNumber) {
    // set broadcast for timer in main scene
    //@ts-ignore
    this.sceneManager.get('MainScene').setBroadcast(true)
    // set status
    // @ts-ignore
    this.sceneManager.get('GameStatusScene').updateText(this.i18n.t('nmb'))
    this.isRotating = true
    const callback = () => {
      this.getWinBets(winNumber)
      this.isRotating = false
      this.isFirstLoad = true
      // @ts-ignore
      this.sceneManager.get('PreviousBets').createBets(this.model.state.win)
      // @ts-ignore
      this.sceneManager.get('Bets').showWinBg(winNumber, () => this.callbackBroadcastEnd(winNumber))
    }
    //@ts-ignore
    this.sceneManager.get('WheelScene').stop(winNumber, () => callback(winNumber))
  }

  callbackBroadcastEnd = winNumber => {
    // @ts-ignore
    this.sceneManager.get('GameStatusScene').updateText(this.i18n.t('setBet'))
    //@ts-ignore
    this.sceneManager.get('WheelScene').resetWinSectorPos()
    //@ts-ignore
    this.sceneManager.get('Bets').hideWinBg(winNumber)
    this.isBroadcast = false
    this.model.selected = []
    this.clearBets()
    // @ts-ignore
    this.sceneManager.get('Draw').setData(this.model.state.drawNo)
    // @ts-ignore
    this.sceneManager.get('MainScene').startTimer()
  }

  setRightButton(selected) {
    if (selected.length === 0) {
      //@ts-ignore
      this.sceneManager.get('ControlButtonsScene').setRightButton('repeat')
    } else {
      //@ts-ignore
      this.sceneManager.get('ControlButtonsScene').setRightButton('double')
    }
  }

  getWinBets(winNum) {
    let winSum = 0
    if (this.model.selected && this.model.selected.length !== 0) {
      const winNums: number[] = []
      winNums.push(winNum)
      if (winNum == 1 || winNum == 2 || winNum == 3 || winNum == 4) {
        winNums.push(29)
      }
      if (winNum == 3 || winNum == 4 || winNum == 5 || winNum == 6) {
        winNums.push(30)
      }
      if (winNum == 5 || winNum == 6 || winNum == 7 || winNum == 8) {
        winNums.push(31)
      }
      if (winNum == 7 || winNum == 8 || winNum == 9 || winNum == 10) {
        winNums.push(32)
      }
      if (winNum == 9 || winNum == 10 || winNum == 11 || winNum == 12) {
        winNums.push(33)
      }
      if (winNum == 2 || winNum == 4) {
        winNums.push(13)
      }
      if (winNum == 4 || winNum == 6) {
        winNums.push(14)
      }
      if (winNum == 6 || winNum == 8) {
        winNums.push(15)
      }
      if (winNum == 8 || winNum == 10) {
        winNums.push(16)
      }
      if (winNum == 10 || winNum == 12) {
        winNums.push(17)
      }
      if (winNum == 1 || winNum == 3) {
        winNums.push(18)
      }
      if (winNum == 3 || winNum == 5) {
        winNums.push(19)
      }
      if (winNum == 5 || winNum == 7) {
        winNums.push(20)
      }
      if (winNum == 7 || winNum == 9) {
        winNums.push(21)
      }
      if (winNum == 9 || winNum == 11) {
        winNums.push(22)
      }
      if (winNum == 1 || winNum == 2) {
        winNums.push(28)
      }
      if (winNum == 3 || winNum == 4) {
        winNums.push(27)
      }
      if (winNum == 5 || winNum == 6) {
        winNums.push(26)
      }
      if (winNum == 7 || winNum == 8) {
        winNums.push(25)
      }
      if (winNum == 9 || winNum == 10) {
        winNums.push(24)
      }
      if (winNum == 11 || winNum == 12) {
        winNums.push(23)
      }
      if (winNum % 2 === 0) {
        winNums.push(36)
      } else {
        winNums.push(37)
      }
      if (winNum == 1 || winNum == 3 || winNum == 5 || winNum == 8 || winNum == 10 || winNum == 12) {
        winNums.push(39)
      } else {
        winNums.push(38)
      }
      if (winNum >= 1 && winNum <= 6) {
        winNums.push(34)
      } else {
        winNums.push(35)
      }
      this.model.selected.forEach(item => {
        const { button, amount } = item
        // @ts-ignore
        const bets = this.sceneManager.get('Bets').bets
        const winButton = this.getButton(button)
        if (!winNums.includes(button)) {
          winButton.hide()
        } else {
          const multiply = this.getMultiply(button)
          const betWin = (+amount / 100) * +multiply
          winSum += betWin
          winButton.win(formatAmount(Math.round(betWin)))
        }
      })
      if (winSum) {
        const string = `${this.i18n.t('winText')} ${winSum}`
        //@ts-ignore
        this.sceneManager.get('GameStatusScene').updateText(string)
        //@ts-ignore
        this.sceneManager.get('HeaderBar').setWinBalance(`+${winSum}`)
        // @ts-ignore
        this.sceneManager.get('HeaderBar').setBalance(this.getBalance() / 100)
        //@ts-ignore
        this.sceneManager.scene.sound.play('win')
      } else {
        //@ts-ignore
        this.sceneManager.get('GameStatusScene').updateText(`Удача впереди`)
      }
    }
  }

  getButton = id => {
    // @ts-ignore
    const bets = this.sceneManager.get('Bets').bets
    return bets.find(item => item.name == 'bet_' + id)
  }

  getMultiply = id => {
    const multiplys = {
      1.7: [34, 35, 36, 37, 38, 39],
      2.5: [29, 30, 31, 32, 33],
      5: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
      10.2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
    let res = ''
    for (let key in multiplys) {
      if (multiplys[key].includes(+id)) {
        res = key
      }
    }
    return res
  }
}
