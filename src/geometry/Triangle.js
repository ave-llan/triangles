const Point = require('./Point.js')
const Line = require('./Line.js')

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

  /**
   * @return {Array[Triangle]} two triangles
   */
  divideInTwo() {
    const longestSide = [
      new Line(this.a, this.b),
      new Line(this.b, this.c),
      new Line(this.c, this.a)
    ]
    .reduce((longest, cur) => 
      longest.length() > cur.length() ? longest : cur)

    const oppositePoint = [this.a, this.b, this.c]
      .find(point => 
        !(longestSide.a === point || longestSide.b === point))
    const middleLong = longestSide.midPoint()

    return [
      new Triangle(middleLong, oppositePoint, longestSide.a),
      new Triangle(middleLong, oppositePoint, longestSide.b),
    ]
  }

}

module.exports = Triangle