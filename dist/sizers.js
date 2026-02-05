import * as lib from './lib.js';
export const constant = (config, size = 2000) => ({ x, y }, cellIntensity) => lib.random(cellIntensity) ? size : 0;
export const random = (config, size = 2000) => ({ x, y }, cellIntensity) => lib.random(cellIntensity) ? lib.getRandomInt(size) : 0;
const minIntensityCoefficient = 20;
export const intensoReversed = (config, size = 2000) => ({ x, y }, cellIntensity) => lib.random(cellIntensity) ? size * (cellIntensity / (minIntensityCoefficient * size)) : 0;
export const intenso = (config, size = 2000) => ({ x, y }, cellIntensity) => lib.random(cellIntensity) ? size - (size * (cellIntensity / (minIntensityCoefficient * size))) : 0;
//# sourceMappingURL=sizers.js.map