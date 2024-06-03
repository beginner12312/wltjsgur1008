import React from 'react';
import axios from 'axios';
import '../styles/BoardList.css';

const ServerURL = 'http://localhost:8000';

function BoardList({ posts = [], fetchPosts }) {

  const handleDelete = async (id) => {
    try {
      await axios.post(`${ServerURL}/api/board/delete`, { id }, { withCredentials: true });
      fetchPosts();
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <div className="board-list mt-4">
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성시간</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <tr key={post.BOARD_ID}>
                <td>{posts.length - index}</td>
                <td>{post.BOARD_TITLE}</td>
                <td>{post.REGISTER_ID}</td>
                <td>{post.REGISTER_DATE}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(post.BOARD_ID)}>삭제</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BoardList;
