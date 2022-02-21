import React from 'react';
import './App.css';
import Generator from './map/components/generator';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './core/store/rootReducer';
import Controls from './map/components/controls/controls';

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancers = compose(middlewareEnhancer);
const store = createStore(createRootReducer(), undefined, composedEnhancers);

function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <Controls />
                <Generator />
            </Provider>
        </div>
    );
}

export default App;
