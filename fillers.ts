import { rCompose, compose} from './utils.js'
import { pick, random, intensityMap } from './lib.js'

import * as maps from './maps' 


const splashSpot = (canvas, x, y, color, size = 3) => { 
  const indexInRange = (i, y) => (i > (y - size)) && (i < (y + size))
  canvas.forEach((row, i) => {
    if (indexInRange(i, x)) {
      row.forEach((_, i) => {
        if(indexInRange(i, y)) {
          row[i] = color
        }
      })
    }
  })
}

const empty = (canvas, x, y, color, size = 3) => { 
  let empty = true
  const indexInRange = (i, y) => (i > (y - size)) && (i < (y + size))
  canvas.forEach((row, i) => {
    if (indexInRange(i, x)) {
      row.forEach((_, i) => {
        if(indexInRange(i, y)) {
          if (row[i] !== undefined) {
            empty = false
          }
        }
      })
    }
  })
  return empty
}



/*
const arr = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]
splash(arr, 3, 2, 1, 2)

console.log(printArray(arr))


const verifyLayer = (layer) => {

  const splasherName = layer.localName

  if (layerFillers[splasherName]) {
  }


  let map = layer.dataset.map
  if (maps[map] === undefined) {
    throw `Undefined map - ${map}`
  }

  return layer;
} 


*/

const verify = (filler) => ({size, colors, map, params}, config, canvas) => {
  let theColors = (colors || config.colors).split(',')
  let mapFn = maps[map]
  if (mapFn === undefined) {
    throw `Undefined map - ${map}`
  } else {
    return filler({size, colors: theColors, map: mapFn(config, parseFloat(params))}, config, canvas)
  }
}

export const splasher = verify(({size, colors, map}, config, canvas) => {
    map
    .forEach((row, x) => row.forEach((cellIntensity, y) => {
      if (random(cellIntensity)) {
        splashSpot(canvas, x, y, pick(colors || config.colors), parseInt(size))
      }
    }))
    return canvas
  })

export const plasher = verify(({size, colors, map}, config, canvas) => {
    map
    .forEach((row, x) => row.forEach((cellIntensity, y) => {
      if (random(cellIntensity)) {
        if (empty(canvas, x, y, pick(colors || config.colors), parseInt(size))) {
          splashSpot(canvas, x, y, pick(colors || config.colors), parseInt(size))
        }
      }
    }))
    return canvas
  })
