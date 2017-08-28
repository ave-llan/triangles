const d3Selection = require("d3-selection")
const Point = require('../geometry/Point.js')
const Triangle = require('../geometry/Triangle.js')

const WIDTH = 100,
     HEIGHT = 100

const originalTriangle = new Triangle(
  ...[[5, 95], [95,95], [50, 5]]
  .map(point => new Point(...point)))

const NUM_GENERATIONS = 10

const svg = createSvg();

drawTriangleAndChildren(originalTriangle)

/**
 * Recursively draws a triangle and n generations of children.
 * @param {Triangle} triangle
 * @parm {number=} generations
 */
function drawTriangleAndChildren(triangle, generations = NUM_GENERATIONS) {
  drawTriangle(triangle)
  if (generations) {
    triangle.divideInTwo()
      .forEach(child => 
        drawTriangleAndChildren(child, generations - 1))
  }
}

function drawTriangle(triangle) {
  svg.append('g')
    .attr('class', 'triangle')
  .append('path')
  .attr('d', triangle.pathDescription())
}

function createSvg() {
  var svg = d3Selection.select('body').append('svg')
      .attr('width', '95%')
      .attr('height', '95%')
      .attr('viewBox', 
        [0, 0, WIDTH, HEIGHT].join(' '));
  return svg
}


module.exports = createSvg;