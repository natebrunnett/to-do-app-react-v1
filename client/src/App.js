import Home from './views/Home';
import Navbar from './components/Navbar';
import Login from './views/Login';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {

  const [user, setUser] = useState('guest');
  const [todos, setTodos] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser('guest');
    setTodos([]);
  }

  return (
    <Router>
      <Navbar user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<Home user={user} setUser={setUser} todos={todos} setTodos={setTodos}/>} />
        <Route path='/login' element={<Login setUser={setUser} setTodos={setTodos}/>} />
      </Routes>
    </Router>
  );
}

export default App;
