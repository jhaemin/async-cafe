const readline = require('readline')

const EventManager = require('./event-manager')
const Order = require('./order')

const { getMenuItemWithId } = require('./menu')

class Cashier {
  /**
   * @param {{ eventManager: EventManager }}
   */
  constructor({ eventManager }) {
    this.eventManager = eventManager
  }

  getOrder() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(
      `\n주문할 음료를 입력하세요. ex) 아메리카노 2개 -> 1:2\n`,
      (input) => {
        const splitted = input.split(':')

        const drinkId = parseInt(splitted[0])

        if (getMenuItemWithId(drinkId) === undefined) {
          console.log(`없는 메뉴입니다.`)
          rl.close()
          this.getOrder()

          return
        }

        const amount = parseInt(splitted[1])

        if (!amount) {
          console.log(`최소 한 잔 이상 주문해야합니다.`)
          rl.close()
          this.getOrder()

          return
        }

        this.eventManager.emitOrder(new Order(drinkId, amount))

        rl.close()

        // Get order again after the previous order
        this.getOrder()
      }
    )
  }
}

module.exports = Cashier
