import { layer } from './engine.js'
import { rCompose } from './utils.js'

// helpers 

const constant = (a) => () => a

const id = (a) => a


const createCanvas = ({width, height, pixelSize}) => () => {
  const canvas = document.createElement('canvas')
  canvas.width = width * pixelSize
  canvas.height = height * pixelSize
  canvas.style.margin = pixelSize * 10 + 'px'
  return canvas
}

const film = rCompose([
  createCanvas,
  layer(1, constant(1)),
  layer(20, constant(10000)),
  layer(100, constant(10000)),
])({
  pixelSize: 10,
  width: 200,
  height: 200,
  colors: ['green', 'blue', 'white', 'yellow']
})


const centerProximity = (x, y) => {
  const xP = Math.abs((1000/5)/2 - x)
  const yP = Math.abs((1000/5)/2 - y)
  return  Math.sqrt(xP*xP + yP*yP)
}
const cornerProximity = (x, y) => {
  const xP = Math.abs((1000/5)/2 - x)
  const yP = Math.abs((1000/5)/2 - y)
  return  200 - Math.sqrt(xP*xP + yP*yP)
}

const center = rCompose([
  createCanvas,
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(8, centerProximity),
  layer(5, centerProximity),
  layer(3, centerProximity),
  layer(15, centerProximity),
])({
  pixelSize: 10,
  width: 200,
  height: 200,
  colors: ['green', 'blue', 'white', 'yellow']
})


const center = rCompose([
  createCanvas,
  layer(2, symmetry),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(2, cornerProximity),
  layer(8, centerProximity),
  layer(5, centerProximity),
  layer(3, centerProximity),
  layer(15, centerProximity),
])({
  pixelSize: 10,
  width: 200,
  height: 200,
  colors: ['green', 'blue', 'white', 'yellow']
})


Array(20).fill().map(() => {
document.body.appendChild(center())
})
  

