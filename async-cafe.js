const Cashier = require('./cashier')
const Barista = require('./barista')
const Dashboard = require('./dashboard')
const EventManager = require('./event-manager')
const Manager = require('./manager')
const Queue = require('./queue')

const { menu } = require('./menu')

const log = console.log

class AsyncCafe {
  constructor() {
    const eventManager = new EventManager()
    const queue = new Queue({ eventManager })
    const dashboard = new Dashboard({
      queue,
      eventManager,
    })
    const cashier = new Cashier({ eventManager })
    const baristas = [new Barista({ eventManager })]
    const manager = new Manager({
      queue,
      eventManager,
      baristas,
    })

    this.eventManager = eventManager
    this.queue = queue
    this.dashboard = dashboard
    this.cashier = cashier
    this.baristas = baristas
    this.manager = manager
  }

  open() {
    // Display the menu
    this.showMenu()

    // Get order when open the cafe
    this.cashier.getOrder()
  }

  showMenu() {
    log('\n[메뉴]\n')

    for (const menuItem of menu) {
      log(`${menuItem.id}. ${menuItem.drinkName} (${menuItem.timeToMake}s)`)
    }
  }
}

module.exports = AsyncCafe
