import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieDescription from '../MovieItem/MovieDescription'
// import MovieItem from '../MovieItem/MovieItem';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>    

        <Route path="/" exact>
          <MovieList />
        </Route>

        <Route path="/details/:id" exact>
          <MovieDescription />
        </Route>

        {/* Details page */}
        <Route path="/details/" exact>
          <MovieDetails/>
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
