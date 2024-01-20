import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AoptionDetailItem from './AoptionDetailItem';

const StyledAdoptionDetailDiv = styled.div`
    width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    padding: 30px 0 30px 0;
`;

const AdoptionDetail = () => {

    const location = useLocation();
    let vo = location.state.vo;

    // 현재 사용자 정보 (예: 로그인한 사용자 정보)를 가져오는 함수
    const getCurrentAdmin = () => {
        // 현재 사용자 정보를 가져오는 로직을 추가하세요.
        // 예: 로그인 상태에 따라 서버에서 사용자 정보를 가져올 수 있습니다.
    };

    const currentAdmin = getCurrentAdmin();

    const handleEdit = () => {
        // 수정 버튼 클릭 시 실행되는 로직을 추가하세요.
    };

    const handleDelete = () => {
        // 삭제 버튼 클릭 시 실행되는 로직을 추가하세요.
    };

    // 현재 사용자가 작성자인지 확인
    const isAdmin = currentAdmin && currentAdmin.AdminNo === vo.adminNo;

    return (
        <StyledAdoptionDetailDiv>
            {vo ? (
                <>
                    <AoptionDetailItem key={vo.adoptionBoardNo} vo={vo} />
                    {isAdmin && (
                        <>
                            <button onClick={handleEdit}>수정</button>
                            <button onClick={handleDelete}>삭제</button>
                        </>
                        )}
                </>
                ) : (
                    <div>로딩중</div>
            )}
        </StyledAdoptionDetailDiv>
    );
};

export default AdoptionDetail;