const Barista = require('./barista')
const Drink = require('./drink')
const EventEmitter = require('events')
const Order = require('./order')

/**
 * A module that handles events using Node.js EventEmitter
 */
class EventManager {
  constructor() {
    // Create an EventEmitter instance
    this.eventEmitter = new EventEmitter()
  }

  /**
   * @param {(order: Order) => void} callback
   */
  onOrder(callback) {
    this.eventEmitter.on('order', callback)
  }

  /**
   * @param {Order} order
   */
  order(order) {
    this.eventEmitter.emit('order', order)
  }

  /**
   * @param {(drink: Drink) => void} callback
   */
  onManufacture(callback) {
    this.eventEmitter.on('manufacture', callback)
  }

  /**
   * @param {Drink} drink
   */
  manufacture(drink) {
    this.eventEmitter.emit('manufacture', drink)
  }

  /**
   * @param {(drink: Drink) => void} callback
   */
  onDone(callback) {
    this.eventEmitter.on('done', callback)
  }

  /**
   * @param {Drink} drink
   */
  done(drink) {
    this.eventEmitter.emit('done', drink)
  }
}

module.exports = EventManager
