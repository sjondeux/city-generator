import {rnd} from '../helpers/random';
import {emptygrid} from '../helpers/grid';

class Walls {

    constructor() {
        this.walls = [];
    }

    generateWalls(width, height, padding = 10) {
        this.walls = emptygrid(width, height);

        let startX = rnd(padding, padding * 2);
        let startY = rnd(padding, padding * 2);

        let minPartLength = Math.floor(width / 5);
        let maxPartLength = Math.floor(width / 2);
        let endofWall = false;
        let partLength = 0;
        let waypoints = [{x: startX, y: startY}];

        // Top horizontal wall
        while (!endofWall) {
            partLength = rnd(minPartLength, maxPartLength);

            if (startX + partLength >= width - padding) {
                partLength = width - padding - startX;
                endofWall = true;
            }

            startX += partLength;
            waypoints.push({x: startX, y: startY});

            if (endofWall) {
                break;
            }

            // Create indent
            partLength = rnd(-5, 5);
            startY = this.findEdgeCoordinateValue(startY, partLength, padding);
            waypoints.push({x: startX, y: startY});
        }

        endofWall = false;

        while (!endofWall) {
            partLength = rnd(minPartLength, maxPartLength);

            if (startY + partLength >= height - padding) {
                partLength = height - padding - startY;
                endofWall = true;
            }

            startY += partLength;
            waypoints.push({x: startX, y: startY});

            if (endofWall) {
                break;
            }

            // Create indent
            partLength = rnd(-5, 5);
            startX = this.findEdgeCoordinateValue(startX, partLength, null, width - padding);
            waypoints.push({x: startX, y: startY});
        }

        endofWall = false;

        while (!endofWall) {
            partLength = rnd(minPartLength, maxPartLength);

            if (startX - partLength <= padding) {
                partLength = startX - padding;
                endofWall = true;
            }

            startX -= partLength;
            waypoints.push({x: startX, y: startY});

            if (endofWall) {
                break;
            }

            // Create indent
            partLength = rnd(-5, 5);
            startY = this.findEdgeCoordinateValue(startY, partLength, null, height - padding);
            //startY = startY - partLength > height - padding ? startY - partLength : startY + partLength;
            waypoints.push({x: startX, y: startY});
        }

        endofWall = false;

        while (!endofWall) {
            partLength = rnd(minPartLength, maxPartLength);

            if (startY - partLength <= waypoints[0].y) {
                partLength = startY - waypoints[0].y;
                endofWall = true;
            }

            startY -= partLength;
            waypoints.push({x: startX, y: startY});

            if (endofWall) {
                break;
            }

            // Create indent
            partLength = rnd(-5, 5);
            startX = this.findEdgeCoordinateValue(startX, partLength, padding);
            //startX = startX + partLength < padding ? startX - partLength : startX + partLength;
            waypoints.push({x: startX, y: startY});
        }

        waypoints.at(-1).x = waypoints[0].x;
        waypoints.at(-2).x = waypoints[0].x;

        this.fillGridWithWaypointData(waypoints);

        return this.walls;
    }

    fillGridWithWaypointData = waypoints => {
        for (let i = 0; i < waypoints.length - 1; i++) {
            if (waypoints[i].y === waypoints[i + 1].y) {
                this.drawHorizontalWall(waypoints[i].x, waypoints[i + 1].x, waypoints[i].y);
            } else if (waypoints[i].x === waypoints[i + 1].x) {
                this.drawVerticalWall(waypoints[i].y, waypoints[i + 1].y, waypoints[i].x);
            } else {
                throw new Error('Not a straight line');
            }
        }
    };

    drawHorizontalWall = (startX, endX, y) => {
        let start, end;

        if (startX < endX) {
            start = startX;
            end = endX;
        } else {
            start = endX;
            end = startX;
        }

        for (let x = start; x <= end; x++) {
            this.walls[y][x] = 1;
        }
    };

    drawVerticalWall = (startY, endY, x) => {
        let start, end;

        if (startY < endY) {
            start = startY;
            end = endY;
        } else {
            start = endY;
            end = startY;
        }

        for (let y = start; y <= end; y++) {
            this.walls[y][x] = 1;
        }
    };

    findEdgeCoordinateValue(current, partLength, minimum = null, maximum = null) {
        if (minimum) {
            if (current - Math.abs(partLength) <= minimum) {
                return current + Math.abs(partLength);
            }

            return current - Math.abs(partLength);
        }

        if (maximum) {
            if (current + Math.abs(partLength) >= maximum) {
                return current - Math.abs(partLength);
            }

            return current + Math.abs(partLength);
        }

    }
}

export default Walls;