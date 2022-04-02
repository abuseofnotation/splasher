import { splasher, render, intensityMap, init, random} from './engine.js'
import { compose, rCompose, printMap} from './utils.js'

const centerProximityFn = (intensity) => (x, y) => {
  const xP = Math.abs((1000/5)/2 - x)
  const yP = Math.abs((1000/5)/2 - y)
  return  intensity * (Math.sqrt(xP*xP + yP*yP))
}

export const centerProximity = (config, intensity = 1) => intensityMap(config)(centerProximityFn(intensity))

const cornerDistance = (x) => x < ((1000/5) - x) ? x : ((1000/5) - x)

const cornerProximityFn = (config, intensity = 1) => (x, y) => {
  const xP = cornerDistance(x)
  const yP = cornerDistance(y)
  return  intensity * Math.sqrt(xP*xP + yP*yP)
}

export const cornerProximity = (config, intensity = 2) => intensityMap(config)(cornerProximityFn(config, intensity))

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

