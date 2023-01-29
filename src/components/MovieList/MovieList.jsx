import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import MovieItem from '../MovieItem/MovieItem';
import { Link } from 'react-router-dom';

export default function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    
    useEffect(() => {
        dispatch({ type: 'SAGA/FETCH_MOVIES' })
    }, []);

    return (
        <main>
            <h2>Movie List</h2>
            <Link to='/add-movie'>
            <button>Add a Movie</button>
            </Link>
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