import {emptygrid} from '../helpers/grid';

class diamondSquare {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.minRandom = 0;
        this.maxRandom = 0;

        this.grid = [];
    }

    generateRandomLayer = (width, height, minRandom = 0, maxRandom = 0) => {
        this.minRandom = minRandom;
        this.maxRandom = maxRandom;

        const cellsX = width;
        const cellsY = height;

        this.grid = emptygrid(width, height);

        this.randomizeCell(0, 0);
        this.randomizeCell(this.grid[0].length - 1, 0);
        this.randomizeCell(0, this.grid.length - 1);
        this.randomizeCell(this.grid[0].length - 1, this.grid.length - 1);

        let stepSize = this.grid.length - 1;

        while (stepSize > 1) {
            // Square step
            for (let x = 0; x < cellsX - 1; x += stepSize) {
                for (let y = 0; y < cellsY - 1; y += stepSize) {
                    let centerX = x + this.stepSizeMiddle(stepSize);
                    let centerY = y + this.stepSizeMiddle(stepSize);

                    this.grid[centerY][centerX] = this.calculateAverage([
                        this.grid[y][x],
                        this.grid[y][x + stepSize],
                        this.grid[y + stepSize][x],
                        this.grid[y + stepSize][x + stepSize]
                    ]);
                }
            }

            // Diamond Step
            for (let y = 0; y <= cellsY; y += stepSize / 2) {
                for (let x = (y % stepSize > 0) ? 0 : stepSize / 2; x <= cellsX; x += stepSize) {
                    let coordinates = [];

                    // Top
                    coordinates.push({x: x, y: y - this.stepSizeMiddle(stepSize)});
                    // Right
                    coordinates.push({x: x + this.stepSizeMiddle(stepSize), y: y});
                    // Bottom
                    coordinates.push({x: x, y: y + this.stepSizeMiddle(stepSize)});
                    // Left
                    coordinates.push({x: x - this.stepSizeMiddle(stepSize), y: y});

                    let centerX = x;
                    let centerY = y;

                    if (centerX >= 0 && centerX <= cellsX - 1 && centerY >= 0 && centerY <= cellsY - 1) {
                        const filtered = coordinates.filter(coordinate => coordinate.x >= 0 && coordinate.x < cellsX && coordinate.y >= 0 && coordinate.y < cellsY);
                        const values = filtered.map(coordinate => this.grid[coordinate.y][coordinate.x]);


                        if (isNaN(this.calculateAverage(values))) {
                            console.log('grid', this.grid);
                            console.log('stepsize', stepSize, 'x,y', x, y);
                            console.log('coordinates', coordinates);
                            console.log('values', values);

                            throw new Error('Illegal coordinate');
                        }

                        if (filtered.length > 2) {
                            this.grid[centerY][centerX] = this.calculateAverage(values);
                        }
                    }
                }
            }

            stepSize = Math.floor(stepSize / 2);

            this.minRandom = this.minRandom / 2;
            this.maxRandom = this.maxRandom / 2;
        }

        return this.grid;
    }

    randomizeCell = (x, y) => {
        this.grid[y][x] = Math.floor(Math.random() * 99) + 1;
    }

    calculateAverage = (values) => {
        const valueSum = values.reduce((value, sum) => sum + value, 0);
        const random =  Math.floor(Math.random() * (this.maxRandom + Math.abs(this.minRandom)) + this.minRandom);

        return Math.floor(valueSum / values.length) + random;
    }

    stepSizeMiddle = stepSize => Math.floor(stepSize / 2);
}

export default diamondSquare;