const d3Selection = require("d3-selection")
const Point = require('../geometry/Point.js')
const Triangle = require('../geometry/Triangle.js')

const width = 100,
     height = 100

const originalTriangle = new Triangle(
  ...[[5,5], [95,5], [50,95]]
  .map(point => new Point(...point))
  )

createSvg()
  .append('g')
    .attr('class', 'triangle')
  .append('path')
  .attr('d', originalTriangle.pathDescription())


function createSvg() {
  var svg = d3Selection.select('body').append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, width, height].join(' '));
  return svg
}


module.exports = createSvg;