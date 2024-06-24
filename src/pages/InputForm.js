import React, { useState, useEffect } from "react";
import '../styles/InputForm.css';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ServerURL = 'http://localhost:8000';

function InputForm() {
  let [progress, setProgress] = useState(0);
  let [textSelect, setTextSelect] = useState(3);  
  let [credit, setCredit] = useState([0, 0, 0, 0, 0, 0, 0]);
  let [result, setResult] = useState([0, 0, 0, 0, 0, 0, 0]);
  let [require, setRequire] = useState([17, 15, 12, 9, 33, 27, 17]);
  let [curriculum, setCurriculum] = useState(22);
  let [major, setMajor] = useState(1);
  let [majorType, setMajorType] = useState(1);
  let titleList = ["기초교양", "균형교양", "학문기초", "전공필수", "전공선택", "심화전공", "자유선택"]

  useEffect(() => {
    const copy = [
      [7, 13, 9, 12, 30, 27, 32],   //17컴과, 컴정 0
      [7, 13, 18, 12, 30, 27, 23],  //18컴과 1
      [7, 13, 18, 9, 33, 27, 23],   //18컴정 2
      [10, 13, 18, 12, 30, 27, 20], //19컴과, 20 3
      [10, 13, 18, 9, 33, 27, 20],  //19컴정, 21 4
      [17, 15, 12, 9, 33, 27, 17],  //22~ 5
      [7, 13, 9, 12, 30, 0, 59],    //17컴과, 컴정 복전 6
      [7, 13, 18, 12, 30, 0, 50],   //18컴과 복전 7
      [7, 13, 18, 9, 33, 0, 50],    //18컴정 복전 8
      [10, 13, 18, 12, 30, 0, 47],  //19컴과 복전, 20 복전  9
      [10, 13, 18, 9, 33, 0, 47],   //19컴정 복전, 21 복전 10
      [10, 13, 18, 12, 30, 12, 35], //20 부전 11
      [10, 13, 18, 9, 33, 12, 35],  //21 부전 12
      [17, 15, 12, 9, 33, 0, 44],   //22~ 복전 13
      [17, 15, 12, 9, 33, 12, 32]   //22~ 부전 14
    ];

    let index;

    switch(curriculum) {
      case 17:
        if(majorType == 1) index = 0;
        else if(majorType == 2) index = 6;
        break;
      case 18:
        if(major == 2) {
          if(majorType == 1) index = 1;
          else if(majorType == 2) index = 7;
        }
        else if(major == 3) {
          if(majorType == 1) index = 2;
          else if(majorType == 2) index = 8;
        }
        break;
      case 19:
        if(major == 2) {
          if(majorType == 1) index = 3;
          else if(majorType == 2) index = 9;
        }
        else if(major == 3) {
          if(majorType == 1) index = 4;
          else if(majorType == 2) index = 10;
        }
        break;
      case 20:
        if(majorType == 1) index = 3;
        else if(majorType == 2) index = 9;
        else if(majorType == 3) index = 11;
        break;
      case 21:
        if(majorType == 1) index = 4;
        else if(majorType == 2) index = 10;
        else if(majorType == 2) index = 12;
        break;
      case 22:
        if(majorType == 1) index = 5;
        else if(majorType == 2) index = 13;
        else if(majorType == 3) index = 14;
        break;
      default:
        index = 0;
        break;
    }

    setRequire(copy[index]);
  }, [curriculum, major, majorType])

  function calculate() {
    let tempResult = [...credit];
    let overCredit = 0;

    // 교양 초과학점 계산
    for(let i = 0; i < 3; i++) {
      if(tempResult[i] > require[i]) {
        overCredit += tempResult[i] - require[i];
        tempResult[i] = require[i];
      }
    }
    // 교양 초과학점 -> 자선
    if(overCredit > 10) overCredit = 10;
    if(overCredit != 0) tempResult[6] = tempResult[6] + overCredit;
    
    // 전공 초과학점 계산
    overCredit = 0;
    for(let i = 3; i < 6; i++) {
      // 전필, 전선 -> 심화
      if(i < 5) {
        if(tempResult[i] > require[i]) {
          overCredit += tempResult[i] - require[i];
          tempResult[i] = require[i];
        }
      } else {
        if(overCredit != 0) tempResult[i] = tempResult[i] + overCredit;
        // 심화 초과학점 -> 자선
        overCredit = 0;
        if(tempResult[i] > require[i]) {
          overCredit += tempResult[i] - require[i];
          tempResult[i] = require[i];
        }
      }
    }

    if (overCredit != 0) {
      tempResult[6] = tempResult[6] + overCredit;
    }

    if (tempResult[6] > require[6])
      tempResult[6] = require[6];

    setResult(tempResult);
  } 

  const handleSave = async () => {
    try {
      await axios.post(`${ServerURL}/api/user/save-credits`, {
        curriculum,
        major,
        majorType,
        basic_liberal_arts: credit[0],
        balanced_liberal_arts: credit[1],
        basic_studies: credit[2],
        major_required: credit[3],
        major_elective: credit[4],
        free_elective: credit[6],
      }, { withCredentials: true });
      alert('학점 정보가 저장되었습니다.');
    } catch (error) {
      console.error('Error saving credits:', error);
      alert('학점 정보 저장에 실패했습니다.');
    }
  };

  return (
    <>
      {
        progress < 2 ?
        <div className={progress < 2 ? "container show" : "container"}>
          <form>
            <div className="select-div">
              <div>
                {
                  progress != 2 ?
                  <ProgressBar animated variant="warning" now={(progress / 1) * 100} />
                  : null
                }
              </div>
              <form>
                <div className="slide">
                  {
                    progress == 0 ? 
                    <UserInfo curriculum={curriculum} setCurriculum={setCurriculum} major={major} setMajor={setMajor}
                    majorType={majorType} setMajorType={setMajorType}/> 
                    : null
                  }
                  {
                    progress == 1 ? <CreditInfo credit={credit} setCredit={setCredit}/> : null
                  }
                  {
                    progress > 0 ?
                    <Button variant="secondary" className="btn-location" onClick={() => {setProgress(progress-1);}}>이전</Button>
                    : null
                  }
                  {
                    progress < 1 ?
                    <Button variant="secondary" className="next-btn btn-location" onClick={() => {setProgress(progress+1);}}>다음</Button>
                    : null
                  }
                  {
                    progress == 1 ?
                    <Button variant="success" className="next-btn btn-location" onClick={() => {setProgress(progress+1); calculate();}}>완료</Button>
                    : null
                  }
                </div>
              </form>
            </div>
          </form> 
        </div>
        :
        <div className="result-container">
          <div className="credit-info">
            <div className="result-box">
              <p>졸업학점</p>
              <table>
                <tr>
                  <th>영역구분</th>
                  <th>인정학점</th>
                  <th>필요학점</th>
                </tr>
                {
                  result.map(function(data, i) {
                    return (
                      <tr key={ i }>
                        <td>{titleList[i]}</td>
                        <td className="user-credit">{data}</td>
                        <td>{require[i]}</td>
                      </tr>
                    )
                  })
                }
              </table>
              <Button variant="secondary" onClick={() => {setProgress(0);}}>수정</Button>
            </div>
          </div>
          <div className="other-info">
            <div className="info-radio">
              <h4>졸업요건</h4>
              <div><input type="radio" name="text-select" value={1} onClick={(e) => {setTextSelect(e.target.value)}}/> 캡스톤디자인 과제 참여</div>
              <h5><br/>졸업논문 유형(택1)</h5>
              <div><input type="radio" name="text-select" value={2} onClick={(e) => {setTextSelect(e.target.value)}}/> 산학협력프로젝트 결과보고서</div>
              <div><input type="radio" name="text-select" value={3} onClick={(e) => {setTextSelect(e.target.value)}}/> 정보처리기사 자격증</div>
              <div><input type="radio" name="text-select" value={4} onClick={(e) => {setTextSelect(e.target.value)}}/> 취업보고서</div>
              {
                major == 1 ?
                <>
                  <div><input type="radio" name="text-select" value={5} onClick={(e) => {setTextSelect(e.target.value)}}/> 학술논문</div>
                  <div><input type="radio" name="text-select" value={6} onClick={(e) => {setTextSelect(e.target.value)}}/> 졸업종합시험</div>
                </>
                : null
              }
              { major == 2 ? <div><input type="radio" name="text-select" value={6} onClick={(e) => {setTextSelect(e.target.value)}}/> 졸업종합시험</div>: null }
              { major == 3 ? <div><input type="radio" name="text-select" value={5} onClick={(e) => {setTextSelect(e.target.value)}}/> 학술논문</div>: null }
            </div>
            <div className="dark-box">
              {
                textSelect == 0 ?
                null
                : textSelect == 1 ?
                <p>졸업 예정자는 졸업논문 통과 신청을 하기 위해 캡스톤디자인 과제를 수행하였거나 수행중이어야 한다.</p>
                : textSelect == 2 ?
                <p>
                  산학협력프로젝트 결과보고서로 졸업논문을 통과하고자 하는 경우, 본인이 수행한 산학협력프로젝트 관련 주제로 개인별 보고서를 작성하여 제출해야 한다.<br/>
                  산학협력프로젝트 결과보고서는 지도교수의 심사를 통과한 후 졸업예정학기 종강 1주일 전까지 학과에 제출하여야 한다.
                </p>
                : textSelect == 3 ?
                <p>
                  정보처리기사 자격을 취득하여 졸업종합시험 면제신청서를 제출하는경우 졸업논문을 통과한 것으로 본다.<br/>
                  정보처리기사 자격 취득으로 졸업논문 통과 인정을 받고자 하는 경우, 졸업종합시험 면제신청서를 졸업예정학기 종강 1주일 전까지 학과에 제출하여야 한다.
                </p>
                : textSelect == 4 ?
                <p>
                  졸업예정자 중 취업하여 3개월 이상 재직 중인 경우, 취업보고서를 제출하여 졸업논문 통과 신청을 할 수 있다.<br/>
                  취업보고서로 졸업논문 통과 인정을 받고자 하는 경우, 취업보고서를 작성하여 졸업예정학기 종강 14일 전까지 학과로 제출하며, 통과 여부는 학과장이 결정한다.
                </p>
                : textSelect == 5 ?
                <p>
                  지도교수의 지도를 받아 한국연구재단등재후보지 이상 전공 분야 논문지에 출판하거나(출판확정 포함),
                  한국연구재단등재후보지 이상 논문지를 발행하는 전공분야 학회에서 주최하는 학술대회에서 공개 발표하는 경우 졸업논문 통과 신청을 할 수 있다. 단, 두 경우 모두 신청자가 제 1저자이어야 한다.<br/>
                  위의 논문으로 졸업논문 통과 신청을 하고자 하는 경우, 논문집 표지, 목차, 논문 사본을 졸업예정학기 종강 1주일 전까지 학과에 제출하여야 한다.
                </p>
                : textSelect == 6 ?
                <p>
                  졸업종합시험은 학과 전임교원 3인 이상의 졸업시험관리위원회를 구성하여, 시험과목, 출제위원, 기타 세부 운영계획을 수립하고 시험일 30일 전까지 졸업예정자에게 공지하여야 한다.<br/>
                  졸업종합시험 성적은 100점 만점에 평균 60점 이상을 합격으로 하며, 40점 미만은 과락으로 한다.
                </p>
                : null
              }
            </div>
            <div>
              <button className="btn-save" onClick={handleSave} >저장</button>
            </div>
          </div>
        </div>
      }
    </>
  );
}

