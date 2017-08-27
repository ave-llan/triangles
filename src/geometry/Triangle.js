const Point = require('./Point.js')

/**
 * Represents a triangle.
 */
class Triangle {

  /**
   * @param {Point} pointA
   * @param {Point} pointB
   * @param {Point} pointC
   */
  constructor(pointA, pointB, pointC) {
    this.a = pointA
    this.b = pointB
    this.c = pointC
  }

  pathDescription() {
    return `M${this.a}L${this.b}L${this.c}z`
  }

  toString() {
    return this.pathDescription()
  }

}

module.exports = Triangle