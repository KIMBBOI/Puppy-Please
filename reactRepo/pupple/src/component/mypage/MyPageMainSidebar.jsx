import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledMyPageSidebarDiv = styled.div`
    width: 250px;
    height: 500px;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
    align-items: center;
`;

const SidebarItem = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  a {
    text-decoration: none;
    color: #333;

    &:hover {
      color: #555;
    }
}
`;




const MyPageMainSidebar = () => {
    return (
        <StyledMyPageSidebarDiv>
            <SidebarItem>마이페이지</SidebarItem>
            <SidebarItem>
                    <Link to="/member/mypage/memberInfoEdit">회원정보수정</Link>
            </SidebarItem>
            <SidebarItem>
                    <Link to="/member/mypage/memberQuit">회원 탈퇴</Link>
            </SidebarItem>
            <SidebarItem>
                <Link to="/member/mypage/MemberAdoptList">입양신청내역</Link>
            </SidebarItem>
        </StyledMyPageSidebarDiv>
    );
};

export default MyPageMainSidebar;