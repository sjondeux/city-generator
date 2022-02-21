import {REGENERATE_MAP, UPDATE_MAX_RANDOM, UPDATE_MIN_RANDOM} from './actionTypes';

export const updateMinRandom = minimum => ({
    type: UPDATE_MIN_RANDOM,
    payload: {minimum: parseInt(minimum)},
});

export const updateMaxRandom = maximum => ({
    type: UPDATE_MAX_RANDOM,
    payload: {maximum},
});

export const regenerateMap = () => ({
    type: REGENERATE_MAP,
});