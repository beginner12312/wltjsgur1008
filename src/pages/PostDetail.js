import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/board/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);


  
  if (!post) return <div>Loading...</div>;

  return (
    <div>
        <h1>{post.BOARD_TITLE}</h1>
        <p>{post.BOARD_CONTENT}</p>
        <p>작성자: {post.REGISTER_ID}</p>
        <p>작성일: {post.REGISTER_DATE}</p>
    </div>
);
};

export default PostDetail;