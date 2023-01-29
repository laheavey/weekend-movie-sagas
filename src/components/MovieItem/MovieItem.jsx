import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import MovieDetail from '../MovieDetail/MovieDetail';

export default function MovieItem ({movie}) {
    const [clicked, setClicked] = useState(false);

    const toggleDetails = () => {
        setClicked((current) => !current);
    };

    return (
        <>
            <h3>{movie.title}</h3>
            <div onClick={toggleDetails}>
                {clicked 
                ?
                <Redirect 
                    to={{pathname: `/detail/${movie.id}`}}
                    component={MovieDetail}
                />
                :
                <img src={movie.poster} alt={movie.title}/>
                }
            </div>
        </>
    )
}