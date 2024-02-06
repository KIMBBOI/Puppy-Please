/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberAdoptList = styled.div`
 display: flex;
    justify-content: center; 
    align-items: center; 
    justify-content: space-evenly;
    width: 100%;
`;
const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
`;
const TableContainer = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; 
`;
const TableHeader = styled.thead`
    background-color: #A080FF;
    color: white;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    text-align: center;
`;

const NoDataMessage = styled.p`
    font-size: 16px;
    margin-top: 10px;
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
              if(data.msg === "list success"){
                setAdoptData(data.adoptList);
                setSurveyData(data.surveyList);
              }else{
                alert("입양신청목록 불러오기를 실패했습니다.");
              }
            })
        }
        fetchApplyAndSurveyData();
        
    }, [memberNo]);

    const handleDetailAdopt = (selectedAdopt, selectedSurveyData) => {
      navigate("adoptDetail", {state: {selectedAdopt, selectedSurveyData}})
    };
    return (
        <StyledMemberAdoptList>
          <TableContainer>
            <h2>입양신청내역</h2>
            {adoptData &&
            adoptData.length > 0 ? (
              <StyledTable>
                <TableHeader>
                    <tr>
                        <th>날짜</th>
                        <th>강아지 이름</th>
                        <th>신청서</th>
                        <th>승인여부</th>
                    </tr>
                </TableHeader>
                <TableBody>
                  {adoptData.map((item, index) => (
                    <TableRow key={index} onClick={() => handleDetailAdopt(item, surveyData[index])}>
                      <TableCell>{item.enrollDate}</TableCell>
                      <TableCell>{item.dogName}</TableCell>
                      <TableCell>입양신청서</TableCell>
                      <TableCell>
                          {item.approveYn === "Y" ? "승인" :
                          item.approveYn === "W" ? "대기중" :
                          item.approveYn === "N" ? "반려" : ""}                                        
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
            ) : (
              <NoDataMessage>데이터가 없습니다.</NoDataMessage>
            )}
          </TableContainer>
        </StyledMemberAdoptList>
      );
      
};

export default MemberAdoptList;
