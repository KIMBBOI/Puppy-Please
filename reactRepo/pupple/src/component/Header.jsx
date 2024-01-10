import styled from 'styled-components';
import projectName from './img/projectName.png'
import projectlogo from './img/projectlogo.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
    const navigate = useNavigate();
    const[loginMemberVo, setLoginMemberVo] = useState(null);
    
    useEffect(()=> {
        try{
            const loginMemberVoStr = sessionStorage.getItem("loginMemberVo");
            if(loginMemberVoStr) {
                setLoginMemberVo(JSON.parse(loginMemberVoStr));
            }
        }catch(error){
            console.error("Failed to parse loginMemberVo:", error);
        }

    }, []);
    const handleClickJoin = () => {
        navigate("/member/join");
     };
    const handleClickLogin =() => {
        navigate("/member/login");
    };
    return (
        <StyledHeaderDiv>
            <div className='logo' onClick={ () => {navigate("/")} }></div>
            <div className='logoArea' onClick={ () => {navigate("/")} }></div>
            {
                    loginMemberVo
                ?
                <div>
                    <h3>{loginMemberVo.nick}님 환영합니다.</h3>
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