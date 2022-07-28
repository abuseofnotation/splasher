import * as lib from './lib.js'
interface Coordinates {
  x: number,
  y: number,
}
export const constant = (config, size = 2000) => ({x, y}: Coordinates, cellIntensity) => lib.random(cellIntensity) ? size : 0


export const random = (config, size = 2000) => ({x, y}: Coordinates, cellIntensity) => lib.random(cellIntensity) ? lib.getRandomInt(size) : 0

const minIntensity = 100
export const intensoReversed = (config, size = 2000) => ({x, y}: Coordinates, cellIntensity) => lib.random(cellIntensity) ? size * (cellIntensity/minIntensity): 0

export const intenso = (config, size = 2000) => ({x, y}: Coordinates, cellIntensity) => lib.random(cellIntensity) ? size - (size * (cellIntensity/minIntensity)): 0
