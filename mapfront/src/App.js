import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';
import FindSearch from './pages/FindSearch';
import ResultSearch from './pages/ResultSearch';
import BusRoute from './pages/BusRoute';
import LocationMap from './pages/LocationMap';
import FindWay from './pages/FindWay';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<Search />} />
        <Route path='/resultsearch' element={<ResultSearch />} />
        <Route path='/bus-route' element={<BusRoute />} />
        <Route path='/location-map' element={<LocationMap />} />
        <Route path='/find-way' element={<FindWay />} />
        <Route path='/find-search' element={<FindSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
