const d3Selection = require("d3-selection")
const Point = require('../geometry/Point.js')
const Triangle = require('../geometry/Triangle.js')

const WIDTH = 100,
     HEIGHT = 100

const originalTriangle = [[5, 95], [95,95], [50, 5]]

const NUM_GENERATIONS = 16

const svg = createSvg();

divideAndDraw(originalTriangle)

/**
 * Recursively draws a triangle and n generations of children.
 * @param {Triangle} triangle
 * @parm {number=} generations
 */
function divideAndDraw(triangle, generations = NUM_GENERATIONS) {
  stayAlive(generations) ? divideTriangle(triangle).forEach(
                               child => divideAndDraw(child, generations - 1))
                         : drawTriangle(triangle)
}

function drawTriangle(triangle) {
  svg.append('g')
    .attr('class', 'triangle')
  .append('path')
  .attr('d', trianglePathDescription(...triangle))
  .on("mousedown", colorTriangle)
}

function colorTriangle(event) {
  const triangle = d3Selection.select(this)
  triangle
      .classed('fill', !triangle.classed('fill'))
}

function createSvg() {
  var svg = d3Selection.select('body').append('svg')
      .attr('width', '95%')
      .attr('height', '95%')
      .attr('viewBox', [0, 0, WIDTH, HEIGHT].join(' '));
  return svg
}

/**
 * Decides if generations die. Probability of 1 in generations + 1.
 * @param {number} generations
 */
const stayAlive(generations) =>
  return Math.round(Math.random() * generations)
}

const trianglePathDescription(a, b, c) {
  return `M${a}L${b}L${c}z`
}

/** Divides a triangle in two from the middle of the longest side. */
function divideTriangle(triangle) {
  let longest = 0
  let a, b, z
  for (_ of triangle) {
    const length = lineLength(triangle.slice(0, 2))
    if (length > longest) {
      [longest, [a, b, z]] = [length, triangle]
    }
    triangle.push(triangle.shift())
  }
  const midpoint = lineMidpoint([a, b])
  return [[a, midpoint, z], [b, midpoint, z]]
}

function lineLength(line) {
  const [[ax, ay], [bx, by]] = line
  return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by))
}

function lineMidpoint(line) {
  const [[ax, ay], [bx, by]] = line
  return [(ax + bx) / 2, (ay + by) / 2]
}

module.exports = createSvg;