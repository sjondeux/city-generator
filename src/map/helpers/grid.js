export function emptygrid(width, height) {
    const grid = [];

    for (let x = 0; x < width; x++) {
        grid[x] = [];
        for (let y = 0; y < height; y++) {
            grid[x][y] = 0;
        }
    }

    return grid;
}