import { layer, render, intensityMap, init, random} from '../engine.js'
import { compose, rCompose, printMap} from '../utils.js'
import { symmetry, horizontalSymmetry, verticalSymmetry, constant, centerProximity, cornerProximity} from '../maps'

import { clearLines } from '../processors.js'

const colors = ['green', 'blue', 'yellow']

const config = {
  pixelSize: 20,
  width: 100,
  height: 100,
}

const cutLine = (size, map) => map.map((row, i) => {
    const regionSize = row.length/size
    if (i > regionSize && i < regionSize * (size - 1)) {
        return row;
    } else {
      return row.map(() => undefined)
    }
})

export const lare = () => compose([
  init(config),

  layer(1, colors, constant(config, 10)),
  layer(2, colors, cutLine(6, constant(config, 50))),
  layer(10, colors, cutLine(3, constant(config, 30 * 20))),
  layer(5, colors, cutLine(4, constant(config, 30 * 20))),

  render(config)
])()
