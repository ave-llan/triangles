/**
 * Represents a 2-dimensional point.
 */
class Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  /** 
   * @returns {string} A string representation for use in 
   * path descriptions.
   */
  toString() {
    return `${this.x},${this.y}`
  }
}

module.exports = Point
