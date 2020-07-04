const EventManager = require('./event-manager')
const Queue = require('./queue')

const { getMenuItemWithId } = require('./menu')
const { statusSymbol } = require('./utils')

const log = console.log

class Dashboard {
  /**
   * @param {{ queue: Queue; eventManager: EventManager }}
   */
  constructor({ queue, eventManager }) {
    this.queue = queue

    eventManager.onOrder(() => this.print())
    eventManager.onDone(() => this.print())
  }

  print() {
    process.stdout.write('\u001b[2J\u001b[0;0H')

    log('\n------ Dashboard ------\n')

    this.queue.getAllOrders().forEach((order) => {
      log(`🏷 주문 ${order.orderId}`)

      order.drinks.forEach((drink) => {
        const menuItem = getMenuItemWithId(drink.drinkId)

        log(`- ${menuItem.drinkName} ${statusSymbol(drink.status)}`)
      })

      log('')
    })

    log('-----------------------')
  }
}

module.exports = Dashboard
