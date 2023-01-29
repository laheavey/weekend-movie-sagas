import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem';
// import { useLocation, Link } from 'react-router-dom'

import { Link } from 'react-router-dom';


function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);
    

    useEffect(() => {
        dispatch({ type: 'SAGA/FETCH_MOVIES' })
        // console.log(location.pathname);
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <MovieItem movie={movie}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;

// onClick={}