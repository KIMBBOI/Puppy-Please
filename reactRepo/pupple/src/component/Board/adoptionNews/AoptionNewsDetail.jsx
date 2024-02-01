import React from 'react';
import styled from 'styled-components';
import AoptionNewsDetailItem from './AoptionNewsDetailItem';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledNewsDetailDiv = styled.div`
    width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    padding: 30px 0 30px 0;

    
    div:nth-child(1) {
        margin: 12px 150px 20px ;
        font-size: 24px;
        text-align: start;
        color: #333;
    }

    button{
        width: 89px;
        height: 34px;
        font-size: 13.5px;
        font-weight: 550;
        border: none;
        border-radius: 20px;
        margin-top: 50px;
        color: #ffffff;
        background-color: #c8adffdd;
        cursor: pointer;

    }
`;

const AoptionNewsDetail = () => {

    const location = useLocation();
    let vo = location.state.vo;

    const handleReturnList = () => {
        navigate(-1);
    }

    const navigate = useNavigate();


    return (
        <StyledNewsDetailDiv>
            <>
                <div>입양후 소식</div>
                {vo ? (
                    <AoptionNewsDetailItem key={vo.newsAfterAdoptionNo} vo={vo} />
                ) : (
                    <div>로딩중</div>
                )}
                <button onClick={handleReturnList}>글 목록</button>
            </>
        </StyledNewsDetailDiv>
    );
};

export default AoptionNewsDetail;