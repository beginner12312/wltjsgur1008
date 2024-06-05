import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Main from './pages/Main'; // Main 페이지를 import합니다.
import Forum from './pages/Forum';
import Write from './pages/Write';
import Register from './components/Register';
import Login from './components/Login';
import Calendar from './pages/Calendar';
import AddEvent from './components/AddEvent'; // 일정 추가 페이지 import
import './styles/App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div>
      <Nav token={token} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main />} /> {/* 메인 페이지 라우팅 설정 */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/write" element={token ? <Write /> : <Login setToken={setToken} />} />
        <Route path="/calendar" element={<Calendar token={token} />} />
        <Route path="/add-event" element={token ? <AddEvent /> : <Login setToken={setToken} />} /> {/* 일정 추가 페이지 라우팅 */}
      </Routes>
    </div>
  );
}

export default App;
