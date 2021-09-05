import { layer, render, intensityMap, init, random} from '../engine.js'
import { compose, rCompose, constant, printMap} from '../utils.js'

const colors = ['green', 'blue', 'yellow', 'white']

const config = {
  pixelSize: 10,
  width: 200,
  height: 200,
}

const centerProximityFn = (x, y) => {
  const xP = Math.abs((1000/5)/2 - x)
  const yP = Math.abs((1000/5)/2 - y)
  return  Math.sqrt(xP*xP + yP*yP)
}

const centerProximity = intensityMap(config)(centerProximityFn)

const cornerProximityFn = (x, y) => {
  const xP = Math.abs((1000/5)/2 - x)
  const yP = Math.abs((1000/5)/2 - y)
  return  200 - Math.sqrt(xP*xP + yP*yP)
}

const cornerProximity = intensityMap(config)(cornerProximityFn)

export const flare = () => compose([
  init(config),
  layer(1, colors, cornerProximity),
  layer(1, colors, cornerProximity),
  layer(1, colors, cornerProximity),
  layer(1, colors, cornerProximity),
  layer(1, colors, cornerProximity),
  layer(2, colors, cornerProximity),
  layer(2, colors, cornerProximity),

  layer(2, colors, centerProximity),
  layer(2, colors, centerProximity),
  layer(3, colors, centerProximity),
  layer(5, colors, centerProximity),
  render(config)
])()
