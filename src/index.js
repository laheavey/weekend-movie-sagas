import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('SAGA/FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('SAGA/FETCH_GENRES', fetchAllGenres);
    yield takeEvery('SAGA/FETCH_DETAILS/:id', fetchDetails);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data})
    } catch {
        console.log('get all error');
    }    
}

function* fetchAllGenres() {
    // get all movies from the DB
    try {
        const genres = yield axios.get('/api/genre');
        console.log('get all:', genres.data);
        yield put({ type: 'SET_GENRES', payload: genres.data})
    } catch {
        console.log('get all genres error');
    }    
}

function* fetchDetails(action) {
    console.log(action.payload);
    try {
        const details = yield axios.get(`/api/details/${action.payload}`)
        console.log('get all details:', details.data);
        yield put({ type: 'SET_DETAILS', payload: details.data})
    } catch {
        console.log('get all details error');
    }    

}    

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Reducer - movieDetails
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
    }
    return state;
}


// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        details,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
