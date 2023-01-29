import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import './index.css';
import App from './components/App/App.js';

// rootSaga generator function:
function* rootSaga() {
    yield takeEvery('SAGA/FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('SAGA/FETCH_GENRES', fetchAllGenres);
    yield takeEvery('SAGA/FETCH_DETAIL/:id', fetchDetails);
    yield takeEvery('SAGA/ADD_MOVIE', addMovie);
}

// GET request for all movies:
function* fetchAllMovies() {
    try {
        const movies = yield axios.get('/api/movie');
        yield put({ type: 'SET_MOVIES', payload: movies.data});
    } catch {
        console.log('Error in fetchAllMovies');
    }    
};

// GET request for all genres:
function* fetchAllGenres() {
    try {
        const genres = yield axios.get('/api/genre');
        yield put({ type: 'SET_GENRES', payload: genres.data});
    } catch {
        console.log('Error in fetchAllGenres');
    }    
};

// GET request for details by ID:
function* fetchDetails(action) {
    try {
        const details = yield axios.get(`/api/detail/${action.payload}`);
        yield put({ type: 'SET_DETAILS', payload: details.data});
    } catch {
        console.log('Error in fetchDetails');
    }    
};

function* addMovie(action) {
    try {
        yield axios({
            method: 'POST',
            url: '/api/movie',
            data: action.payload
        })
        console.log('Action.payload: ', action.payload)
    } catch {
        console.log('Error in addMovie')
    }
}
    
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// fetchAllMovies reducer:
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
};

// fetchDetails reducer:
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
};


// fetchAllGenres reducer:
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
};

// Store for components:
const storeInstance = createStore(
    combineReducers({
        movies,
        details,
        genres,
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
