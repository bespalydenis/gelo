import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import createSagaMiddleware from "redux-saga";
import {applyMiddleware, createStore} from "redux";
import reducer from "./store/reducers";
import rootSaga from "./store/saga";
import { createLogger } from 'redux-logger';
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from 'jwt-decode';
import setCurrentUser from './store/actions';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
    level: "log",
    duration: false,
    timestamp: false,
    collapsed: true
});

/* eslint-disable no-underscore-dangle */
const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
);
/* eslint-enable */

sagaMiddleware.run(rootSaga);

if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;

    setAuthToken(token);

    const decoded = jwt_decode(token);

    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
        window.location.href = './';
    }
}

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
