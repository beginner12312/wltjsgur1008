import React from 'react';
import '../styles/Main.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalculator, faComments, faCalendarDays, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

function Main() {

  const navigate = useNavigate();

  function goToCalc() {
    navigate("/inputform");
  }

  function goToForum() {
    navigate("/forum");
  }

  function goToCalendar() {
    navigate("/calendar");
  }

  return (
    <div className="main">
      <div className="introduction-main">
        <div><h3 className="mg-left mt-4">그래두강원대</h3></div>

        <div className="text-container">
          <p className="mg-left mt-4 intro-text">
            그래두강원대는 강원대학교 컴퓨터공학과의<br /> 졸업요건 관리 프로젝트입니다.<br />
            그래두강원대의 기능을 사용해 편리하게<br /> 졸업을 준비하세요.
          </p>
        </div>
      </div>

      <div className="icon-container mt-5">
        <Row className="bg">
          <Col xs={5}>
            <p>자신의 이수학점을 인정 학점으로 변환하고<br />졸업에 필요한 요건들을 확인해보세요.<br/></p>
            <Button variant="dark" style={{fontSize:"0.8rem"}} onClick={goToCalc}>학점계산 바로가기</Button>
          </Col>
          <Col xs={2}><FontAwesomeIcon icon={faCalculator} size="2x" className="icons"/></Col>
          <Col xs={5}></Col>
        </Row>
        <Row>
          <Col xs={5}></Col>
          <Col xs={2}><FontAwesomeIcon icon={faEllipsisVertical} size="2x"/></Col>
          <Col xs={5}></Col>
        </Row>
        <Row>
          <Col xs={5}></Col>
          <Col xs={2}><FontAwesomeIcon icon={faComments} size="2x" className="icons" style={{padding:"1.2rem 1rem"}}/></Col>
          <Col xs={5}>
            <p style={{textAlign:"start"}}>게시판에서 졸업에 도움이 되는 정보들을 얻고 <br/>알고있는 것들을 공유해주세요.</p>
            <Button variant="dark" style={{fontSize:"0.8rem"}} onClick={goToForum}>게시판 바로가기</Button>
          </Col>
        </Row>
        <Row>
          <Col xs={5}></Col>
          <Col xs={2}><FontAwesomeIcon icon={faEllipsisVertical} size="2x"/></Col>
          <Col xs={5}></Col>
        </Row>
        <Row>
          <Col xs={5}>
            <p>캘린더를 사용해 졸업을 계획적으로 준비하고<br/>일정을 추가해 보기쉽게 관리해보세요.</p>
            <Button variant="dark" style={{fontSize:"0.8rem"}} onClick={goToCalendar}>캘린더 바로가기</Button>
          </Col>
          <Col xs={2}><FontAwesomeIcon icon={faCalendarDays} size="2x" className="icons" style={{padding:"1.2rem 1.4rem"}}/></Col>
          <Col xs={5}></Col>
        </Row>
        
      </div>
    </div>
  );
}

export default Main;