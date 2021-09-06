import { layer, render, intensityMap, init, random} from '../engine.js'
import { compose, rCompose, printMap} from '../utils.js'
import { symmetry, horizontalSymmetry, verticalSymmetry, constant, centerProximity, cornerProximity} from '../maps'
import { clearLines, clearEveryNthLine }  from '../processors'

const colors = ['green', 'blue', 'yellow']

const config = {
  pixelSize: 10,
  width: 200,
  height: 200,
}

export const drope = (...args) => {
  return compose([
    init(config),
    layer(2, colors, cornerProximity(config)),
    layer(2, colors, cornerProximity(config)),

    layer(10, colors, symmetry(config, 3000)),
    layer(20, colors, symmetry(config, 6000)),
    clearEveryNthLine(10),
    layer(30, colors, centerProximity(config, 10)),
    render(config)
  ])(...args)
}
