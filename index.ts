/*
  Scans through the html and calls the rendering functions on canvases
  */

const repeatAll = true // Rerenders all patterns each second - for debugging
const defaultConfig = {
  drawLayerByLayer: true,
}

import {render} from './render'
const renderStuff = () => {
  Array.prototype.slice.call(document.getElementsByClassName('art')).forEach((canvas) => {
    const config = Object.assign(defaultConfig, canvas.dataset);
    console.log('Rendering canvas with data ', config) 
    render(canvas, config)
    if (canvas.dataset.repeat || repeatAll) {
      setInterval(() => render(canvas, config), parseInt(canvas.dataset.repeat || 3000))
    }
  })
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  renderStuff()
} else {
  document.addEventListener("DOMContentLoaded", renderStuff)
}

