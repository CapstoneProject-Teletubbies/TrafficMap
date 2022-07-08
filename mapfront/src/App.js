import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from './pages/Main';
import Search from './pages/Search';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<Search />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
