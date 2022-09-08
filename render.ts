import { init, fillCanvas } from './lib'
import * as fillers from './fillers'

export const render = (canvas, config) => {
    config.width = parseInt(canvas.width)
    config.height = parseInt(canvas.height)
    config.pixelSize = 1

    let grid = fillers.layer(canvas, config, init(config)())
    console.log('config', config)
    fillCanvas(canvas, config, grid)
  }
 
