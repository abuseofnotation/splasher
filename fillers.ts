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

const verify = (filler) => (layer, config, canvas) => {
  let {size, sizeParams, colors, map, params} = layer.dataset
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
    .forEach((row, _x) => row.forEach((cellIntensity, _y) => {

      const x = _x + (config.x || 0)
      const y = _y + (config.y || 0)
        splashSpot(canvas, x, y, pick(colors || config.colors), parseInt(sizeFn({x,y}, cellIntensity)))
    }))
    return canvas
  })

export const plasher = verify(({sizeFn, colors, map}, config, canvas) => {
    map
    .forEach((row, _x) => row.forEach((cellIntensity, _y) => {
      const x = _x + (config.x || 0)
      const y = _y + (config.y || 0)
      const size = sizeFn({x, y}, cellIntensity)
        if (empty(canvas, x, y, pick(colors || config.colors), parseInt(size))) {
          splashSpot(canvas, x, y, pick(colors || config.colors), parseInt(size))
        }
      }
    ))
    return canvas
  })

const toNumber = (quantity, globalQuantity) => {
  if (quantity) {
    if (/px/.test(quantity)) {
      return parseInt(quantity);
    } else if (/%/.test(quantity)){
      return globalQuantity * parseFloat(quantity) / 100 
    } else {
      throw new TypeError(`Invalid quantity ${quantity}`)

    }
  } else {
    return globalQuantity
  }
}

export const layer = (canvas, parentConfig, grid) => {
    const config = {
      ...parentConfig,
      width: toNumber(canvas.getAttribute("width") , parentConfig.width),
      height: toNumber(canvas.getAttribute("height"), parentConfig.height),
      x: toNumber((canvas.getAttribute("x") || "0px"), parentConfig.width) + (parent.x || 0),
      y: toNumber((canvas.getAttribute("y") || "0px"), parentConfig.height) + (parent.y || 0),
    }

      console.log(parent.x || 0)
      console.log(toNumber((canvas.getAttribute("x") || "0px"), parentConfig.width) + parent.x || 0)


    console.log("Found layer ", config)

    Array.prototype.slice.call(canvas.children)
      .forEach((layer) => {
        const filler = fillers[layer.localName]
        if (filler === undefined) {
          throw `Invalid filler ${layer.localName}`
        } else {
          /*
          if (config.drawLayerByLayer) {
            setTimeout(() => {
            grid = filler(layer, config, grid)
            fillCanvas(canvas, config, grid)
            }, 1)
          */
          grid = filler(layer, config, grid)
        }
    })
    return grid
  }

let fillers  = {splasher, plasher, layer}
