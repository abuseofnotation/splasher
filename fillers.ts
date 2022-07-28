import { rCompose, compose} from './utils.js'
import { pick, random, intensityMap } from './lib.js'

import * as maps from './maps' 
import * as sizers from './sizers' 


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

const verify = (filler) => ({size, sizeParams, colors, map, params}, config, canvas) => {
  let theColors = (colors || config.colors).split(',')
  let mapFn = maps[map]
  let sizeFn = sizers[size]
  if (mapFn === undefined) {
    throw `Undefined map - ${map}`
  } else if (sizeFn === undefined) {
    throw `Undefined sizer - ${size}`
  } else {

    const map = mapFn(config, parseFloat(params))
    console.log('Filling layer', {size, colors, map, params})
    console.log("Generated intensity map", map)
    return filler({
        colors: theColors, 
        sizeFn: sizeFn(config, parseFloat(sizeParams)), 
        map
      }, 
      config, 
      canvas)
  }

}

export const splasher = verify(({sizeFn, colors, map}, config, canvas) => {
    map
    .forEach((row, x) => row.forEach((cellIntensity, y) => {
        splashSpot(canvas, x, y, pick(colors || config.colors), parseInt(sizeFn({x,y}, cellIntensity)))
    }))
    return canvas
  })

export const plasher = verify(({sizeFn, colors, map}, config, canvas) => {
    map
    .forEach((row, x) => row.forEach((cellIntensity, y) => {
      const size = sizeFn({x, y}, cellIntensity)
        if (empty(canvas, x, y, pick(colors || config.colors), parseInt(size))) {
          splashSpot(canvas, x, y, pick(colors || config.colors), parseInt(size))
        }
      }
    ))
    return canvas
  })
