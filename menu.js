/**
 * @typedef {{ id: number; drinkName: string; timeToMake: number }} MenuItem
 */

/**
 * @type {MenuItem[]}
 */
const menu = [
  {
    id: 1,
    drinkName: '아메리카노',
    timeToMake: 3,
  },
  {
    id: 2,
    drinkName: '카페라떼',
    timeToMake: 5,
  },
  {
    id: 3,
    drinkName: '프라프치노',
    timeToMake: 7,
  },
]

/**
 * @type {(id: number) => MenuItem} id
 */
const getMenuItemWithId = (id) => menu.find((item) => item.id === id)

module.exports = { menu, getMenuItemWithId }
