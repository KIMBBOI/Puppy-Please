import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../PuppleContext';

const StyledMemberQuitDiv = styled.div`

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
    text-align: center; /* 가운데 정렬을 위한 스타일 */
  }
`;

const Input = styled.input`
  width: 300px; /* 너비를 300px로 조정 */
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
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
const ErrorMsg = styled.span`
  color: red;
  font-size: 12px; /* 폰트 크기를 원하는 크기로 조정하세요 */
  font-weight: bold;
  margin-top: 5px;
  display: block;
`;
const MemberQuit = () => {
    const {logout} = useAuth();

    const navigate = useNavigate();
    let [isFetching, setIsFetching] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    
    const loginMemberVo = JSON.parse(sessionStorage.getItem("loginMemberVo"));

    const [vo, setVo] = useState({
        id:loginMemberVo.id, pwd:'', pwd2:''
    });
    
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        if(name === 'pwd2'){
            setPasswordMatchError(value !== vo.pwd);
        }
        
        setVo({
            ...vo,
            [name]: value
        });
    }

    const handleQuitSubmit = (event) => {
    
        event.preventDefault();
    
        if(isFetching){
            return;
        }

        setIsFetching(true);
        if(vo.pwd !== vo.pwd2){
            setPasswordMatchError(true);
            setIsFetching(false);
            return;
        }

        fetch("http://127.0.0.1:8080/app/member/mypage/memberQuit", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
        },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json())
        .then((data) => {
            if(data.msg === "good"){
                alert("회원 탈퇴 성공");
                logout();
                navigate("/");
            }else{
                alert("회원 탈퇴 실패")
                navigate("/quit");
            }
        })
        .finally( () => {
            isFetching = false;
        })
        ;
    }
    const handleComparePwd = () => {
        if (vo.pwd !== vo.pwd2) {
          setPasswordMatchError(true);
        } else {
          setPasswordMatchError(false);
        }
      };
    
    return (
        <StyledMemberQuitDiv>
            <Form onSubmit={handleQuitSubmit}>
                <Table>
                    <tbody>
                        <InputRow>
                            <td>회원 이름</td>
                            <td><Input type="text" name="name" placeholder={loginMemberVo.name} disabled/></td>
                        </InputRow>
                        <InputRow>
                            <td>닉네임</td>
                            <td><Input type="text" name="nick" placeholder={loginMemberVo.nick} disabled/></td>
                        </InputRow>
                        <InputRow>
                            <td>회원ID</td>
                            <td><Input type="text" name="id" placeholder={loginMemberVo.id} disabled/></td>
                        </InputRow>
                        <InputRow>
                            <td>비밀번호</td>
                            <td><Input type="password" name="pwd" onChange={handleInputChange}/></td>
                        </InputRow>
                        <InputRow>
                            <td>비밀번호 확인</td>
                            <td><Input type="password" name="pwd2" onChange={handleInputChange} onBlur={handleComparePwd}/>
                            {passwordMatchError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}</td>
                        </InputRow>
                        <InputRow>
                            <td>생년월일</td>
                            <td><Input type="text" name="birthday" placeholder={loginMemberVo.birthday} disabled/></td>
                        </InputRow>
                        <InputRow>
                            <td>휴대폰 번호</td>
                            <td><Input type="text" name="phoneNumber" placeholder={loginMemberVo.phoneNumber} disabled/></td>
                        </InputRow>
                        <InputRow>
                            <td>이메일</td>
                            <td><Input type="text" name="email" placeholder={loginMemberVo.email} disabled/></td>
                        </InputRow>
                        <InputRow>
                            <td rowSpan={2}><SubmitButton type="submit" value="회원탈퇴"/></td>
                        </InputRow>
                    </tbody>

                </Table>

            </Form>
        </StyledMemberQuitDiv>
    );
};

export default MemberQuit;