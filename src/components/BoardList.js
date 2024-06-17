import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BoardList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/board');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        await axios.delete(`http://localhost:8000/api/board/${id}`);
        fetchPosts(); // 삭제 후 게시물 목록 다시 불러오기
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="board-list">
      <h1>자유게시판</h1>
      <table>
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
        {posts.map((post) => (
                        <tr key={post.BOARD_ID}>
                            <td>{post.BOARD_ID}</td>
                            <td>
                                <Link to={`/post/${post.BOARD_ID}`}>{post.BOARD_TITLE}</Link>
                            </td>
                            <td>{post.REGISTER_ID}</td>
                            <td>{post.REGISTER_DATE}</td>
                            <td>
                                <button onClick={() => handleDelete(post.BOARD_ID)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/write">
                <button>글쓰기</button>
            </Link>
        </div>
    );
};

export default BoardList;