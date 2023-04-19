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
      new URL(String(document.location)).searchParams.get('session') || '7FFCE3CC1D104012EA7D015C4B26447E'
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

    this.ws?.send(type)
  }

  autoBet(types) {
    if (this.isDemo) {
      //@ts-ignore
      return this.sceneManager.start('Modal', { type: 'register' })
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

  }
}
