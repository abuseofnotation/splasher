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


const hallwayFn = (intensity = 1, {width, height}) => (x, y) => {
  const hallwaySize = 3
  if (x < height/hallwaySize || x > 2 * (height/hallwaySize)) {
    return intensity;
  } else {
    return 0;
  }
}
export const hallway = (config, intensity = 4) => intensityMap(config)(hallwayFn(intensity, config))

const smallestNumber = (numbers) => numbers.reduce((a, b) => a < b ? a : b)

const diagonalsFn = (intensity = 600, {width, height}) => (x, y) => {
  // console.log({width, height, x, y})
  const leftDiagonal = 1 + (intensity * Math.abs(x/width - y/height))
  const rightDiagonal = 1 + (intensity * Math.abs((width - x)/width - y/height))
  const num = smallestNumber([leftDiagonal, rightDiagonal])
  return Math.floor(num) 
}
export const diagonals = (config, intensity = 4) => intensityMap(config)(diagonalsFn(intensity, config))


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
  const map = intensityMap(config)(() => random(intensity) ? 1 : undefined)
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



const verticalLinesFn = (intensity = 1, {width, height}) => (x, y) => {
  const xP = cornerDistance(x, width)
  const yP = cornerDistance(y, height)
  return  intensity * Math.sqrt(xP*xP + yP*yP)
}

export const verticalLines = (config, intensity = 100) => intensityMap(config)((x, y) => x % (config.width / intensity) * 5 )

export const horizontalLines = (config, intensity = 100) => intensityMap(config)((x, y) => y % (config.height / intensity) * 5)


export const grandient = (config, intensity = 100) => intensityMap(config)((x, y) => (config.height - y) * intensity)



export const fractal = (config, intensity = 5) => intensityMap(config)((x, y) => ((x ^ y) % intensity === 0) ? 0 : 1)



export const triangles = (config, intensity = 5) => intensityMap(config)((x, y) =>(((x) & (x^y)) === 0) ? 1: 0)

export const circle = (config, radiusCoefficient= 4) => intensityMap(config)((x, y) => {
  const radius = config.width/(radiusCoefficient/10)
  const xCentre = config.width/2
  const yCentre = config.height/2
  const xDistance = Math.abs(x - xCentre)
  const yDistance = Math.abs(y - yCentre)
  if (((xDistance * xDistance) + (yDistance * yDistance)) > radius * radius) {
    return 1
  } else {
    return 0
  }

})

