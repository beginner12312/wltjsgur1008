import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './pages/Main';
import Forum from './pages/Forum';
import Write from './pages/Write';
import Register from './components/Register';
import Login from './components/Login';
import Calendar from './pages/Calendar';
import AddEvent from './components/AddEvent';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import InputForm from './pages/InputForm';
import axios from 'axios';
import './styles/App.css';

const ServerURL = 'http://localhost:8000';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${ServerURL}/api/user/logout`, {}, { withCredentials: true });
      setToken('');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <Nav token={token} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/inputform" element={<InputForm />} />
        <Route path="/write" element={token ? <Write /> : <Login setToken={setToken} />} />
        <Route path="/calendar" element={<Calendar token={token} />} />
        <Route path="/add-event" element={token ? <AddEvent /> : <Login setToken={setToken} />} />
        <Route path="/edit/:id" element={token ? <EditPost /> : <Login setToken={setToken} />} />
      </Routes>
    </div>
  );
}

export default App;
