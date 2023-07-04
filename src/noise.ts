import {createNoise2D, type NoiseFunction2D} from "simplex-noise";

export class SimplexNoise {
    noise: NoiseFunction2D;

    public frequency: number;

    constructor(frequency: number, seed: number) {
        this.noise = createNoise2D();
        this.frequency = frequency;
    }
    public get(x: number, y: number): number {
        return Math.floor((this.noise(x / this.frequency, y / this.frequency) *0.5 + 0.5) * 255);
    }

    private random_vec() {
        let theta = Math.random() * 2 * Math.PI;
        return {x: Math.cos(theta), y: Math.sin(theta)};
    }
}