/**
 *
 * @param {String} b
 * @param {String} a
 * @returns {Boolean}
 */
const betweenDate = (b, a) => {
  return b && b.valueOf() < a.valueOf()
}

export default {
  betweenDate
}
