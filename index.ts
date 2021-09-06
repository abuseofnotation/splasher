import { layer, render, intensityMap, init, random } from './engine.js'
import { rCompose, constant, printMap} from './utils.js'
import { film } from './00/film.js'
import { flare } from './00/flare.js'
import { scope } from './00/scope.js'
import { drope } from './00/drope.js'


Array(10).fill(1).map(() => { window.document.body.appendChild(drope()) })

document.body.appendChild(scope())
document.body.appendChild(film())
document.body.appendChild(flare())

