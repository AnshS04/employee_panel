import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';

function App() {
  return (
    <Router> 
      <Navbar />
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/employeeList" element={<Employees/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
