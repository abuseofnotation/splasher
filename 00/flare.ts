import { layer, render, intensityMap, init, random} from '../engine.js'
import { compose, rCompose, printMap} from '../utils.js'
import { symmetry, horizontalSymmetry, verticalSymmetry, constant, centerProximity, cornerProximity} from '../maps'

import { clearLines } from '../processors.js'

const colors = ['green', 'blue', 'yellow']

const config = {
  pixelSize: 10,
  width: 200,
  height: 200,
}

export const flare = () => compose([
  init(config),

  layer(2, colors, centerProximity(config)),
  layer(2, colors, centerProximity(config)),
  layer(3, colors, centerProximity(config)),
  layer(5, colors, centerProximity(config)),

  render(config)
])()
