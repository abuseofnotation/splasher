/*
  Scans through the html and calls the rendering functions on canvases
  */

const parseBool = (str) => {
  if (str === "true" || str === true){ return true }
  if (str === "false" || str === false){ return false }
  if (str === undefined) { return false }
  else {throw new TypeError(`${str} is not a bool`)}
}

const defaultConfig = {
  drawLayerByLayer: true,
  //repeat: 3000,
}

import {render} from './render'
const renderStuff = () => {
  Array.prototype.slice.call(document.getElementsByClassName('art')).forEach((canvas) => {
    console.log('data', canvas.dataset);
    const config = Object.assign({}, defaultConfig, canvas.dataset);
    config.repeat = parseInt(config.repeat)
    config.drawLayerbyLayer = parseBool(config.drawLayerByLayer)
    console.log('Rendering canvas with data ', config) 
    render(canvas, config)
    if (config.repeat) {
      setInterval(() => render(canvas, config), config.repeat)
    }
  })
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  renderStuff()
} else {
  document.addEventListener("DOMContentLoaded", renderStuff)
}

