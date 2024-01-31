import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';
import AoptionOkDetailItem from './AoptionOkDetailItem';

const StyledAdoptionOkDetailDiv = styled.div`
    width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    padding: 30px 0 30px 0;

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

const AdoptionOkDetail = () => {

    const navigate = useNavigate();
    const location = useLocation();
    let vo = location.state.vo;

    const handleReturnList = () => {
        navigate(-1);
    }

    return (
        <StyledAdoptionOkDetailDiv>
            {vo ? (
                <AoptionOkDetailItem key={vo.adoptionBoardNo} vo={vo} />
            ) : (
                <div>로딩중</div>
            )}
            <button onClick={handleReturnList}>글 목록</button>
        </StyledAdoptionOkDetailDiv>
    );
};

export default AdoptionOkDetail;