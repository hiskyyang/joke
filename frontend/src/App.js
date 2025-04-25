import logo from './logo.svg';
import './App.css';
import HomePage from './components/pages/HomePage';
import AdminPage from './components/pages/AdminPage';
import { Routes, Route } from 'react-router-dom'; 
import NavBar from './components/pages/NavBar';

function App() {
  return (
    <div>
      
      <NavBar />

      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />   
        </Routes>
      </div>
    </div>
  );
}

export default App;
