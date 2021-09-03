import { rCompose } from './utils.js'

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const pick = (options) => options[getRandomInt(options.length)];

export const render = (size, canvas) => ({pixelSize, width, height}) => (grid) => {
  const context = canvas.getContext('2d');
  grid.forEach((row, verticalIndex) => {
    row.forEach((blockColor, horizontalIndex) => {
      if (blockColor) {
        const width = horizontalIndex * pixelSize;
        const heigth = verticalIndex * pixelSize;

        context.fillStyle = blockColor;
        context.fillRect(width, heigth, size, size);


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

const splash = (intensity, color) => getRandomInt(intensity) + 1 === intensity ? color : undefined

export const splashCanvas = ({colors}) => canvas => canvas.map((row) => row.map((cellIntensity) => splash(cellIntensity, pick(colors))))

export const layer = (size, intensityFn) => (config) => (canvas) => {
  return rCompose([
  createCanvas,
  splashCanvas,
  render(size* config.pixelSize, canvas),
])(config)(intensityFn)
}

