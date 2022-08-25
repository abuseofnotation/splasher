declare module "utils" {
    export const printMap: (arr: any) => any;
    export const rCompose: (functions: any) => any;
    export const compose: (functions: any) => any;
    export const constant: (a: any) => () => any;
}
declare module "lib" {
    export const random: (intensity: any) => boolean;
    export const intensityMap: ({ width, height }: {
        width: any;
        height: any;
    }) => (intensityFn: any) => any[][];
    export const getRandomInt: (max: any) => number;
    export const pick: (options: any) => any;
    export const init: ({ width, height }: {
        width: any;
        height: any;
    }) => () => any[][];
    export const fillCanvas: (canvas: any, { pixelSize }: {
        pixelSize: any;
    }, grid: any) => any;
}
declare module "maps" {
    export const centerProximity: (config: any, intensity?: number) => any[][];
    export const cornerProximity: (config: any, intensity?: number) => any[][];
    export const hallway: (config: any, intensity?: number) => any[][];
    export const diagonals: (config: any, intensity?: number) => any[][];
    export const horizontalSymmetry: (config: any, intensity?: number) => any;
    export const verticalSymmetry: (config: any, intensity?: number) => any[];
    export const symmetry: (config: any, intensity?: number) => any;
    export const constant: (config: any, intensity?: number) => any[][];
    export const verticalLines: (config: any, intensity?: number) => any[][];
    export const horizontalLines: (config: any, intensity?: number) => any[][];
    export const grandient: (config: any, intensity?: number) => any[][];
    export const fractal: (config: any, intensity?: number) => any[][];
    export const triangles: (config: any, intensity?: number) => any[][];
    export const circle: (config: any, radiusCoefficient?: number) => any[][];
}
declare module "sizers" {
    interface Coordinates {
        x: number;
        y: number;
    }
    export const constant: (config: any, size?: number) => ({ x, y }: Coordinates, cellIntensity: any) => number;
    export const random: (config: any, size?: number) => ({ x, y }: Coordinates, cellIntensity: any) => number;
    export const intensoReversed: (config: any, size?: number) => ({ x, y }: Coordinates, cellIntensity: any) => number;
    export const intenso: (config: any, size?: number) => ({ x, y }: Coordinates, cellIntensity: any) => number;
}
declare module "fillers" {
    export const splasher: ({ size, sizeParams, colors, map, params }: {
        size: any;
        sizeParams: any;
        colors: any;
        map: any;
        params: any;
    }, config: any, canvas: any) => any;
    export const plasher: ({ size, sizeParams, colors, map, params }: {
        size: any;
        sizeParams: any;
        colors: any;
        map: any;
        params: any;
    }, config: any, canvas: any) => any;
}
declare module "render" {
    export const render: (canvas: any, config: any) => void;
}
declare module "index" { }
declare module "processors" {
    export const clearLines: (pixels: any) => (map: any) => any;
    export const clearEveryNthLine: (pixels: any) => (map: any) => any;
}
declare var requirejs: any;
declare var require: any;
declare var define: any;
declare module "00/drope" {
    export function drope(...args: any[]): any;
}
declare module "00/film" {
    export const film: any;
}
declare module "00/flare" {
    export function flare(): any;
}
declare module "00/lare" {
    export function lare(): any;
}
declare module "00/scope" {
    export function scope(...args: any[]): any;
}
