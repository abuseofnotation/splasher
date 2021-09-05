import { layer, render, intensityMap, init, random } from './engine.js'
import { rCompose, constant, printMap} from './utils.js'
import { film } from './00/film.js'
import { flare } from './00/flare.js'
import { scope } from './00/scope.js'


Array(10).fill().map(() => { document.body.appendChild(scope()) })

document.body.appendChild(scope())
document.body.appendChild(film())
document.body.appendChild(flare())

