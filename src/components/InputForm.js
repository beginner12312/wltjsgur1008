import React, { useState } from "react";
import '../styles/InputForm.css'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function InputForm() {

  let [progress, setProgress] = useState(0);

    return (
        <div className="container">
            <form>
                <div className="select-div">
                    <div>
                      <ProgressBar animated variant="warning" now={(progress / 2) * 100} />
                    </div>
                    <div className="slide">
                      {
                        progress == 0 ? <UserInfo /> : null
                      }
                    
                      {
                        progress == 1 ? <CreditInfo /> : null
                      }

                      {
                        progress > 0 ?
                        <Button variant="secondary" className="prev-btn" onClick={() => {setProgress(progress-1);}}>이전</Button>
                        : null
                      }
                      <Button variant="secondary" className="next-btn" onClick={() => {setProgress(progress+1)}}>다음</Button>{' '}
                    </div>
                </div>
            </form> 
        </div>
    )
}

function UserInfo(props) {
  return (
    <div className="user-info">
      <div>
        <p>학번</p>
        <select>
          <option value={17}>2017</option>
          <option value={18}>2018</option>
          <option value={19}>2019</option>
          <option value={20}>2020</option>
          <option value={21}>2021</option>
          <option value={22} selected>2022~24</option>
        </select>
      </div>
      <div>
        <p>학년</p>
        <select>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </div>
      <div>
        <p>학기</p>
        <select>
          <option>1</option>
          <option>2</option>
        </select>
      </div>
      <div>
        <p>전공유형</p>
        <div className="major-radio">
          <div><input type="radio" name="major-select" value="1"/> <span>주전공</span></div>
          <div><input type="radio" name="major-select" value="2"/> <span>복수전공</span></div>
          <div><input type="radio" name="major-select" value="3"/> <span>부전공</span></div>
        </div>
      </div>
   </div>
  )
}

function CreditInfo() {
  return (
    <div className="input-container">
      <Row className="mt-5">
        <Col><p>기초교양</p><input type="number" className="credit-input"/></Col>
        <Col><p>균형교양</p><input type="number" className="credit-input"/></Col>
      </Row>
      <Row className="mt-5">
        <Col><p>학문기초</p><input type="number" className="credit-input"/></Col>
        <Col><p>전공필수</p><input type="number" className="credit-input"/></Col>
      </Row>
      <Row className="mt-5">
        <Col><p>전공선택</p><input type="number" className="credit-input"/></Col>
        <Col><p>자유선택</p><input type="number" className="credit-input"/></Col>
      </Row>
    </div>
  )
}

export default InputForm;