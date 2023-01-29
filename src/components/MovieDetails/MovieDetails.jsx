import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function MovieDetails () {
    const dispatch = useDispatch();
    const details = useSelector(store => store.details);

    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS'});
    }, [])

    return (
        <section>
            <table>
                <thead>
                    <tr>
                    <th>Poster</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((movie) => {
                        return (
                            <tr key={movie.id}>
                                <td><img src={movie.poster} height="100px"></img></td>
                                <td>{movie.title}</td>
                                <td>{movie.description}</td>
                                <td>{movie.genre_names}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}