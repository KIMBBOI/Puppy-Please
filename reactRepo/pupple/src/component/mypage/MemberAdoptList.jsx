/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledMemberAdoptList = styled.div`
`;

const MemberAdoptList = () => {
    const [applyData, setApplyData] = useState(null);
    const [surveyData, setSurveyData] = useState(null);

    const memberNo = JSON.parse(sessionStorage.getItem("loginMemberVo")).memberNo;
    console.log(memberNo);
    useEffect( () => {
        const fetchApplyData = () => {
            fetch(`http://127.0.0.1:8080/app/member/mypage/memberAdoptList?memberNo=${memberNo}`)
            .then( resp => resp.json())
            .then( data => {
                console.log(data.adoptList);
                setApplyData(data.applyList);
            })
        }
        // const fetchSurveyData = () => {
        //     fetch('http://127.0.0.1:8080/app/board/')
        //     .then( resp => resp.json())
        //     .then( (data) => {
        //         setSurveyData(data.surveyVo);
        //     })
        // }
        fetchApplyData();
        // fetchSurveyData();

        // console.log("surveyData : ", surveyData);
    }, [memberNo]);
    return (
        <StyledMemberAdoptList>
            <div>

            </div>
            
        </StyledMemberAdoptList>
    );
};

export default MemberAdoptList;
