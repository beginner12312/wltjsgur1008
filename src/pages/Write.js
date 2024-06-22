import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Write.css';

const ServerURL = 'http://localhost:8000';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${ServerURL}/api/board/insert`, {
        title,
        content,
      }, { withCredentials: true });

      setMessage('글이 성공적으로 작성되었습니다.');
      setTimeout(() => {
        navigate('/forum');
      }, 1000);
    } catch (error) {
      console.error('Error submitting post:', error);
      setMessage('글 작성에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="write-form">
      <h4>글쓰기</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="제목 입력(4-100)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            className="form-control"
            placeholder="내용 작성"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">작성</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Write;
