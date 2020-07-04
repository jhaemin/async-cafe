const Barista = require('./barista')
const EventManager = require('./event-manager')
const Queue = require('./queue')

class Manager {
  /**
   * @param {{ queue: Queue; eventManager: EventManager; baristas: Barista[] }}
   */
  constructor({ queue, eventManager, baristas }) {
    eventManager.onDone((drink) => {
      const order = queue.findOrderById(drink.orderId)

      // If there is no order corresponding to the order ID,
      // it probably should be an error
      if (!order) {
        throw new Error(`없는 주문입니다.`)
      }

      // If there is at least one drink in order
      // which is not done yet, return
      for (const drink of order.drinks) {
        if (drink.status !== 'done') {
          return
        }
      }

      queue.pullOut()
    })

    // Check every 1 second whether there is an order
    setInterval(() => {
      const orders = queue.getAllOrders()

      if (orders.length > 0) {
        orders[0].drinks.forEach((drink) => {
          if (drink.status === 'pending') {
            eventManager.emitManufacture(drink)
          }
        })
      }
    }, 1000)
  }
}

module.exports = Manager
