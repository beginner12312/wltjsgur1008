import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Nav.css';

function Nav({ token, handleLogout }) {
  const location = useLocation();
  const [curPage, setCurPage] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case '/inputform':
        setCurPage(0);
        break;
      case '/forum':
        setCurPage(1);
        break;
      case '/calendar':
        setCurPage(2);
        break;
      default:
        setCurPage(-1);
    }
  }, [location.pathname]);

  return (
    <nav>
      <Link to ="/">
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/images/Nav/logo.png'} alt="GraduKNU Logo" />
        <p>GraduKNU</p>
      </div>  
      </Link>
      <div className="page-list">
        <ul>
          <li><Link to={'/inputform'} className={curPage === 0 ? 'active' : ''} style={{ textDecoration: "none", color: "black" }}>졸업요건</Link></li>
          <li><Link to={'/forum'} className={curPage === 1 ? 'active' : ''} style={{ textDecoration: "none", color: "black" }}>게시판</Link></li>
          <li><Link to={'/calendar'} className={curPage === 2 ? 'active' : ''} style={{ textDecoration: "none", color: "black" }}>캘린더</Link></li>
        </ul>
      </div>
      <div className="account">
        {!token ? (
          <>
            <button className="color-gr"><Link to="/register" style={{ textDecoration: "none", color: "black" }}>회원가입</Link></button>
            <button className="color-sb"><Link to="/login" style={{ textDecoration: "none", color: "black" }}>로그인</Link></button>
          </>
        ) : (
          <button className="color-red" onClick={handleLogout} style={{ textDecoration: "none", color: "blakc" }}>로그아웃</button>
        )}
      </div>
    </nav>
  )
};

export default Nav;