export const random = (intensity) => getRandomInt(intensity) + 1 === intensity 


export const intensityMap = ({width, height}) => (intensityFn) => 
  Array(width).fill(1).map((_, x) => Array(height).fill(1).map((_, y) => intensityFn(x, y)))

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const pick = (options) => options[getRandomInt(options.length)];

export const init = ({width, height}) => () => 
  intensityMap({width, height})(() => undefined)

export const fillCanvas = (canvas, {pixelSize}, grid) => {
  const context = canvas.getContext('2d');

  // Clear any previously-drawn figures
  context.clearRect(0, 0, canvas.width, canvas.height);

  //Apply each layer
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


const createCanvas= (grid, {pixelSize}) => { 
  const canvas = document.createElement('canvas')
  canvas.width = grid.length * pixelSize
  canvas.height = grid[0].length * pixelSize
  canvas.style.margin = pixelSize * 20 + 'px'
  return canvas;
}





const render = (config) => (grid) => 
  fillCanvas(createCanvas(grid, config), config, grid)

