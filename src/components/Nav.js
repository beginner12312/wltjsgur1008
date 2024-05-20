import React, { useState } from "react";
import '../styles/Nav.css'
import { Link } from "react-router-dom";

function Nav() {

  let [login, setLogin] = useState(false);
  let [curPage, setCurPage] = useState(0);

  return (
      <nav>
        <div className="logo">
          <img src={process.env.PUBLIC_URL + '/images/Nav/logo.png'}/>
          <p>GraduKNU</p>
        </div>  
        <div className="page-list">
          <ul>
            <div><li><Link to={'/'} className={curPage == 0 ? 'active' : ''} style={{textDecoration: "none", color: "black"}} onClick={() => {setCurPage(0)}}>졸업요건</Link></li></div>
            <div><li><Link to={'/forum'} className={curPage == 1 ? 'active' : ''} style={{textDecoration: "none", color: "black"}} onClick={() => {setCurPage(1)}}>게시판</Link></li></div>
            <div><li><Link to={'/calander'} className={curPage == 2 ? 'active' : ''} style={{textDecoration: "none", color: "black"}} onClick={() => {setCurPage(2)}}>캘린더</Link></li></div>
          </ul>
        </div>
        <div className="account">
          {
            !login ?
              <>
                <button className="color-gr">회원가입</button>
                <button className="color-sb">로그인</button>
              </>
            : null
            // <button className="color-red btn">로그아웃</button>
          }
        </div>
      </nav>
  )
};

export default Nav;