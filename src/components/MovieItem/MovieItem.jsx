import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';
import { generatePath } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation} from 'react-router-dom'
import MovieDetails from '../MovieDetails/MovieDetails';

export default function MovieItem ({movie}) {
    const [clicked, setClicked] = useState(false);
    const toggleDetails = () => {
        setClicked((current) => !current);
    }

    useEffect(() => {

    },)
    console.log('movie props: ', movie.props)

    return (
        <>
            <h3>{movie.title}</h3>
            <div onClick={toggleDetails}>
                {clicked 
                ?
                <Redirect to={{
                    pathname: `/details/${movie.id}`,
                    state: {movie: movie}}}
                    component={MovieDetails} movie={movie} />
                :
                // <Link to={`/details/${movie.id}`} >
                    <img src={movie.poster} alt={movie.title}/>
                // </Link>
                }
            </div>

                
            
        </>
    )
}