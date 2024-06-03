import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Forum.css';

const ServerURL = 'http://localhost:8000';

function Forum() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts from server');
        const response = await axios.get(`${ServerURL}/api/board/list`);
        console.log('Fetched posts:', response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting post with id: ${id}`);
      const response = await axios.delete(`${ServerURL}/api/board/delete/${id}`);
      console.log('Deleted post:', response.data);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="forum">
      <h2>자유게시판</h2>
      <div className="button-container">
        <Link to="/write" className="btn btn-primary">글쓰기</Link>
      </div>
      <div className="table-container">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{index + 1}</td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{new Date(post.created_at).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Forum;
