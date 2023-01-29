import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail';
import MovieDescription from '../MovieItem/MovieDescription'

export default function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>    

        <Route path="/" exact>
          <MovieList />
        </Route>

        <Route path="/detail/:id" exact>
          <MovieDescription />
        </Route>

        {/* Details page */}
        <Route path="/detail/" exact>
          <MovieDetail/>
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}
