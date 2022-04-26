import {render} from './render'
const renderStuff = () => {
  Array.prototype.slice.call(document.getElementsByClassName('art')).forEach((canvas) => {
    console.log(canvas.dataset)
    render(canvas)
    setInterval(() => render(canvas), parseInt(canvas.dataset.repeat))
  })
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  renderStuff()
} else {
  document.addEventListener("DOMContentLoaded", renderStuff)
}

