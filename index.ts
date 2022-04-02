import { splasher, render, intensityMap, init, random, fillCanvas } from './engine.js'

import * as maps from './maps' 

const renderStuff = () => {
  Array.prototype.slice.call(document.getElementsByClassName('art')).forEach((canvas) => {
    const config = Object.assign({}, canvas.dataset)
    config.width = canvas.width
    config.height = canvas.height
    config.colors = config.colors.split(',')
    config.pixelSize = parseInt(config.pixel)
    
    let grid = init(config)()
    Array.prototype.slice.call(canvas.children).forEach((layer) => {
        grid = layerFillers[layer.localName](layer.dataset, config)(grid)
    })
    fillCanvas(canvas, config, grid)
  })
  
}

const layerFillers = {
  splasher: ({size, colors, map, params}, config) => 
    splasher(parseInt(size), colors || config.colors, maps[map](config, parseFloat(params))),
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  renderStuff()
} else {
  document.addEventListener("DOMContentLoaded", renderStuff)
}