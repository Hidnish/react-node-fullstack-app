import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import App from './components/App';
import rootReducers from './reducers';

const preloadState = {}

const store = configureStore({
    reducer: rootReducers,
    preloadState
}); 

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
);


