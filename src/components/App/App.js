import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieDetail/MovieDetail';
import AddMovie from '../AddMovie/AddMovie';

export default function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>    

        <Route path="/" exact>
          <MovieList />
        </Route>

        {/* Details page */}
        <Route path="/detail/:id" exact>
        <MovieDetail/>
        </Route>

        {/* Add Movie page */}
        <Route path="/add-movie/" exact>
          <AddMovie/>
        </Route>

        
      </Router>
    </div>
  );
}
