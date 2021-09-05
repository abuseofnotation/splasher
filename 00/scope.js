import { layer, render, intensityMap, init, random} from '../engine.js'
import { compose, rCompose, printMap} from '../utils.js'


const colors = ['green', 'blue', 'yellow']

const config = {
  pixelSize: 10,
  width: 200,
  height: 200,
}


const createSymmetry = (map) => map.map((row, i) => {
  if (i < map.length/2) {
    return row 
  } else {
    // uncomment to have repeating pattern without inversion
    // return map[i - map.length/2]
    return map[map.length - i]
  }
})

const centerProximityFn = (x, y) => {
  const xP = Math.abs((1000/5)/2 - x)
  const yP = Math.abs((1000/5)/2 - y)
  return  Math.sqrt(xP*xP + yP*yP)
}
const centerProximity = intensityMap(config)(centerProximityFn)

const horizontalSymmetry = (config) => {
  const map = intensityMap(config)(() => random(2000) ? 2 : undefined)
  return createSymmetry(map)
}
const verticalSymmetry = (intensity, config) => {
  const map = intensityMap(config)(() => random(intensity) ? 1 : undefined)
  return map.map(createSymmetry)
}

const constant = (intensity) => intensityMap(config)(() => intensity)

// console.log(printMap(horizontalSymmetry(config)))




export const scope = (...args) => {
  return compose([
    init(config),
    layer(60, colors, verticalSymmetry(100000, config)),
    layer(60, colors, constant(50000)),
    layer(10, colors, verticalSymmetry(3000, config)),
    layer(20, colors, verticalSymmetry(6000, config)),
    layer(2, colors, verticalSymmetry(100, config)),
    //layer(4, colors, verticalSymmetry(100, config)),
    layer(1, colors, constant(10)),


    //layer(2, colors, constant(20)),
    render(config)
  ])(...args)
}
