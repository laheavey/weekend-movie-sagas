import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from 'react-router-dom'

export default function EditMovie () {
    const {id} = useParams();
    const dispatch = useDispatch();
    const details = useSelector((store) => store.details);
    const genres = useSelector((store) => store.genres)

    let genreArray = details.map(detail => detail.genre_names);
    let genreIdArray = [];

    const [titleInput, setTitleInput] = useState('')
    const [posterInput, setPosterInput] = useState('')
    const [descriptionInput, setDescriptionInput] = useState('')

    useEffect(() => {
        dispatch({ type: `SAGA/FETCH_DETAIL/:id`, payload: id});
        dispatch({ type: 'SAGA/FETCH_GENRES'})
    }, [])

    const findGenreId = () => {
        genres.find((genre) => {
            if (genreArray.flat().includes(genre.name)){
                genreIdArray.push(genre.id);
            }
        })
        return genreIdArray.flat();
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let editedMovie ={
            id: Number(id),
            title: (titleInput || details.map(detail => detail.title).toString()),
            poster: (posterInput || details.map(detail => detail.poster).toString()),
            description: (descriptionInput || details.map(detail => detail.description).toString()),
            genre_names: genreArray.flat(),
            genre_ids: findGenreId()
            // genre_ids: findGenreId()
        }

        dispatch({ 
            type: 'SAGA/EDIT_MOVIE/:id', 
            payload: editedMovie
        })
    }

    const handleGenreInput = (event) => {
        genreArray.push(event.target.value)
        let tempArray = [];

        genreArray.forEach((word) => {
            if (!tempArray.includes(word)) {
                console.log('tempArray does not contain word: ', word)
                tempArray.push(word)
            } else {
                console.log('tempArray does contain word: ', word)

                let tempAIndex = tempArray.indexOf(word)
                tempArray.splice(tempAIndex, 1)

                genreArray.pop();

                let tempGIndex = genreArray.indexOf(word)
                genreArray.splice(tempGIndex, 1)

            }
        })


    }

    return (
        <>
        <h2>Edit a Movie</h2>
        {details.map((detail) => {
            return (
                <form onSubmit={handleSubmit} key={detail.id}>
                    <input
                    type='text'
                    value={titleInput}
                    placeholder={detail.title}
                    onChange={(event) => setTitleInput(event.target.value)}
                    />

                    <input
                    type='text'
                    value={posterInput}
                    placeholder='Poster'
                    onChange={(event) => setPosterInput(event.target.value)}
                    />
                
                    <input
                    type='text-area'
                    value={descriptionInput}
                    placeholder={detail.description}
                    onChange={(event) => setDescriptionInput(event.target.value)}
                    />
              

                    <fieldset 
                    placeholder={detail.genre_names}
                    id="genresList"
                    
                    >
                    <legend>Genre(s)</legend>
                    {genres.map((genre) => {
                        if (genre.name == detail.genre_names){
                            return (
                            <div key={genre.id}>
                            <input 
                            checked
                            type="checkbox" 
                            value={genre.name} 
                            name="genresList" 
                            onChange={(event) => handleGenreInput(event)}/>
                            <label id={genre.id}>
                                {genre.name}
                            </label>
                            </div>
                            )
                        }
                        return (
                            <div key={genre.id}>
                            <input 
                            type="checkbox" 
                            value={genre.name} 
                            name="genresList" 
                            onChange={(event) => handleGenreInput(event)}/>
                            <label id={genre.id}>
                                {genre.name}
                            </label>
                            </div>
                        )
                    })}
                    </fieldset>

                    <div>
                        <Link to='/'>
                            <button>
                                Cancel
                            </button>
                        </Link>
                        <input type='submit' value='Edit Movie' />
                    </div>
                </form>
            )

        })}      
        </>
    )
}