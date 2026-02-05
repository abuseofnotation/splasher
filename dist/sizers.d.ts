interface Coordinates {
    x: number;
    y: number;
}
export declare const constant: (config: any, size?: number) => ({ x, y }: Coordinates, cellIntensity: any) => number;
export declare const random: (config: any, size?: number) => ({ x, y }: Coordinates, cellIntensity: any) => number;
export declare const intensoReversed: (config: any, size?: number) => ({ x, y }: Coordinates, cellIntensity: any) => number;
export declare const intenso: (config: any, size?: number) => ({ x, y }: Coordinates, cellIntensity: any) => number;
export {};
//# sourceMappingURL=sizers.d.ts.map