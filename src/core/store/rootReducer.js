import {combineReducers} from 'redux';
import city from '../../map/store/cityReducer';

const createRootReducer = () => combineReducers({
    city,
});

export default createRootReducer;