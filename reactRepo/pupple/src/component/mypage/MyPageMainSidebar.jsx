import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    .myReservation:hover {
        cursor: pointer;
        color: #555;
    }
`;



const MyPageMainSidebar = () => {
    const navigate = useNavigate();



    // 예약했는지 확인
    const handleReservationCheck = () => {
        const str = sessionStorage.getItem("loginMemberVo");
        const sessionVo = JSON.parse(str);
        const memberNo = sessionVo.memberNo;

        fetch(`http://127.0.0.1:8080/app/visit?memberNo=${memberNo}` , {
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "success"){
                const myPageBeforeVo = data.dbVo;
                const myPagefromSidebar = 'true';
                navigate("/member/mypage/memberReservationInfo", {state: {myPageBeforeVo, myPagefromSidebar}})
            } else {
                alert("예약 내역이 없습니다.");
            }
        } )
    }

    


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
                <Link to="/member/mypage/memberAdoptList">입양신청내역</Link>
            </SidebarItem>
            <SidebarItem>
                <div className='myReservation' onClick={handleReservationCheck}>방문예약내역</div>
            </SidebarItem>
        </StyledMyPageSidebarDiv>
    );
};

export default MyPageMainSidebar;