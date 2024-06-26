import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const ServerURL = 'http://localhost:8000';

function Login({ setToken }) {
  const [student_id, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ServerURL}/api/user/login`, { student_id, password }, { withCredentials: true });
      if (response.status === 200) {
        setToken(response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="login-form">
      <h4>로그인</h4>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="학번"
            value={student_id}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="btn btn-primary">로그인</button>
          <Link to="/register" className="btn btn-secondary">회원가입</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
