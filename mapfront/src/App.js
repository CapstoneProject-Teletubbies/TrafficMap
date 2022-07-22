import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';
import Test from './pages/Test';
import ResultSearch from './pages/ResultSearch';
import BusRoute from './pages/BusRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<Search />} />
        <Route path='/test' element={<Test />} />
        <Route path='/resultsearch' element={<ResultSearch />} />
        <Route path='/bus-route' element={<BusRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
