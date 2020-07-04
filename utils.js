/**
 * @type {(status: DrinkStatus) => string}
 */
const statusSymbol = (status) => {
  switch (status) {
    case 'pending':
      return '🔔'
    case 'making':
      return '⚙️'
    case 'done':
      return '✅'
    default:
      return ''
  }
}

module.exports = { statusSymbol }
