import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

// import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import {composeWithDevTools} from 'redux-devtools-extension';
import rootReducer from './slices/index';

const store = configureStore({reducer: rootReducer});


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