function UserInfo(props) {
  return (
    <div className="user-info">
      <div>
        <p>입학년도</p>
        <select onChange={(e) => {props.setCurriculum(parseInt(e.target.value));}}>
          <option value={17}>2017</option>
          <option value={18}>2018</option>
          <option value={19}>2019</option>
          <option value={20}>2020</option>
          <option value={21}>2021</option>
          <option value={22} selected>2022~24</option>
        </select>
      </div>
      <div className="radio">
        <p>학과</p>
        <div><input type="radio" name="major" value="1" onClick={(e) => {props.setMajor(parseInt(e.target.value))}}/> 컴퓨터공학과</div>
        <div><input type="radio" name="major" value="2" onClick={(e) => {props.setMajor(parseInt(e.target.value))}}/> 컴퓨터과학전공</div>
        <div><input type="radio" name="major" value="3" onClick={(e) => {props.setMajor(parseInt(e.target.value))}}/> 컴퓨터정보통신공학전공</div>
      </div>
      <div>
        <p>전공유형</p>
        <div className="radio">
          <div><input type="radio" name="major-select" value="1" onClick={(e) => {props.setMajorType(parseInt(e.target.value))}}/> <span>주전공</span></div>
          <div><input type="radio" name="major-select" value="2" onClick={(e) => {props.setMajorType(parseInt(e.target.value))}}/> <span>복수전공</span></div>
          <div><input type="radio" name="major-select" value="3" onClick={(e) => {props.setMajorType(parseInt(e.target.value))}}/> <span>부전공</span></div>
        </div>
      </div>
   </div>
  )
}

