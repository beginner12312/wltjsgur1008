import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Write.css';

const ServerURL = 'http://localhost:8000';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${ServerURL}/insert`, { title, content }, { withCredentials: true });
      if (response.status === 200) {
        alert('글이 성공적으로 작성되었습니다.');
        navigate('/forum'); // 글 작성 후 게시판으로 이동
      }
    } catch (error) {
      console.error('Error occurred:', error);
      alert('글 작성에 실패했습니다.');
    }
  };

  return (
    <div className="write-form">
      <h4>글쓰기</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>제목</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>내용</label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">글쓰기</button>
      </form>
    </div>
  );
}

export default Write;
