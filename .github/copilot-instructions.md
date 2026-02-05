# Splasher: AI Coding Agent Instructions

## Project Overview
**Splasher** is a procedural pixel art generation library using randomized algorithms for creating abstract images. It pairs HTML canvas elements with custom `<splasher>` layer elements to compose layered, non-deterministic artwork. Used for illustrating narrative works.

## Architecture & Key Components

### Core Rendering Pipeline
The library uses a **layered composition model**:
1. **[render.ts](render.ts)** - Main entry point; extracts config from canvas, initializes grid, and delegates to fillers
2. **[fillers.ts](fillers.ts)** - Implements layer types (`splasher`, `plasher`, `layer`) that apply map/size functions to grids
3. **[lib.ts](lib.ts)** - Utility functions: grid initialization (`init`), canvas rendering (`fillCanvas`), random utilities

### Maps (Intensity Functions)
Located in [maps.ts](maps.ts), these generate 2D intensity grids determining pixel placement probability:
- **Proximity-based**: `centerProximity`, `cornerProximity` - intensity increases with distance from center/corners
- **Geometric patterns**: `diagonals`, `horizontalLines`, `verticalLines`
- **Symmetry variants**: `symmetry`, `horizontalSymmetry`, `verticalSymmetry` - mirror patterns
- **Static**: `constant` - uniform intensity; `hallway` - restricted zones

Pattern: Each map accepts `(config, intensity=default)` and returns a 2D array where values determine likelihood of rendering at that position.

### Sizers (Size Functions)
Located in [sizers.ts](sizers.ts), these determine pixel block dimensions:
- **`constant`** - fixed size regardless of intensity
- **`random`** - varies from 0 to specified max
- **`intenso`** / **`intensoReversed`** - size correlates with cell intensity (proportional vs. inverse)

Pattern: Each sizer is `(config, size=default) => (coordinates, cellIntensity) => pixelSize`

### Processing Pipeline
[processors.ts](processors.ts) provides optional post-processing (clearing lines in patterns), though currently minimal usage.

## Configuration & Data Flow

### Canvas-Level (HTML)
```html
<canvas class="art" data-pixel="4" data-repeat="2000" data-colors="black,pink,grey">
```
- **data-pixel**: Upscale pixel size
- **data-repeat**: Milliseconds between regenerations (optional)
- **data-colors**: Comma-separated color palette

### Layer-Level (`<splasher>` elements)
```html
<splasher data-map="diagonals" data-params="1000" data-size="intensoReversed" data-size-params="50" />
```
- **data-map**: Function name from `maps.ts`
- **data-params**: Parameter passed to map function
- **data-size**: Function name from `sizers.ts`
- **data-size-params**: Parameter passed to size function
- **data-colors**: Override canvas colors (optional)

### Execution Flow
1. [index.ts](index.ts) scans for `.art` canvas elements on DOM ready
2. Calls `render(canvas, config)` per canvas
3. `render` initializes empty grid via `init()`, processes child layers via `layer()`
4. Each layer (`splasher`/`plasher`) verifies parameters, applies map + sizer, modifies grid
5. `fillCanvas` rasterizes grid to 2D canvas context with pixel blocks

## Key Patterns & Conventions

### Function Composition Pattern
[utils.ts](utils.ts) provides `compose` and `rCompose` for chaining functions—used internally for map/sizer pipelines.

### Error Handling
Fillers validate map/sizer names at runtime (not compile-time) and throw descriptive errors listing available options. This enables extensibility without recompilation.

### Grid Representation
Grids are 2D arrays: `grid[x][y]` where values are `undefined` (empty) or color strings. Maps produce intensity numbers; fillers probabilistically decide placement.

### Layer Filling Strategies
- **`splasher`** - Paints all probability-determined pixels
- **`plasher`** - Only paints in empty cells (non-destructive)
- **`layer`** - Recursive wrapper allowing nested canvases

## Build & Development

### Compilation
```bash
tsc  # Compile TypeScript to AMD module format (out.js + out.d.ts)
```
**Configuration**: [tsconfig.json](tsconfig.json) uses `"module": "amd"` and `"outFile"` for bundling.

### Deployment
```bash
./update.sh  # Copies out.js to external project (thoughts-of-x/assets/)
```

### Development Notes
- TypeScript target: ES2015 with DOM lib
- Source maps enabled for debugging `.ts` files
- Requires `require.js` for AMD module loading in browser
- No test framework present; validation is manual + browser-based

## Extension Points

**Adding a new map function**:
1. Add function to [maps.ts](maps.ts): `export const myMap = (config, intensity = default) => intensityMap(config)(...)`
2. Reference in HTML: `data-map="myMap"`

**Adding a new sizer**:
1. Add function to [sizers.ts](sizers.ts): `export const mySizer = (config, size = default) => ({x, y}, cellIntensity) => pixelSize`
2. Reference in HTML: `data-size="mySizer"`

## Common Tasks

- **Adjust spread/density**: Modify `data-params` or `data-size-params` values
- **Change color palette**: Edit `data-colors` or override per-layer
- **Debug intensity maps**: Uncomment `console.log` in [maps.ts](maps.ts) / [fillers.ts](fillers.ts)
- **Add post-processing**: Extend [processors.ts](processors.ts) and integrate in [fillers.ts](fillers.ts)
