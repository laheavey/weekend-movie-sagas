import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

export default function MovieDetails () {
    const {id} = useParams();
    const dispatch = useDispatch();
    const details = useSelector((store) => store.details);

    useEffect(() => {
        dispatch({ 
            type: `SAGA/FETCH_DETAIL/:id`,
            payload: id
        });
    }, []);

    return (
        <>
        {details.map((detail) => {
            console.log('detail.id: ', detail.id);
            if (detail.id == id){
                return (
                    <section key={detail.id}>
                        <h2>{detail.title}</h2>
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