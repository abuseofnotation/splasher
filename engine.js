import { rCompose, compose} from './utils.js'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const pick = (options) => options[getRandomInt(options.length)];

export const render = (canvas) => ({pixelSize, width, height}) => (grid) => {
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
        //canvas.fill();
      }

    });
  });
  return canvas
};

export const createCanvas = ({width, height}) => (intensityFn) => 
  Array(width).fill().map((_, x) => Array(height).fill().map((_, y) => intensityFn(x, y)))

const printArray = (arr) => arr.map((row) => row.join(' ')).join('\n')



const shouldSplash = (intensity) => getRandomInt(intensity) + 1 === intensity 



const splash = (canvas, x, y, color, size = 3) => { 
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

export const splashCanvas = (size) => ({colors, width, height}) => (canvas) => {
  const newCanvas = createCanvas({width, height})(() => undefined)
  canvas
  .forEach((row, x) => row.forEach((cellIntensity, y) => {
    if (shouldSplash(cellIntensity)) {
      splash(newCanvas, x, y, pick(colors), size)
    }
  }))
  return newCanvas
}

export const layer = (size, intensityFn) => (config) => (canvas) => {
  return rCompose([
  createCanvas,
  splashCanvas(size),
  render(canvas),
])(config)(intensityFn)
}

