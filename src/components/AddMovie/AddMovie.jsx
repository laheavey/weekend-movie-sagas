import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'

export default function AddMovie () {
    const dispatch = useDispatch();
    const genres = useSelector((store) => store.genres);

    const [titleInput, setTitleInput] = useState('')
    const [posterInput, setPosterInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')
    const [genreInput, setGenreInput] = useState('');
    const [genreId, setGenreId] = useState('');
    
    useEffect(() => {
        dispatch({ type: 'SAGA/FETCH_GENRES'})
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const findGenreId = () => {
            genres.find((genre) => {
                if (genre.name == genreInput){
                    setGenreId(genre.id);
                }
            })
            return genreId;
        }

        let newMovie ={
            title: titleInput,
            poster: posterInput,
            description: descriptionInput,
            genre: genreInput,
            genre_id: findGenreId()
        }

        dispatch({ 
            type: 'SAGA/ADD_MOVIE', 
            payload: newMovie
        })

        clearInputs();
    }

    const clearInputs = () => {
        setTitleInput('')
        setPosterInput('')
        setDescriptionInput('')
        setGenreInput('')
        setGenreId('')
    }

    return (
        <>
        <h2>Add a Movie</h2>
        <form onSubmit={handleSubmit}>
            <input
            required
            type='text'
            value={titleInput}
            placeholder='Title'
            onChange={(event) => setTitleInput(event.target.value)}
            />
           

            <input
            required
            type='text'
            value={posterInput}
            placeholder='Poster'
            onChange={(event) => setPosterInput(event.target.value)}
            />
           

            <input
            required
            type='text'
            value={descriptionInput}
            placeholder='Description'
            onChange={(event) => setDescriptionInput(event.target.value)}
            />
           
            <>
            <input
            required
            placeholder='Genre'
            list='genresList'
            value={genreInput}
            onChange={(event) => setGenreInput(event.target.value)}
            />
                <datalist id='genresList'>
                    {genres.map((genre) => {
                        return (
                            <option key={genre.id} value={genre.name}>{genre.name}</option>
                        )
                    })}
                </datalist>
                </>
            <div>
                <Link to='/'>
                    <button>
                        Cancel
                    </button>
                </Link>
                <input type='submit' value='Add New Movie' />
            </div>

            
        </form>
        </>
        
    )
}