export function generateRandomLayer(width, height, randomLow = 0, randomHigh = 0) {
    const grid = [];
    const cellsX = width;
    const cellsY = height;
    let ompie = 'dsda';

    for (let x = 0; x < cellsX; x++) {
        grid[x] = [];
        for (let y = 0; y < cellsY; y++) {
            grid[x][y] = 0;
        }
    }

    randomizeCell(grid, 0, 0);
    randomizeCell(grid, grid[0].length - 1, 0);
    randomizeCell(grid, 0, grid.length - 1);
    randomizeCell(grid, grid[0].length - 1, grid.length - 1);

    let stepSize = grid.length - 1;

    while (stepSize > 1) {
        // Square step
        for (let x = 0; x < cellsX - 1; x += stepSize) {
            for (let y = 0; y < cellsY - 1; y += stepSize) {
                let centerX = x + stepSizeMiddle(stepSize);
                let centerY = y + stepSizeMiddle(stepSize);

                grid[centerY][centerX] = calculateAverage([
                    grid[y][x],
                    grid[y][x + stepSize],
                    grid[y + stepSize][x],
                    grid[y + stepSize][x + stepSize]
                ]);
            }
        }

        // Diamond Step
        for (let y = 0; y <= cellsY; y += stepSize / 2) {
            for (let x = (y % stepSize > 0) ? 0 : stepSize / 2; x <= cellsX; x += stepSize) {

                let coordinates = [];

                // Top
                coordinates.push({x: x, y: y - stepSizeMiddle(stepSize)});
                // Right
                coordinates.push({x: x + stepSizeMiddle(stepSize), y: y});
                // Bottom
                coordinates.push({x: x, y: y + stepSizeMiddle(stepSize)});
                // Left
                coordinates.push({x: x - stepSizeMiddle(stepSize), y: y});


                let centerX = x;
                let centerY = y;

                if (centerX >= 0 && centerX <= cellsX - 1 && centerY >= 0 && centerY <= cellsY - 1) {
                    const filtered = coordinates.filter(coordinate => coordinate.x >= 0 && coordinate.x < cellsX && coordinate.y >= 0 && coordinate.y < cellsY);
                    const values = filtered.map(coordinate => grid[coordinate.y][coordinate.x]);

                    if (filtered.length > 2) {
                        grid[centerY][centerX] = calculateAverage(values);
                    }
                }

            }
        }

        stepSize = Math.floor(stepSize / 2);
    }

    return grid;
}

function randomizeCell(grid, x, y, randomBottom, randomTop) {
    grid[y][x] = Math.floor(Math.random() * 99) + 1;
}

function randomizeCellIfEmpty(grid, x, y) {
    if (grid[y][x] === 0) {
        randomizeCell(grid, x, y);
    }
}

function calculateAverage(values) {
    const valueSum = values.reduce((value, sum) => sum + value, 0);

    return Math.floor(valueSum / values.length);
}

function stepSizeMiddle(stepSize) {
    return Math.floor(stepSize / 2);
}