import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Nav.css';

function Nav({ token, handleLogout }) {
  return (
    <nav>
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/images/Nav/logo.png'} alt="Logo" />
        <p>GraduKNU</p>
      </div>  
      <div className="page-list">
        <ul>
          <div><li><Link to="/" className="nav-link">졸업 요건</Link></li></div> {/* 메인 페이지 링크 수정 */}
          <div><li><Link to="/forum" className="nav-link">게시판</Link></li></div>
          <div><li><Link to="/calander" className="nav-link">캘린더</Link></li></div>
        </ul>
      </div>
      <div className="account">
        {!token ? (
          <>
            <Link to="/register" className="btn color-gr">회원가입</Link>
            <Link to="/login" className="btn color-sb">로그인</Link>
          </>
        ) : (
          <button className="btn color-red" onClick={handleLogout}>로그아웃</button>
        )}
      </div>
    </nav>
  );
}

export default Nav;