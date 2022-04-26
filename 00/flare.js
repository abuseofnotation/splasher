import { splasher, render, intensityMap, init, random} from '../engine.js'
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

  splasher(30, colors, constant(config, 30 * 20)),

  splasher(2, colors, centerProximity(config)),
  splasher(2, colors, centerProximity(config)),
  splasher(3, colors, centerProximity(config)),
  splasher(5, colors, centerProximity(config)),
  splasher(7, colors, centerProximity(config)),

  render(config)
])()
