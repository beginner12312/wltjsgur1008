import React from "react";
import '../styles/Nav.css'
import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav>
          <div className="logo">
            <img src={process.env.PUBLIC_URL + '/images/Nav/logo.png'}/>
            <p>GraduKNU</p>
          </div>  

          <div className="page-list">
            <ul>
              <div><li><Link to={'/'} style={{textDecoration: "none", color: "black"}}>졸업요건</Link></li></div>
              <div><li><Link to={'/forum'} style={{textDecoration: "none", color: "black"}}>게시판</Link></li></div>
              <div><li><Link to={'/calander'} style={{textDecoration: "none", color: "black"}}>캘린더</Link></li></div>
            </ul>
          </div>

          <div className="account">
            <button className="color-gr">회원가입</button>
            <button className="color-sb">로그인</button>
          </div>
        </nav>
    )
};

export default Nav;