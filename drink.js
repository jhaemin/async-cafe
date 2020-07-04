class Drink {
  /**
   * @param {number} drinkId
   * @param {number} orderId
   */
  constructor(drinkId, orderId) {
    this.drinkId = drinkId
    this.orderId = orderId

    /** @type {DrinkStatus} */
    this.updateStatus('pending')
  }

  /**
   * @param {DrinkStatus} status
   */
  updateStatus(status) {
    this.status = status
  }
}

module.exports = Drink
