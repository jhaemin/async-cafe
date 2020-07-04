const Drink = require('./drink')
const EventManager = require('./event-manager')
const Order = require('./order')

class Queue {
  /**
   * @param {{ eventManager: EventManager }}
   */
  constructor({ eventManager }) {
    /** @type {Order[]} */
    this._orders = []

    // Handle event
    eventManager.onOrder((props) => this.add(props))
  }

  getAllOrders() {
    return this._orders
  }

  /**
   * @param {number} orderId
   */
  findOrderById(orderId) {
    return this._orders.find((order) => order.orderId === orderId)
  }

  /**
   * @param {Order} order
   */
  add(order) {
    this._orders.push(order)
  }

  /**
   * Removes the first order from the queue and returns it.
   */
  pullOut() {
    return this._orders.shift()
  }
}

module.exports = Queue
