import React from 'react';
import styled from 'styled-components';
import projectName from './img/projectName.png'
import projectlogo from './img/projectlogo.png'
import { Link, useNavigate } from 'react-router-dom';
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

const Header = () => {
    const navigate = useNavigate();
    const handleClickJoin = () => {
       navigate("/member/join");
    };
    return (
        <StyledHeaderDiv>
        <div className='logo' onClick={ () => {navigate("/")} }></div>
        <div className='logoArea' onClick={ () => {navigate("/")} }></div>
        <div className='loginArea'>
            <div><Link to='/member/login'>로그인</Link></div>
            <div>|</div>
            <div onClick={ handleClickJoin }>회원가입</div>
        </div>
        </StyledHeaderDiv>
    );
};

export default Header;