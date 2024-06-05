import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Write = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // 수정 시 필요한 게시글 ID

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8000/api/board/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
        });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // 수정 기능
        await axios.put(`http://localhost:8000/api/board/${id}`, { title, content }, { withCredentials: true });
      } else {
        // 새 글 작성 기능
        await axios.post('http://localhost:8000/api/board', { title, content }, { withCredentials: true });
      }
      navigate('/forum'); // 글 작성 또는 수정 후 게시판으로 리다이렉트
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? '글 수정' : '새 글 작성'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>내용</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <button type="submit">{id ? '수정' : '작성'}</button>
      </form>
    </div>
  );
};

export default Write;
