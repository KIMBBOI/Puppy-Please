import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const StyledMyPageSidebarDiv = styled.div`
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
`;



const MyPageMainSidebar = () => {
    return (
        <StyledMyPageSidebarDiv>
            <div>마이페이지</div>
            <div><Link to="/member/mypage/memberInfoEdit">회원정보수정</Link></div>
            <div><Link to="/member/mypage/memberQuit">회원 탈퇴</Link></div>
            <div><Link to="/member/mypage/MemberAdoptList">입양신청내역</Link></div>
        </StyledMyPageSidebarDiv>
    );
};

export default MyPageMainSidebar;