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
      await axios.post(`${ServerURL}/api/user/register`, 
        { 
          username, 
          password, 
          student_id: studentId, 
          birth_date: birthDate 
        }, 
        { withCredentials: true }
      );
      alert('회원가입 완료');
      navigate('/'); // 홈 화면으로 리다이렉션
    } catch (error) {
      console.error('에러발생 :', error);
      alert('회원가입 실패');
    }
  };

  return (
    <div className="register-form">
      <h4>회원가입</h4>
      <input
        type="text"
        placeholder="학번"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="date"
        placeholder="생년월일"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <button onClick={handleRegister}>회원가입</button>
    </div>
  );
}

export default Register;
