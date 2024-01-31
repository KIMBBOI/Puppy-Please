import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AoptionDetailItem from './AoptionDetailItem';

const StyledAdoptionDetailDiv = styled.div`
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

const AdoptionDetail = () => {

    const navigate = useNavigate();
    const location = useLocation();
    let vo = location.state.vo;

    // 입양완료 처리 함수
    const handleAdoptionComplete = () => {
        try {
            // 서버에 입양완료 상태를 업데이트하는 요청을 보냅니다.
            // 예: axios 또는 fetch를 사용하여 서버로 요청을 보냅니다.
            // 서버 응답을 기다리고, 성공하면 입양완료 게시판으로 이동합니다.
            // 서버 응답에 따라 적절한 처리를 해야 합니다.

            // 입양완료 상태 업데이트 완료 후 이동
            navigate('/board/adoptionOk/list');
        } catch (error) {
            // 오류 처리
            console.error('입양완료 처리 중 오류 발생: ', error);
        }
    };

    const handleReturnList = () => {
        navigate(-1);
    }

    return (
        <StyledAdoptionDetailDiv>
            <>
                {vo ? (
                    <AoptionDetailItem key={vo.adoptionBoardNo} vo={vo} onAdoptionComplete={handleAdoptionComplete} />
                ) : (
                    <div>로딩중</div>
                )}
                <button onClick={handleReturnList}>글 목록</button>
            </>
        </StyledAdoptionDetailDiv>
    );
};

export default AdoptionDetail;