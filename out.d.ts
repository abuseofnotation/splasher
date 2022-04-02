declare module "utils" {
    export const printMap: (arr: any) => any;
    export const rCompose: (functions: any) => any;
    export const compose: (functions: any) => any;
    export const constant: (a: any) => () => any;
}
declare module "engine" {
    export const createCanvas: (grid: any, { pixelSize }: {
        pixelSize: any;
    }) => HTMLCanvasElement;
    export const fillCanvas: (canvas: any, { pixelSize }: {
        pixelSize: any;
    }, grid: any) => any;
    export const render: (config: any) => (grid: any) => any;
    export const intensityMap: ({ width, height }: {
        width: any;
        height: any;
    }) => (intensityFn: any) => any[][];
    export const random: (intensity: any) => boolean;
    export const splasher: (size: any, colors: any, intensityMap: any) => (canvas: any) => any;
    export const init: ({ width, height }: {
        width: any;
        height: any;
    }) => () => any[][];
}
declare module "maps" {
    export const centerProximity: (config: any, intensity?: number) => any[][];
    export const cornerProximity: (config: any, intensity?: number) => any[][];
    export const horizontalSymmetry: (config: any, intensity?: number) => any;
    export const verticalSymmetry: (config: any, intensity?: number) => any[];
    export const symmetry: (config: any, intensity?: number) => any;
    export const constant: (config: any, intensity?: number) => any[][];
}
declare module "index" { }
declare module "processors" {
    export const clearLines: (pixels: any) => (map: any) => any;
    export const clearEveryNthLine: (pixels: any) => (map: any) => any;
}
declare module "00/drope" {
    export const drope: (...args: any[]) => any;
}
declare module "00/film" {
    export const film: any;
}
declare module "00/flare" {
    export const flare: () => any;
}
declare module "00/lare" {
    export const lare: () => any;
}
declare module "00/scope" {
    export const scope: (...args: any[]) => any;
}
declare var requirejs: any;
declare var require: any;
declare var define: any;
