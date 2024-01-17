import React, { useState } from 'react';
import styled from 'styled-components';
import KakaoLogin from './KakaoLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../PuppleContext'

const StyledMemberLoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;

  & h1 {
    font-size: 24px; /* 제목 글꼴 크기 설정 */
    margin-bottom: 20px;
  }

  & form {
    background: white;
    width: 100%;
    max-width: 400px; /* 폼 요소의 최대 너비 설정 */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  & table {
    width: 100%;
    border-collapse: collapse;
  }

  & input[type="text"],
  & input[type="password"] {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }

  & button[type="submit"],
  & button {
    width: 100%;
    padding: 12px 0;
    border: none;
    border-radius: 5px;
    background-color: #C8ADFF;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
  }

  & button[type="submit"]:hover,
  & button:hover {
    background-color: #A080FF;
  }
`;

const MemberLogin = () => {
  const navigate = useNavigate();
  

  const {login} = useAuth();


  const jsonStr = sessionStorage.getItem("loginMemberVo");
  const sessionLoginMemberVo = JSON.parse(jsonStr);
  const [loginMemberVo, setLoginMemberVo] = useState(sessionLoginMemberVo);
  
  const [vo, setVo] = useState();
  
  useEffect( () => {
    console.log("로그인 상태 업데이트: ", loginMemberVo);
  }, [loginMemberVo]);
  

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setVo({
      ...vo,
      [name]: value
    });
  }
  
  const handleLoginClick = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/app/member/login", {
      method: "post",
      headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(vo)
    })
    .then( (resp) => {return resp.json()})
    .then( (data) => {
      if(data.msg === "login success"){
        alert("로그인 성공!");

        sessionStorage.setItem("loginMemberVo", JSON.stringify(data.loginMemberVo));
        
        console.log("getItem 결과:" ,sessionStorage.getItem("loginMemberVo"));
        
        setLoginMemberVo(data.loginMemberVo);
        login(data.loginMemberVo);
        console.log(data.loginMemberVo);
        console.log(loginMemberVo);
        console.log("sessionLoginMemberVo : " + loginMemberVo)
      }else{
        alert("로그인 실패!");
      }
      
    })
    .catch( (e) => {console.log(e);})
    
    .finally( () => {console.log("login fetch end~");})
    ;
    
    
    // 예: 서버에 로그인 요청을 보내고, 성공 시 다른 페이지로 이동
    console.log("로그인 시도: ", loginMemberVo);
    // navigate('/some-path'); // 로그인 성공 후 이동할 경로
    navigate("/")
  };
  
  
  const handleJoinButton = (e) => {
    
    navigate('/member/join')
  }
  
  const handleSearchButton = () => {
    navigate('/member/search');
  }
    return (
    <StyledMemberLoginDiv>
      <form onSubmit={handleLoginClick}>
        <table>
          <tbody>
            <div>
              <h1>로그인</h1>
            </div>
            <tr>
              <td><input type="text" name="id" onChange={handleInputChange} placeholder='아이디'/></td>
            </tr>
            <tr>
              <td><input type="password" name="pwd" onChange={handleInputChange} placeholder='비밀번호' /></td>
            </tr>
            <tr>
              <td><button type="submit">로그인</button></td>
            </tr>
            <tr>
              <td><button onClick={ handleJoinButton }>회원가입</button></td>
            </tr>
            <tr>
              <td><button onClick={handleSearchButton}>아이디/비밀번호 찾기</button></td>
            </tr>          
          </tbody>
        </table>
        
        
      </form>
      <hr />
      <KakaoLogin />
    </StyledMemberLoginDiv>
  );


};

export default MemberLogin;
