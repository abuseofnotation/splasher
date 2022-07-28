import { init, fillCanvas } from './lib'
import * as fillers from './fillers'

export const render = (canvas, config) => {
    config.pixelSize = parseInt(config.pixel)
    config.width = parseInt(canvas.width)/config.pixelSize
    config.height = parseInt(canvas.height)/config.pixelSize

    console.log("Found canvas ", config)
    
    let grid = init(config)()
    Array.prototype.slice.call(canvas.children)
      .forEach((layer) => {

        if (config.drawLayerByLayer) {
          setTimeout(() => {
          grid = fillers[layer.localName](layer.dataset, config, grid)
          fillCanvas(canvas, config, grid)
          }, 1)
        } else {
          grid = fillers[layer.localName](layer.dataset, config, grid)
        }
        
    })
    fillCanvas(canvas, config, grid)
  }
 
