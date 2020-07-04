const Drink = require('./drink')
const EventManager = require('./event-manager')

const { getMenuItemWithId } = require('./menu')

class Barista {
  /**
   * @param {{ eventManager: EventManager }}
   */
  constructor({ eventManager }) {
    this.drinksInProgress = 0
    this.eventManager = eventManager

    eventManager.onManufacture((drink) => {
      if (this.isAvailable() && drink.status === 'pending') {
        this.manufacture(drink)
      }
    })
  }

  isAvailable() {
    return this.drinksInProgress < 2
  }

  /**
   * @param {Drink} drink
   */
  manufacture(drink) {
    this.drinksInProgress += 1

    const menuItem = getMenuItemWithId(drink.drinkId)

    drink.updateStatus('making')

    setTimeout(() => {
      drink.updateStatus('done')
      this.drinksInProgress -= 1
      this.eventManager.emitDone(drink)
    }, menuItem.timeToMake * 1000)
  }
}

module.exports = Barista
