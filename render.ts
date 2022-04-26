import { init, fillCanvas } from './lib'
import * as fillers from './fillers'

export const render = (canvas) => {
    const config = Object.assign({}, canvas.dataset)
    config.width = canvas.width
    config.height = canvas.height
    config.pixelSize = parseInt(config.pixel)
    
    let grid = init(config)()
    Array.prototype.slice.call(canvas.children).forEach((layer) => {
        grid = fillers[layer.localName](layer.dataset, config, grid)
    })
    fillCanvas(canvas, config, grid)
  }
 
