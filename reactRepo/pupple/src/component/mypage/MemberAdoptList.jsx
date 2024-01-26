/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberAdoptList = styled.div`
  width: 100%;
 h2 {
        font-size: 24px;
        margin-bottom: 20px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    table, th, td {
        border: 1px solid #ddd;
    }

    th, td {
        padding: 10px;
        text-align: left;
    }

    tr {
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #f5f5f5;
        }
    }

    p {
        font-size: 16px;
        margin-top: 10px;
    }
`;

const MemberAdoptList = () => {
    const navigate = useNavigate();
    const [adoptData, setAdoptData] = useState();
    const [surveyData, setSurveyData] = useState();
    const memberNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).memberNo;

    useEffect( () => {
        const fetchApplyAndSurveyData = () => {
            fetch(`http://127.0.0.1:8080/app/member/mypage/memberAdoptList?memberNo=${memberNo}`)
            .then( resp => resp.json())
            .then( data => {
                setAdoptData(data.adoptList);
                setSurveyData(data.surveyList);
                console.log(surveyData);
            })
        }
        fetchApplyAndSurveyData();
        
    }, [memberNo]);

    const handleDetailAdopt = (selectedAdopt, selectedSurveyData) => {
      navigate("adoptDetail", {state: {selectedAdopt, selectedSurveyData}})
    };
    return (
        <StyledMemberAdoptList>
          <h2>입양신청내역</h2>
          {adoptData &&
           adoptData.length > 0 ? (
            <table>
              <tbody>
                {adoptData.map((item, index) => (
                  <tr key={index} onClick={() => handleDetailAdopt(item, surveyData[index])}>
                    <td>{item.enrollDate}</td>
                    <td>{item.dogName}</td>
                    <td>입양신청서</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>데이터가 없습니다.</p>
          )}
        </StyledMemberAdoptList>
      );
      
};

export default MemberAdoptList;
