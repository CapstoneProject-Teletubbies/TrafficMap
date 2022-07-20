import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';
import Test from './pages/Test';
import ResultSearch from './pages/ResultSearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<Search />} />
        <Route path='/test' element={<Test />} />
        <Route path='/resultsearch' element={<ResultSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
