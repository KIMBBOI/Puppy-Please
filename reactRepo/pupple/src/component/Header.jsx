import React from 'react';
import styled from 'styled-components';
import projectName from './img/projectName.png'
import projectlogo from './img/projectlogo.png'
import { Link } from 'react-router-dom';
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
    return (
        <StyledHeaderDiv>
        <div className='logo'></div>
        <div className='logoArea'></div>
        <div className='loginArea'>
            <div><Link to="/member/login">로그인</Link></div>
            <div>|</div>
            <div><Link to="/member/join">회원가입</Link></div>
        </div>
        </StyledHeaderDiv>
    );
};

export default Header;