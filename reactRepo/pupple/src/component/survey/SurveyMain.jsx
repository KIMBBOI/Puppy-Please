import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledSurveyDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SurveyForm = styled.form`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;

  & table {
    width: 100%;
    border-collapse: collapse;
  }

  & td {
    padding: 10px;
  }

  & span {
    font-weight: bold;
  }

  & input[type="text"] {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
  }

  & input[type="submit"] {
    width: 100%;
    padding: 10px 0;
    background-color: #5C6BC0;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  & input[type="submit"]:hover {
    background-color: #3F51B5;
  }
`;




const SurveyMain = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const rescueDogVo = location.state?.vo;
    const loginMemberVo = JSON.parse(sessionStorage.getItem('loginMemberVo'));

    const [vo, setVo] = useState({
       memberNo: loginMemberVo.memberNo, rescueDogNo: rescueDogVo.rescueDogNo, residence: '', maritalStatusYn: '', job: '', housingType: ''
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setVo({
            ...vo,
            [name] : value
        });
    }
    const handleSurveySubmit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8080/app/board/adoption/survey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vo)
        })
        .then( resp => {return resp.json();})
        .then(data => {
            if(data.msg === "good"){
                alert("설문 작성 완료! 퀴즈를 진행해 주세요")
                navigate("/board/adoption/quiz", {state: {rescueDogVo}})
            }else{
                alert("설문 작성 실패!")
                navigate("/adoption/survey")
            }
        })

    }

    return (
        <StyledSurveyDiv>
          <SurveyForm onSubmit={handleSurveySubmit}>
            <h2>입양 전 설문조사</h2>
            <table>
              <tbody>
                <tr>
                  <td><input type="text" name="rescueDogNo" onChange={handleInputChange} hidden /></td>
                </tr>
                <tr>
                  <td><span>거주지(시, 군, 구)를 작성해 주세요</span></td>
                  <td><input type="text" name="residence" onChange={handleInputChange} placeholder='거주지'/></td>
                </tr>
                <tr>
                  <td><span>결혼 여부를 작성해 주세요</span></td>
                  <td><input type="text" name="maritalStatusYn" onChange={handleInputChange} placeholder='Y : 기혼, N : 미혼' /></td>
                </tr>
                <tr>
                  <td><span>직업을 작성해 주세요</span></td>
                  <td><input type="text" name="job" onChange={handleInputChange} placeholder='직업' /></td>
                </tr>
                <tr>
                  <td><span>주거형태를 작성해 주세요</span></td>
                  <td><input type="text" name="housingType" onChange={handleInputChange} placeholder='주거형태' /></td>
                </tr>
                <tr>
                  <td colSpan="2"><input type="submit" value="제출하기" /></td>
                </tr>
              </tbody>
            </table>
          </SurveyForm>
        </StyledSurveyDiv>
      );
};

export default SurveyMain;