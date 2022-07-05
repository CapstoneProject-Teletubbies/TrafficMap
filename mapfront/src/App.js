import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/main' element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
