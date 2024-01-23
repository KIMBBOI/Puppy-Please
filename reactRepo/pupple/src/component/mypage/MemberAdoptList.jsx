/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledMemberAdoptList = styled.div`
`;

const MemberAdoptList = () => {
    const [applyData, setApplyData] = useState();
    const [surveyData, setSurveyData] = useState([]);
    
    const memberNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).memberNo;
    console.log(memberNo);
    useEffect( () => {
        const fetchApplyAndSurveyData = () => {
            fetch(`http://127.0.0.1:8080/app/member/mypage/memberAdoptList?memberNo=${memberNo}`)
            .then( resp => resp.json())
            .then( data => {
                
                console.log(data.adoptList);
                console.log(data.surveyList);
                setApplyData(data.applyList);
                setSurveyData(data.surveyList);
            })
        }
        fetchApplyAndSurveyData();
        
    }, [memberNo]);
    return (
        <StyledMemberAdoptList>
          <h2>입양신청내역</h2>
          {applyData && applyData.length > 0 ? (
            <table>
              <tbody>
                {applyData.map((item, index) => (
                  <tr key={index}>
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
