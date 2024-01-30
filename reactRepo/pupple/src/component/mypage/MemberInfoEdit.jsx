import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../PuppleContext';
import styled from 'styled-components';

const StyledMemberInfoEditDiv = styled.div`
  margin-bottom: 100px;
`;

const Form = styled.form`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const InputRow = styled.tr`
  & > td {
    padding: 10px;
    text-align: center; 
  }
`;

const Input = styled.input`
  width: 300px; 
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
`;
const ErrorMsg = styled.span`
  color: red;
  font-size: 12px; 
  font-weight: bold;
  margin-top: 5px;
  display: block;
`;
const SubmitButton = styled.input`
  width: 100%;
  padding: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #C8ADFF;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #A080FF;
  }
`;
const MemberInfoEdit = () => {
  const navigate = useNavigate();
  const jsonStr = sessionStorage.getItem("loginMemberVo");
  const sessionLoginMemberVo = JSON.parse(jsonStr);
  
  const [isFetching, setIsFetching] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [vo, setVo] = useState({
    memberNo: undefined, // 초기에 비어있는 값
    pwd: undefined,
    pwd2: undefined,
    nick: undefined,
    phoneNumber: undefined,
    email: undefined,
    birthday: undefined,
  });

  // 사용자의 이전 정보를 저장하는 상태
  const [originalInfo, setOriginalInfo] = useState({});

  // 컴포넌트 마운트 시 세션 스토리지에서 사용자 정보를 가져와 상태를 설정
  useEffect(() => {
    const loginMemberVo = JSON.parse(sessionStorage.getItem('loginMemberVo'));
    if (loginMemberVo) {
      setVo(v => ({ ...v, memberNo: loginMemberVo.memberNo }));
      setOriginalInfo({
        nick: loginMemberVo.nick,
        phoneNumber: loginMemberVo.phoneNumber,
        email: loginMemberVo.email,
        birthday: loginMemberVo.birthday,
      });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVo({
      ...vo,
      [name]: value,
    });
  };
  const [loginMemberVo, setLoginMemberVo] = useState(sessionLoginMemberVo);
  const {login} = useAuth(loginMemberVo);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (isFetching) {
      return;
    }

    setIsFetching(true);
    const updatedFields = {};

    if (vo.pwd !== vo.pwd2) {
      setPasswordMatchError(true);
      setIsFetching(false);
      return;
    }

    if (vo.nick !== originalInfo.nick) {
      updatedFields.nick = vo.nick;
    }

    if (vo.phoneNumber !== originalInfo.phoneNumber) {
      updatedFields.phoneNumber = vo.phoneNumber;
    }

    if(vo.email !== originalInfo.email) {
    updatedFields.email = vo.email;
    }
    if (vo.birthday !== originalInfo.birthday) {
      updatedFields.birthday = vo.birthday;
    }

    if (Object.keys(updatedFields).length === 0) {
      setIsFetching(false);
      return;
    }

    const requestBody = {
      ...vo,
      ...updatedFields,
      memberNo: vo.memberNo
    };
    const updateSessionInfo = (vo) => {
      
      fetch('http://127.0.0.1:8080/app/member/mypage/updateProfile', {
        method: 'post',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(vo),
      })
      .then( resp => {return resp.json()})
      .then( (data) => {
        if(data.msg === "update success"){
          sessionStorage.setItem("loginMemberVo", JSON.stringify(data.loginMemberVo));
          setLoginMemberVo(data.loginMemberVo);
          login(data.loginMemberVo);
        }
      })
    }



fetch('http://127.0.0.1:8080/app/member/mypage/memberInfoEdit/', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestBody),
})
  .then((resp) => {
    if (!resp.ok) {
      throw new Error('회원정보수정 fetch 실패');
    }
    return resp.json();
  })
  .then((data) => {
    if (data.msg === 'good') {
      alert('회원정보수정 성공');
      updateSessionInfo(vo);
      navigate('/mypage');
    } else {
      alert('회원정보수정 실패');
    }
  })
  .catch((e) => {
    console.log(e);
    alert('회원정보 수정 실패');
  })

};

const handleComparePwd = () => {
if (vo.pwd !== vo.pwd2) {
setPasswordMatchError(true);
} else {
setPasswordMatchError(false);
}
};

return (
<StyledMemberInfoEditDiv>
<Form onSubmit={handleEditSubmit}>
        <Table>
          <tbody>
            <InputRow>
              <td>
                <Input
                  type="text"
                  name="memberNo"
                  value={vo.memberNo}
                  onChange={handleInputChange}
                  hidden
                />
              </td>
            </InputRow>
            <InputRow>
              <td>비밀번호</td>
              <td>
                <Input type="password" name="pwd" onChange={handleInputChange} />
              </td>
            </InputRow>
            <InputRow>
              <td>비밀번호 확인</td>
              <td>
                <Input
                  type="password"
                  name="pwd2"
                  value={vo.pwd2}
                  onChange={handleInputChange}
                  onBlur={handleComparePwd}
                />
                {passwordMatchError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
              </td>
            </InputRow>
            <InputRow>
              <td>닉네임</td>
              <td>
                <Input type="text" name="nick" onChange={handleInputChange} />
              </td>
            </InputRow>
            <InputRow>
              <td>전화번호</td>
              <td>
                <Input type="text" name="phoneNumber" onChange={handleInputChange} />
              </td>
            </InputRow>
            <InputRow>
              <td>이메일</td>
              <td>
                <Input type="email" name="email" onChange={handleInputChange} />
              </td>
            </InputRow>
            <InputRow>
              <td>생년월일</td>
              <td>
                <Input type="text" name="birthday" onChange={handleInputChange} />
              </td>
            </InputRow>
            <InputRow>
              <td colSpan="2">
                <SubmitButton type="submit" value="정보 수정" />
              </td>
            </InputRow>
          </tbody>
        </Table>
</Form>
</StyledMemberInfoEditDiv>
);
};

export default MemberInfoEdit;

