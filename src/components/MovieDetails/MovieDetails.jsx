import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useLocation} from 'react-router-dom'

export default function MovieDetails () {
    const history = useHistory(); 
    const movieDescription = history.location.state.movie.description;

    useEffect(() => {
        console.log(movieDescription);
    })

    return (
        <>
            <p>{movieDescription}</p>
            <Link to='/'>
            <button>BACK</button>
            </Link>
        </>

    )
}