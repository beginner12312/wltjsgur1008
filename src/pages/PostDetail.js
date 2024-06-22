import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServerURL = 'http://localhost:8000';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${ServerURL}/api/board/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${ServerURL}/api/user/current`, { withCredentials: true });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchPost();
    fetchCurrentUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${ServerURL}/api/board/delete/${id}`);
      alert('게시글이 삭제되었습니다.');
      navigate('/forum');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>작성자: {post.author}</p>
      <p>작성일: {new Date(post.created_at).toLocaleDateString()}</p>
      {currentUser && post.author_id === currentUser.student_id && (
        <div>
          <button className="btn btn-warning" onClick={handleEdit}>수정</button>
          <button className="btn btn-danger" onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
}

export default PostDetail;
