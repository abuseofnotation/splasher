import { init, fillCanvas } from './lib'
import * as fillers from './fillers'

export const render = (canvas) => {
    const config = Object.assign({}, canvas.dataset)
    config.pixelSize = parseInt(config.pixel)
    console.log(canvas.width, canvas.height)
    config.width = parseInt(canvas.width)/config.pixelSize
    config.height = parseInt(canvas.height)/config.pixelSize

    console.log(config)
    
    let grid = init(config)()
    Array.prototype.slice.call(canvas.children).forEach((layer) => {
        grid = fillers[layer.localName](layer.dataset, config, grid)
    })
    fillCanvas(canvas, config, grid)
  }
 
