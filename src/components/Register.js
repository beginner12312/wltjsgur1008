import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const ServerURL = 'http://localhost:8000';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(`${ServerURL}/register`, { username, password, student_id: studentId, birth_date: birthDate });
      alert('Registration successful');
      navigate('/'); // 홈 화면으로 리다이렉션
    } catch (error) {
      console.error('Error occurred:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="register-form">
      <h4>회원가입</h4>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="date"
        placeholder="Birth Date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
}

export default Register;
