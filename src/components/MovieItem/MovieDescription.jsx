import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function MovieDetails () {
    const history = useHistory(); 
    const { id } = useParams();
    // const movieId = history.location.state.movieId;

    const dispatch = useDispatch();
    const details = useSelector(store => store.details);

    useEffect(() => {
        // console.log(this.props.location.state);
        // console.log(this.location)
        // console.log(id);
        dispatch({ 
            type: `SAGA/FETCH_DETAILS/:id`,
            payload: id
        });
    }, [])


    console.log('id: ', id);

    return (
        <>
        {details.map((detail) => {
            console.log('detail.id: ', detail.id);
            if (detail.id == id){
                return (
                    <section key={detail.id}>
                        <div>
                            <img src={detail.poster} alt={detail.title} height="100px"/>
                            <p>Genre(s): {detail.genre_names}</p>
                        </div>
                        <div>
                            {detail.description}
                        </div>
                        <Link to='/'>
                            <button>BACK</button>
                        </Link>
                    </section>
                )
            }
        })}
        </>

    )
}