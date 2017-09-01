const d3Selection = require("d3-selection")

const WIDTH = 100,
     HEIGHT = 100
const originalTriangle = [[5, 95], [95,95], [50, 5]]
const NUM_GENERATIONS = 16

const svg = createSvg();
drawFromTriangle(originalTriangle)

function drawFromTriangle(triangle) {
  const triangles = svg.selectAll('.triangle')
    .data(propagate(triangle, NUM_GENERATIONS), trianglePathDescription)
  
  triangles.exit()
    .remove()

  triangles.enter()
    .append('g')
      .attr('class', 'triangle')
    .append('path')
      .attr('d', trianglePathDescription)
      .on('mousedown', subdivideTriangle)
}

function propagate(triangle, generations) {
  const progeny = []
  if (stayAlive(generations)) {
    divideTriangle(triangle).forEach(
      child => progeny.push(...propagate(child, generations - 1)))
  } else {
    progeny.push(triangle)
  }
  return progeny
}

function subdivideTriangle(event) {
  const newTriangle = scaleTriangle(d3Selection.select(this).datum(), WIDTH)
  drawFromTriangle(newTriangle)
}

function createSvg() {
  return d3Selection.select('body').append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', [0, 0, WIDTH, HEIGHT].join(' '));
}

// Probability of 1 in generations + 1 that triangle stops reproducing.
function stayAlive(generations) {
  return Math.round(Math.random() * generations)
}

function trianglePathDescription(t) {
  return `M${t[0]}L${t[1]}L${t[2]}z`
}

// Divides a triangle in two from the middle of the longest side.
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

function scaleTriangle(triangle, fit) {
  const [a, b, c] = triangle
  const [X, Y] = [0, 1]
  const pairs = [[a, b], [a, c], [b, c]]
  // get max of x distance
  const maxWidth = Math.max(...pairs.map(
    pair => Math.abs(pair[0][X] - pair[1][X])))
  const maxHeight = Math.max(...pairs.map(
    pair => Math.abs(pair[0][Y] - pair[1][Y])))

  const scale = fit / Math.max(maxWidth, maxHeight)
  const xOffset = Math.min(...triangle.map(point => point[X]))
  const yOffset = Math.min(...triangle.map(point => point[Y]))
  const xCentering = (fit - maxWidth * scale) / 2
  const yCentering = (fit - maxHeight * scale) / 2

  return triangle.map(point => [(point[X] - xOffset) * scale + xCentering,
                      (point[Y] - yOffset) * scale + yCentering])
}

module.exports = createSvg;