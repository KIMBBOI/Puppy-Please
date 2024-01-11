import React, { useState } from 'react';
import styled from 'styled-components';
import KakaoLogin from './KakaoLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const StyledMemberLogin = styled.div`
  // 여기에 스타일을 추가하세요
`;


const MemberLogin = () => {
  const navigate = useNavigate();
  
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
        console.log(data.loginMemberVo);
        console.log(loginMemberVo);
        console.log("sessionLoginMemberVo : " + sessionLoginMemberVo)
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
    <StyledMemberLogin>
      <div>
        <h1>로그인</h1>
      </div>
      <form onSubmit={handleLoginClick}>
        <table>
          <tbody>
            <tr>
              <td><input type="text" name="id" onChange={handleInputChange} placeholder='아이디'/></td>
            </tr>
            <tr>
              <td><input type="password" name="pwd" onChange={handleInputChange} placeholder='비밀번호' /></td>
            </tr>
            <tr>
              <td><button type="submit">로그인</button><button onClick={ handleJoinButton }>회원가입</button></td>
            </tr>
            <tr><button onClick={handleSearchButton}>아이디/비밀번호 찾기</button></tr>          
          </tbody>
        </table>
        
        
      </form>
      <hr />
      <KakaoLogin />
    </StyledMemberLogin>
  );
};

export default MemberLogin;
