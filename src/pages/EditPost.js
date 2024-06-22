import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServerURL = 'http://localhost:8000';

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${ServerURL}/api/board/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${ServerURL}/api/board/update`, { id, title, content });
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div>
      <h2>글 수정</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>제목:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>내용:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">수정</button>
      </form>
    </div>
  );
}

export default EditPost;
