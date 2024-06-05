import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddEvent.css'; // CSS 파일 불러오기

const AddEvent = () => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/calendar/add', { title, start, end }, { withCredentials: true });
      navigate('/calendar'); // 일정 추가 후 캘린더 페이지로 리다이렉트
    } catch (error) {
      console.error('Error adding event:', error);
      alert('일정 추가에 실패했습니다.');
    }
  };

  return (
    <div className="form-container">
      <h2>일정 추가</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>일정 제목</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>시작 일시</label>
          <input type="datetime-local" value={start} onChange={(e) => setStart(e.target.value)} required />
        </div>
        <div>
          <label>종료 일시</label>
          <input type="datetime-local" value={end} onChange={(e) => setEnd(e.target.value)} required />
        </div>
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default AddEvent;
