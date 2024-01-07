import React, { useState } from 'react';
import styled from 'styled-components';
import KakaoLogin from './KakaoLogin';
import { useNavigate } from 'react-router-dom';

const StyledMemberLogin = styled.div`
  // 여기에 스타일을 추가하세요
`;

const MemberLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // 여기에 로그인 로직을 추가하세요
    // 예: 서버에 로그인 요청을 보내고, 성공 시 다른 페이지로 이동
    console.log("로그인 시도: ", username, password);
    // navigate('/some-path'); // 로그인 성공 후 이동할 경로
    navigate('/')
  };

  return (
    <StyledMemberLogin>
      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">아이디:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <hr />
      <KakaoLogin />
    </StyledMemberLogin>
  );
};

export default MemberLogin;
