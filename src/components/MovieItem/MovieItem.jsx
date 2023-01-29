import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieDescription from './MovieDescription';

export default function MovieItem ({movie}) {
    const [clicked, setClicked] = useState(false);

    const toggleDetails = () => {
        setClicked((current) => !current);
    }

    return (
        <>
            <h3>{movie.title}</h3>
            <div onClick={toggleDetails}>
                {clicked 
                ?
                <Redirect to={{
                    pathname: `/details/${movie.id}`,
                    state: {movieId: movie.id}}}
                    component={MovieDescription}/>
                :
                <img src={movie.poster} alt={movie.title}/>
                }
            </div>
        </>
    )
}