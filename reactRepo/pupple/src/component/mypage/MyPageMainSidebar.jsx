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
    // 예약했는지 검사
    const navigate = useNavigate();
    // const statusVo 




    const handle = () => {
        const str = sessionStorage.getItem("loginMemberVo");
        const sessionVo = JSON.parse(str);
        const memberNo = sessionVo.memberNo;

        fetch(`http://127.0.0.1:8080/app/visit?memberNo=${memberNo}` , {
        })
        .then( resp => resp.json() )
        .then( data => {
            console.log('data :::',data);
            if(data.msg === "success"){
                let vo = data.dbVo;
                const fromSidebar = true
                console.log('vo :::',vo);
                navigate("/member/mypage/memberReservation", {state: {vo, fromSidebar}})
            } else {
                alert("예약 내역이 없습니다.");
                navigate("/");
            }
        } )
        ;
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
                <Link to="/member/mypage/MemberAdoptList">입양신청내역</Link>
            </SidebarItem>
            <SidebarItem>
                <div className='myReservation' onClick={handle}>방문예약내역</div>
            </SidebarItem>
        </StyledMyPageSidebarDiv>
    );
};

export default MyPageMainSidebar;