function CreditInfo(props) {

  function update(i, value) {
    let copy = [...props.credit]; 
    value = parseInt(value, 10);
    copy[i] = value;
    props.setCredit(copy);
  }

  return (
    <>
      <div className="text-box mt-4">
        <h5>이수학점 입력</h5>
      </div>
      <div className="input-container">
        <Row>
          <Col><p>기초교양</p><input type="number" className="credit-input" onChange={(e) => { update(0, e.target.value)}}/></Col>
          <Col><p>균형교양</p><input type="number" className="credit-input" onChange={(e) => { update(1, e.target.value)}}/></Col>
        </Row>
        <Row className="mt-4">
          <Col><p>학문기초</p><input type="number" className="credit-input" onChange={(e) => { update(2, e.target.value)}}/></Col>
          <Col><p>전공필수</p><input type="number" className="credit-input" onChange={(e) => { update(3, e.target.value)}}/></Col>
        </Row>
        <Row className="mt-4">
          <Col><p>전공선택</p><input type="number" className="credit-input" onChange={(e) => { update(4, e.target.value)}}/></Col>
          <Col><p>자유선택</p><input type="number" className="credit-input" onChange={(e) => { update(6, e.target.value)}}/></Col>
        </Row>
      </div>
      <div className="text-box mt-5">
        <h6 className="mt-4">이수학점 확인 방법</h6>
        <h6>
          K클라우드 로그인(<a href="https://kcloud.kangwon.ac.kr" target="_blank" rel="noopener noreferrer">https://kcloud.kangwon.ac.kr</a>)<br/>
          학생정보조회 - 성적정보 - 성적확인부
        </h6>
      </div>
    </>
  )
}

function Checklist() {
  return (
    <>
      <div className="radio">
        <p>캡스톤프로젝트 참여 여부</p>
        <div></div>
      </div>
    </>
  )
}

export default InputForm;
