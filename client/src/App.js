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

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path='/' element={<Home user={user} setUser={setUser} />} />
        <Route path='/login' element={<Login setUser={setUser}/>} />
      </Routes>
    </Router>
  );
}

export default App;
