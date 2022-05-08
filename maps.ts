import { random, intensityMap } from './lib.js'
import { compose, rCompose, printMap} from './utils.js'

const centerProximityFn = (intensity, {width, height}) => (x, y) => {
  const xP = Math.abs(width/2 - x)
  const yP = Math.abs(height/2 - y)
  return  intensity * (Math.sqrt(xP*xP + yP*yP))
}

export const centerProximity = (config, intensity = 1) => intensityMap(config)(centerProximityFn(intensity, config))

const cornerDistance = (x, l) => x < (l - x) ? x : (l - x)

const cornerProximityFn = (intensity = 1, {width, height}) => (x, y) => {
  const xP = cornerDistance(x, width)
  const yP = cornerDistance(y, height)
  return  intensity * Math.sqrt(xP*xP + yP*yP)
}

export const cornerProximity = (config, intensity = 2) => intensityMap(config)(cornerProximityFn(intensity, config))

const createSymmetry = (map) => map.map((row, i) => {
  if (i < map.length/2) {
    return row 
  } else {
    // uncomment to have repeating pattern without inversion
    // return map[i - map.length/2]
    return map[map.length - i]
  }
})

export const horizontalSymmetry = (config, intensity = 2000) => {
  const map = intensityMap(config)(() => random(intensity) ? 2 : undefined)
  return createSymmetry(map)
}
export const verticalSymmetry = (config, intensity = 2000) => {
  const map = intensityMap(config)(() => random(intensity) ? 1 : undefined)
  return map.map(createSymmetry)
}
export const symmetry = (config, intensity = 2000) => {
  const map = intensityMap(config)(() => random(intensity) ? 1 : undefined)
  return createSymmetry(map).map(createSymmetry)
}

export const constant = (config, intensity = 2000) => intensityMap(config)(() => intensity)

