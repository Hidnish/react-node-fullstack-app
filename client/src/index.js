import 'materialize-css/dist/css/materialize.min.css' //1
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import App from './components/App';
import rootReducers from './reducers';

const preloadState = {}

const store = configureStore({
    reducer: rootReducers,
    preloadState
}); 

const root = createRoot(document.getElementById('root'))

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);


//1 without relative path: webpack assumes it's inside node_modules directory


