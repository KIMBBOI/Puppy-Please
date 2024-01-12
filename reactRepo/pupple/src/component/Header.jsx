import styled from 'styled-components';
import projectName from './img/projectName.png'
import projectlogo from './img/projectlogo.png'

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './PuppleContext';

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

    }
    & > .loginArea{
        display: flex;
        justify-content: center;
    }
    
`;
    const StyledMemberDiv = styled.div`
      width: 100%;
      height: 100%;
    `;

const Header = () => {
    
    const {user, logout} = useAuth();
    
    const [loginMemberVo, setLoginMemberVo] = useState(null);
    useEffect(() => {
        const loginMemberStr = sessionStorage.getItem("loginMemberVo")
        setLoginMemberVo(JSON.parse(loginMemberStr));
    },[])
    console.log(loginMemberVo)
    const navigate = useNavigate();
    const handleClickJoin = () => {
        navigate("/member/join");
     };
    const handleClickLogin =() => {
        navigate("/member/login");
    };
    const handleClickMypage = () => {
        navigate("/member/mypage");
    }
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        logout();
        navigate("/");
    }
    console.log(loginMemberVo);
    return (
        
        <StyledHeaderDiv>
            <div className='logo' onClick={ () => {navigate("/")} }></div>
            <div className='logoArea' onClick={ () => {navigate("/")} }></div>
            {
                    user
                ?
                <div>
                    <h3>{user.nick}님 환영합니다.</h3>
                    <div onClick={handleClickMypage}>마이페이지</div>
                    <div onClick={handleLogout}>로그아웃</div>
                </div>
                :
                <StyledMemberDiv>
                <div className='loginArea'>
                <div onClick={ handleClickLogin }> 로그인</div>
                <div onClick={ handleClickJoin }>회원가입</div>
                </div>
                </StyledMemberDiv>
            }
        </StyledHeaderDiv>
    );
};

export default Header;