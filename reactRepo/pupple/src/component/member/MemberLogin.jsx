import React, { useState } from 'react';
import styled from 'styled-components';
import KakaoLogin from './KakaoLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../PuppleContext';

const StyledMemberLoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;

  & h1 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center; /* 가운데 정렬 추가 */
  }

  & form {
    background: white;
    width: 100%;
    max-width: 400px;
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
  & input[type="button"] {
    background-color: #C8ADFF; 
    color: white; 
    padding: 12px 20px; 
    margin: 5px 0; 
    border: none;
    border-radius: 5px; 
    font-size: 16px; 
    font-weight: bold;
    cursor: pointer; 
    transition: background-color 0.3s, box-shadow 0.3s; 
    float: right;
    clear: both;
    display: block;
  }

  & input[type="button"]:hover {
    background-color: #A080FF; 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
  }
  
`;

const CenteredButtonContainer = styled.div`
  text-align: center;
`;

const MemberLogin = () => {


  const navigate = useNavigate();
  const { login } = useAuth();
  const jsonStr = sessionStorage.getItem("loginMemberVo");
  const sessionLoginMemberVo = JSON.parse(jsonStr);
  const [loginMemberVo, setLoginMemberVo] = useState(sessionLoginMemberVo);
  const [vo, setVo] = useState();

  useEffect(() => {
    console.log("로그인 상태 업데이트: ", loginMemberVo);
  }, [loginMemberVo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVo({
      ...vo,
      [name]: value,
    });
  };

  const handleLoginClick = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:8080/app/member/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vo),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        if (data.msg === "login success") {
          alert("로그인 성공!");
          sessionStorage.setItem(
            "loginMemberVo",
            JSON.stringify(data.loginMemberVo)
          );
          setLoginMemberVo(data.loginMemberVo);
          login(data.loginMemberVo);
        } else {
          alert("로그인 실패!");
        }
      })
      .catch((e) => {
        console.log(e);
      })
      
    navigate("/");
  };

  const handleJoinButton = (e) => {
    navigate("/member/join");
  };

  const handleSearchButton = () => {
    navigate("/member/search");
  };
  const handleAdminLogin = () => {
    navigate("/admin/login");
  }
  return (
    loginMemberVo ?(
      alert("이미 로그인 했습니다.")
    ):(


      <StyledMemberLoginDiv>
      <form onSubmit={handleLoginClick}>
        <table>
          <tbody>
            <tr>
              <td>
                <h1>로그인</h1>
              </td>
            </tr>
            <tr>
              <td><input type="button" onClick={handleAdminLogin} value={'관리자'} /></td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="id"
                  onChange={handleInputChange}
                  placeholder="아이디"
                  />
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="password"
                  name="pwd"
                  onChange={handleInputChange}
                  placeholder="비밀번호"
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type="submit">로그인</button>
              </td>
            </tr>
          </tbody>
        </table>
        <CenteredButtonContainer>
          <button onClick={handleJoinButton}>회원가입</button>
          <button onClick={handleSearchButton}>아이디/비밀번호 찾기</button>
        </CenteredButtonContainer>
      </form>
      <hr />
      {/* <KakaoLogin /> */}
    </StyledMemberLoginDiv>
    )

  );
};

export default MemberLogin;
