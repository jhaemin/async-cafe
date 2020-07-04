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

      if (!order) {
        throw new Error(`없는 주문입니다.`)
      }

      for (const drink of order.drinks) {
        if (drink.status !== 'done') {
          return
        }
      }

      queue.pullOut()
    })

    setInterval(() => {
      const orders = queue.getAllOrders()

      if (orders.length > 0) {
        orders[0].drinks.forEach((drink) => {
          if (drink.status === 'pending') {
            eventManager.manufacture(drink)
          }
        })
      }
    }, 1000)
  }
}

module.exports = Manager
