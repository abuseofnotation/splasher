export const random = (intensity) => getRandomInt(intensity) + 1 === intensity 


export const intensityMap = ({width, height}) => (intensityFn) => 
  Array(width).fill(1).map((_, x) => Array(height).fill(1).map((_, y) => intensityFn(x, y)))

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const pick = (options) => options[getRandomInt(options.length)];

export const init = ({width, height}) => () => 
  intensityMap({width, height})(() => undefined)

export const fillCanvas = (canvas, {pixelSize}, grid) => {
  const context = canvas.getContext('2d');

  // Clear any previously-drawn figures
  context.clearRect(0, 0, canvas.width, canvas.height);

  console.log("Rendering grid", grid)
  grid.forEach((row, horizontalIndex) => {
    row.forEach((blockColor, verticalIndex) => {
      if (blockColor) {
        //setTimeout(() => {
        //console.log('fill', horizontalIndex, verticalIndex)
        const width = horizontalIndex * pixelSize;
        const height = verticalIndex * pixelSize;

        context.fillStyle = blockColor;
        context.fillRect(width, height, pixelSize, pixelSize);


        //canvas.beginPath();
        //canvas.fillStyle = blockColor;
        //canvas.arc(width, height, size/2 , 0, 2 * Math.PI);
        //canvas.fill(1);
        //}, 0)
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

