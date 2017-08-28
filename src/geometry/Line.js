const Point = require('./Point')

class Line {

  /**
   * @param {Point} pointA
   * @param {Point} pointB
   */
  constructor(pointA, pointB) {
    this.a = pointA
    this.b = pointB
  }

  length() {
    return Math.sqrt(
      (this.a.x - this.b.x) * (this.a.x - this.b.x) +
      (this.a.y - this.b.y) * (this.a.y - this.b.y))
  }

  midPoint() {
    return new Point(
      (this.a.x + this.b.x) / 2,
      (this.a.y + this.b.y) / 2)
  }
}

module.exports = Line