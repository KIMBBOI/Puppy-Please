import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminPageMainSidebar from './AdminPageMainSidebar';
const StyledAdminAdoptList = styled.div`
    display: flex;
    justify-content: center; /* 가로 가운데 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    justify-content: space-evenly
`;

const TableContainer = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 컨텐츠 세로 가운데 정렬 */
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
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
    text-align: left;
`;

const NoDataMessage = styled.p`
    font-size: 16px;
    margin-top: 10px;
`;

const AdminAdoptList = () => {
    const navigate = useNavigate();
    const [adoptData, setAdoptData] = useState();
    const [surveyData, setSurveyData] = useState();
    
    console.log(adoptData);
    console.log(surveyData);
    
    useEffect(() => {
        const fetchApplyAndSurveyData = () => {
            fetch('http://127.0.0.1:8080/app/admin/adoptList')
            .then(resp => resp.json())
            .then( data => {
                console.log(data);
                setAdoptData(data.adoptList);
                setSurveyData(data.surveyList);
            })
        }
        fetchApplyAndSurveyData();
        
    }, [])
    const handleDetailAdopt = (selectedAdopt, selectedSurveyData) => {
        navigate("adoptDetail", {state: {selectedAdopt, selectedSurveyData}})
    };
    return (
        <>
        <AdminPageMainSidebar />
        <StyledAdminAdoptList>
        <TableContainer>
                <h2>입양신청목록</h2>
                {adoptData && adoptData.length > 0 ? (
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
                                    <TableCell>{item.dogNo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </StyledTable>
                ) : (
                    <NoDataMessage>데이터가 없습니다.</NoDataMessage>
                )}
            </TableContainer>
        </StyledAdminAdoptList>
        </>
    );
};



export default AdminAdoptList;

