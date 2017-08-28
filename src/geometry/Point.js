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
   * @return {number} The distance between provided point and this
   * point.
   */
  distanceTo(that) {
    return Math.sqrt(
      (this.x - that.x) * (this.x - that.x) +
      (this.y - that.y) * (this.y - that.y))
  }

  midPoint(that) {
    return new Point(
      (this.x + that.x) / 2,
      (this.y + that.y) / 2)
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
