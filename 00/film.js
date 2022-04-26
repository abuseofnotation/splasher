import { splasher, render, intensityMap, init, random} from '../engine.js'
import { compose, rCompose, printMap} from '../utils.js'

import { horizontalSymmetry, verticalSymmetry, constant, centerProximity} from '../maps'

const colors = ['green', 'blue', 'yellow', 'white']

const config = {
  pixelSize: 10,
  width: 200,
  height: 200,
}

export const film = compose([
  init(config),
  splasher(1, colors, constant(config, 1)),
  splasher(10, colors, constant(config, 10000)),
  splasher(50, colors, constant(config, 10000)),
  render(config)
])
