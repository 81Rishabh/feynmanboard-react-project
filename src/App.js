import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddTopic from './components/AddTopic';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path="/dashboard" element={ <Dashboard/> } />
        <Route path='/addTopic' element={<AddTopic/>} />
      </Routes>
    </div>
  );
}

export default App;
