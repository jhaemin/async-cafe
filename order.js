const Drink = require('./drink')

class Order {
  /**
   * @param {number} drinkId
   * @param {number} amount
   */
  constructor(drinkId, amount) {
    this.orderId = Order.autoIncrementValue++

    this.drinks = [
      ...Array(amount)
        .fill()
        .map(() => new Drink(drinkId, this.orderId)),
    ]
  }
}

Order.autoIncrementValue = 1

module.exports = Order
