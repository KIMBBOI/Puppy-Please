import styled from 'styled-components';
import projectName from './img/projectName.png'
import projectlogo from './img/projectlogo.png'

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAdminAuth, useAuth } from './PuppleContext';

const StyledHeaderDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    & > .logoArea {
       background-image : url(${projectName}); 
       background-repeat: no-repeat;
       background-size: 70%;
       background-position: center center;
    }
    & > .logo{
        background-image: url(${projectlogo});
        background-repeat: no-repeat;
        background-size: 25%;
        background-position-x: right;
        background-position-y: center;
        cursor: pointer;
    }
    & > .loginArea{
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #333;
        font-size: 16px;
      }
      h3 {
        margin-bottom: 10px;
    }
    div:not(.loginArea) {
        margin: 5px 0;
        padding: 10px 20px;
        color: black; /* 버튼 텍스트 색상 */
        cursor: pointer;
        transition: background-color 0.3s ease;

    }
`;
const StyledMemberDiv = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;

`;


    

const Header = () => {
    
    const {user, logout} = useAuth();
    const {admin, logoutAdmin} = useAdminAuth();
    
    const [loginMemberVo, setLoginMemberVo] = useState(null);
    const [loginAdminVo, setloginAdminVo] = useState(null);
    useEffect(() => {
        const loginMemberStr = sessionStorage.getItem("loginMemberVo")
        setLoginMemberVo(JSON.parse(loginMemberStr));
    },[]);

    useEffect(() => {
        const loginAdminStr = sessionStorage.getItem("loginAdminVo")
        setloginAdminVo(JSON.parse(loginAdminStr));
    }, []);
    

    console.log(loginMemberVo);
    console.log(loginAdminVo);
    const navigate = useNavigate();
    const handleClickJoin = () => {
        navigate("/member/join");
     };
    const handleClickLogin =() => {
        navigate("/member/login");
    };
    const handleClickMypage = () => {
        navigate("/member/mypage/memberInfoEdit");
    }
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        logout();
        navigate("/");
    }
    const AdminPage = () => {
      navigate("/admin/adoptList");
    }

    return (
        
        <StyledHeaderDiv>
            <div className='logo' onClick={ () => {navigate("/")} }></div>
            <div className='logoArea' onClick={ () => {navigate("/")} }></div>
            {user ? (
        <div>
          <h3>{user.nick}님 환영합니다.</h3>
          <div onClick={handleClickMypage}>마이페이지</div>
          <div onClick={handleLogout}>로그아웃</div>
        </div>
      ) : (
        <StyledMemberDiv>
          <div className='loginArea'>
            {admin ? (
              // 관리자로 로그인한 경우
              <div>
                <h3>관리자로 로그인되었습니다.</h3>
                <div onClick={AdminPage}>관리자 메뉴</div>
                <div onClick={logoutAdmin}>로그아웃</div>
              </div>
            ) : (
              // 일반 사용자인 경우
              <div>
                <div onClick={handleClickLogin}>로그인</div>
                <div onClick={handleClickJoin}>회원가입</div>
              </div>
            )}
          </div>
        </StyledMemberDiv>
      )}
        </StyledHeaderDiv>
    );
};

export default Header;