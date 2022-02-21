import {REGENERATE_MAP, UPDATE_MAX_RANDOM, UPDATE_MIN_RANDOM} from './actionTypes';
import DiamondSquare from '../randomizers/diamondSquare';
import Walls from '../randomizers/walls';

const initialState = {
    size: 6,
    minRandom: 0,
    maxRandom: 0,
    terrain: [],
    walls: [],
};

function city(state = initialState, action) {
    switch (action.type) {
        case UPDATE_MIN_RANDOM: {
            const {minimum} = action.payload;

            return {...state, minRandom: minimum};
        }
        case UPDATE_MAX_RANDOM: {
            const {maximum} = action.payload;

            return {...state, maxRandom: maximum};
        }
        case REGENERATE_MAP: {
            const {size, minRandom, maxRandom} = state;
            const cells = (2 ** size) + 1;

            const terrain = new DiamondSquare().generateRandomLayer(cells, cells, minRandom, maxRandom);
            const walls = new Walls().generateWalls(cells, cells, 6);

            return {...state, terrain, walls};
        }
        default: {
            return state;
        }
    }
}

export default city;