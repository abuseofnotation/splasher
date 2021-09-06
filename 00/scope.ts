import { layer, render, intensityMap, init, random} from '../engine'
import { compose, rCompose, printMap} from '../utils'

import { horizontalSymmetry, verticalSymmetry, constant, centerProximity} from '../maps'


const colors = ['green', 'blue', 'yellow']

const config = {
  pixelSize: 10,
  width: 200,
  height: 200,
}


export const scope = (...args) => {
  return compose([
    init(config),
    layer(60, colors, verticalSymmetry(config, 100000)),
    layer(60, colors, constant(config, 50000)),
    layer(10, colors, verticalSymmetry(config, 3000)),
    layer(20, colors, verticalSymmetry(config, 6000)),
    layer(2, colors, verticalSymmetry(config, 100)),
    //layer(4, colors, verticalSymmetry(config, 100)),
    layer(1, colors, constant(config, 10)),


    render(config)
  ])(...args)
}
