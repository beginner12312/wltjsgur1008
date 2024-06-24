import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import '../styles/Result.css';

const ServerURL = 'http://localhost:8000';

const Result = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [textSelect, setTextSelect] = useState(3);
  const [result, setResult] = useState([]);
  const titleList = ["기초교양", "균형교양", "학문기초", "전공필수", "전공선택", "심화전공", "자유선택"];
  const require = [17, 15, 12, 9, 33, 27, 17]; // 실제 요구 학점 데이터를 설정해야 함

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ServerURL}/api/user/get-credits`, { withCredentials: true });
        setData(response.data);
        calculate(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user credits:', error);
        navigate('/login'); // Redirect to login if unauthorized
      }
    };
    fetchData();
  }, [navigate]);

  const calculate = (credits) => {
    let tempResult = [
      credits.basic_liberal_arts,
      credits.balanced_liberal_arts,
      credits.basic_studies,
      credits.major_required,
      credits.major_elective,
      0, // 심화전공 필드가 없으므로 0으로 설정
      credits.free_elective
    ];

    let overCredit = 0;

    // 교양 초과학점 계산
    for (let i = 0; i < 3; i++) {
      if (tempResult[i] > require[i]) {
        overCredit += tempResult[i] - require[i];
        tempResult[i] = require[i];
      }
    }
    // 교양 초과학점 -> 자선
    if (overCredit > 10) overCredit = 10;
    if (overCredit !== 0) tempResult[6] = tempResult[6] + overCredit;

    // 전공 초과학점 계산
    overCredit = 0;
    for (let i = 3; i < 6; i++) {
      // 전필, 전선 -> 심화
      if (i < 5) {
        if (tempResult[i] > require[i]) {
          overCredit += tempResult[i] - require[i];
          tempResult[i] = require[i];
        }
      } else {
        if (overCredit !== 0) tempResult[i] = tempResult[i] + overCredit;
        // 심화 초과학점 -> 자선
        overCredit = 0;
        if (tempResult[i] > require[i]) {
          overCredit += tempResult[i] - require[i];
          tempResult[i] = require[i];
        }
      }
    }

    if (overCredit !== 0) {
      tempResult[6] = tempResult[6] + overCredit;
    }

    if (tempResult[6] > require[6])
      tempResult[6] = require[6];

    setResult(tempResult);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="result-container">
      <div className="credit-info">
        <div className="result-box">
          <p>졸업학점</p>
          <table>
            <thead>
              <tr>
                <th>영역구분</th>
                <th>인정학점</th>
                <th>필요학점</th>
              </tr>
            </thead>
            <tbody>
              {result.map((data, i) => (
                <tr key={i}>
                  <td>{titleList[i]}</td>
                  <td className="user-credit">{data}</td>
                  <td>{require[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button variant="secondary" onClick={() => navigate('/inputform')}>수정</Button>
        </div>
      </div>
      <div className="other-info">
        <div className="info-radio">
          <h4>졸업요건</h4>
          <div>
            <input type="radio" name="text-select" value={1} onChange={() => setTextSelect(1)} /> 캡스톤디자인 과제 참여
          </div>
          <h5><br />졸업논문 유형(택1)</h5>
          <div><input type="radio" name="text-select" value={2} onChange={() => setTextSelect(2)} /> 산학협력프로젝트 결과보고서</div>
          <div><input type="radio" name="text-select" value={3} onChange={() => setTextSelect(3)} /> 정보처리기사 자격증</div>
          <div><input type="radio" name="text-select" value={4} onChange={() => setTextSelect(4)} /> 취업보고서</div>
          <div><input type="radio" name="text-select" value={5} onChange={() => setTextSelect(5)} /> 학술논문</div>
          <div><input type="radio" name="text-select" value={6} onChange={() => setTextSelect(6)} /> 졸업종합시험</div>

          {data.major === "컴퓨터공학과" && (
            <>
              <div><input type="radio" name="text-select" value={5} onChange={() => setTextSelect(5)} /> 학술논문</div>
              <div><input type="radio" name="text-select" value={6} onChange={() => setTextSelect(6)} /> 졸업종합시험</div>
            </>
          )}
          {data.major === "컴퓨터과학전공" && <div><input type="radio" name="text-select" value={6} onChange={() => setTextSelect(6)} /> 졸업종합시험</div>}
          {data.major === "컴퓨터정보통신공학전공" && <div><input type="radio" name="text-select" value={5} onChange={() => setTextSelect(5)} /> 학술논문</div>}
        </div>
        <div className="dark-box">
          {textSelect === 1 && <p>졸업 예정자는 졸업논문 통과 신청을 하기 위해 캡스톤디자인 과제를 수행하였거나 수행중이어야 한다.</p>}
          {textSelect === 2 && <p>산학협력프로젝트 결과보고서로 졸업논문을 통과하고자 하는 경우, 본인이 수행한 산학협력프로젝트 관련 주제로 개인별 보고서를 작성하여 제출해야 한다. 산학협력프로젝트 결과보고서는 지도교수의 심사를 통과한 후 졸업예정학기 종강 1주일 전까지 학과에 제출하여야 한다.</p>}
          {textSelect === 3 && <p>정보처리기사 자격을 취득하여 졸업종합시험 면제신청서를 제출하는 경우 졸업논문을 통과한 것으로 본다. 정보처리기사 자격 취득으로 졸업논문 통과 인정을 받고자 하는 경우, 졸업종합시험 면제신청서를 졸업예정학기 종강 1주일 전까지 학과에 제출하여야 한다.</p>}
          {textSelect === 4 && <p>졸업예정자 중 취업하여 3개월 이상 재직 중인 경우, 취업보고서를 제출하여 졸업논문 통과 신청을 할 수 있다. 취업보고서로 졸업논문 통과 인정을 받고자 하는 경우, 취업보고서를 작성하여 졸업예정학기 종강 14일 전까지 학과로 제출하며, 통과 여부는 학과장이 결정한다.</p>}
          {textSelect === 5 && <p>지도교수의 지도를 받아 한국연구재단등재후보지 이상 전공 분야 논문지에 출판하거나(출판확정 포함), 한국연구재단등재후보지 이상 논문지를 발행하는 전공분야 학회에서 주최하는 학술대회에서 공개 발표하는 경우 졸업논문 통과 신청을 할 수 있다. 단, 두 경우 모두 신청자가 제 1저자이어야 한다. 위의 논문으로 졸업논문 통과 신청을 하고자 하는 경우, 논문집 표지, 목차, 논문 사본을 졸업예정학기 종강 1주일 전까지 학과에 제출하여야 한다.</p>}
          {textSelect === 6 && <p>졸업종합시험은 학과 전임교원 3인 이상의 졸업시험관리위원회를 구성하여, 시험과목, 출제위원, 기타 세부 운영계획을 수립하고 시험일 30일 전까지 졸업예정자에게 공지하여야 한다. 졸업종합시험 성적은 100점 만점에 평균 60점 이상을 합격으로 하며, 40점 미만은 과락으로 한다.</p>}
        </div>
      </div>
    </div>
  );
}

export default Result;
