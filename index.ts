/*
  Scans through the html and calls the rendering functions on canvases
  */

import {render} from './render'
const renderStuff = () => {
  Array.prototype.slice.call(document.getElementsByClassName('art')).forEach((canvas) => {
    console.log('Rendering canvas with data ', canvas.dataset)
    render(canvas)
    if (canvas.dataset.repeat) {
      setInterval(() => render(canvas), parseInt(canvas.dataset.repeat))
    }
  })
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  renderStuff()
} else {
  document.addEventListener("DOMContentLoaded", renderStuff)
}

