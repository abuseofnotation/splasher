import { rCompose, compose} from './utils.js'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const pick = (options) => options[getRandomInt(options.length)];

export const createCanvas= (grid, {pixelSize}) => { 
  const canvas = document.createElement('canvas')
  canvas.width = grid.length * pixelSize
  canvas.height = grid[0].length * pixelSize
  canvas.style.margin = pixelSize * 20 + 'px'
  return canvas;
}

export const fillCanvas = (canvas, {pixelSize}, grid) => {
  const context = canvas.getContext('2d');
  grid.forEach((row, verticalIndex) => {
    row.forEach((blockColor, horizontalIndex) => {
      if (blockColor) {
        const width = horizontalIndex * pixelSize;
        const heigth = verticalIndex * pixelSize;

        context.fillStyle = blockColor;
        context.fillRect(width, heigth, pixelSize, pixelSize);


        //canvas.beginPath();
        //canvas.fillStyle = blockColor;
        //canvas.arc(width, heigth, size/2 , 0, 2 * Math.PI);
        //canvas.fill(1);
      }

    });
  });
  return canvas
}

export const render = (config) => (grid) => 
  fillCanvas(createCanvas(grid, config), config, grid)

export const intensityMap = ({width, height}) => (intensityFn) => 
  Array(width).fill(1).map((_, x) => Array(height).fill(1).map((_, y) => intensityFn(x, y)))




export const random = (intensity) => getRandomInt(intensity) + 1 === intensity 



const splashSpot = (canvas, x, y, color, size = 3) => { 
  const indexInRange = (i, y) => (i > (y - size)) && (i < (y + size))
  canvas.forEach((row, i) => {
    if (indexInRange(i, x)) {
      row.forEach((_, i) => {
        if(indexInRange(i, y)) {
          row[i] = color
        }
      })
    }
  })
}

/*
const arr = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
]
splash(arr, 3, 2, 1, 2)

console.log(printArray(arr))

*/

export const splasher = (size, colors, intensityMap) => (canvas) => {
  intensityMap
  .forEach((row, x) => row.forEach((cellIntensity, y) => {
    if (random(cellIntensity)) {
      splashSpot(canvas, x, y, pick(colors), size)
    }
  }))
  return canvas
}

export const init = ({width, height}) => () => 
  intensityMap({width, height})(() => undefined)