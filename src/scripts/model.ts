import { v4 as uuidv4 } from 'uuid'

export default class Model {
  state
  selected
  isBroadcast: boolean
  error
  prev: number | null | undefined
  currentButton

  constructor() {
    this.prev = null
    this.state = {
      currentBet: 10,
      balance: 30,
      amount: 0
    }
    // this.prev = {};
    this.selected = []
    this.isBroadcast = false
    this.error = {
      isError: false,
      message: ''
    }
  }

  updateState(newState) {
    for (let key in newState) {
      if (this.state[key] === 'undefined') {
        this.state[key] = newState[key]
      }
      if (this.state[key] !== newState[key]) {
        this.state[key] = newState[key]
      }
    }
  }

  // addBet(button) {
  //   let bet = this.selected.find(item => item.button === button)
  //   if (this.state.currentBet && this.state.balance >= this.state.currentBet) {
  //     this.setAmount(this.state.amount += this.state.currentBet);
  //     if (bet) {
  //       bet.bets.push({
  //         amount: this.state.currentBet,
  //         id: uuidv4(),
  //         prev: this.prev
  //       })
  //       this.prev = button
  //     } else {
  //       const betObject = Object.assign(
  //         {},
  //         {
  //           button,
  //           bets: [
  //             {
  //               amount: this.state.currentBet,
  //               id: uuidv4(),
  //               prev: this.prev
  //             }
  //           ]
  //         }
  //       )
  //       this.selected.push(betObject)
  //       this.prev = button
  //       bet = betObject
  //     }
  //     this.updateBalance(this.state.currentBet)
  //     return bet
  //   }
  //   return false
  // }

  addBet(button) {
    let bet = this.selected.find(item => item.button === button)
    if (this.state.currentBet && this.state.balance >= this.state.currentBet * 100) {
      this.setAmount(this.state.amount += this.state.currentBet * 100);
      if (bet) {
        bet.amount += this.state.currentBet * 100
      } else {
        const betObject = Object.assign(
            {},
            {
              button,
              amount: this.state.currentBet * 100
            }
        )
        this.selected.push(betObject)
        bet = betObject
      }
      this.updateBalance(this.state.currentBet * 100)
      return bet
    }
    return false
  }

  updateBalance(num) {
    return (this.state.balance -= num)
  }

  getCurrentBet() {
    return this.state.currentBet
  }

  setBalance(num) {
    return (this.state.balance = num)
  }

  setAmount(num) {
    return (this.state.amount = num)
  }

  setWins(array) {
    return (this.state.win = array)
  }

  setCurrentBet(num) {
    return (this.state.currentBet = num)
  }

  getBalance() {
    return this.state.balance
  }

  getAllAmount = () => {
    if (this.selected && this.selected.length > 0) {
      return this.selected.reduce((acc, item) => acc + item.amount, 0)
    }
    return 0
  }

  doubleBet() {
    if (!this.isBroadcast) {
      const amount = this.getAmountCallback();
      if (amount >= this.state.balance) {
        return false
      }
      const prevAmount = this.getAllAmount()
      this.selected = this.selected.map(item => {
        return { amount: item.amount * 2, button: item.button }
      })
      console.log(this.selected);
      this.updateBalance(prevAmount);
      this.setAmount(amount);
      return this.selected
    }
  }

  clearBets() {
    console.log('clear', this.selected)
    if (this.state.amount) {
      this.setBalance(this.state.amount + this.state.balance);
      this.setAmount(0);
      this.selected = [];
    }
  }

  getAmountCallback() {
    if (this.selected && this.selected.length > 0) {
      return this.selected.reduce((acc, select) => acc + (select.amount * 2), 0)
    }
    return false;
  }

  cancelBet() {
    let btnIndex = this.selected.findIndex(item => item.button === this.prev)
    const bets = this.selected[btnIndex]?.bets
    const lastBet = bets ? bets[bets.length - 1] : null
    if (!lastBet) return
    this.state.amount -= lastBet.amount
    this.state.balance += lastBet.amount
    if (!this.prev) {
      delete this.selected[btnIndex].bets
    } else {
      this.selected[btnIndex].bets = bets.filter(item => item.id !== lastBet.id)
      this.prev = lastBet.prev
    }

    this.deleteSelected()
    return this.selected
  }

  deleteSelected() {
    return (this.selected = this.selected.filter(item => item.bets.length > 0))
  }

  setBroadcast() {
    return (this.isBroadcast = !this.isBroadcast)
  }

  setError(message) {
    this.error.isError = true
    this.error.message = message || 'Что то пошло не так'
  }

  clearError(message) {
    this.error.isError = false
    this.error.message = ''
  }

  setBets(bets) {
    this.selected = bets
    return this.selected
  }

  setDraw(draw) {
    return (this.state.drawNo = draw)
  }

  getBets() {
    return this.selected;
  }

  getBet(id) {
    return JSON.parse(JSON.stringify(this.selected.findIndex(select => (select.button = id))))
  }
}
