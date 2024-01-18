import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledJoinDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1f1f1; // 배경색
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


const MemberJoin = () => {
  
    const navigate = useNavigate();

    let [isFetching, setIsFetching] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);


    const [vo, setVo] = useState({
        id: '', pwd: '', pwd2: '', nick: '', name: '', phoneNumber: '', email: '', emailCheck: '', birthday: ''
    });
    const handleInputChange = (event) => {

        const {name, value} = event.target;
        if (name === 'pwd2') {
            setPasswordMatchError(value !== vo.pwd);
          }
        setVo({
            ...vo,
            [name] : value
        });

    };
    const handleJoinSubmit = (event) => {
        event.preventDefault();
        if(isFetching){
            return;
        }

        setIsFetching(true);
        if (vo.pwd !== vo.pwd2) {
            setPasswordMatchError(true);
            setIsFetching(false); // Reset isFetching state
            return;
          }
        fetch("http://127.0.0.1:8080/app/member/join", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vo) 
        })
        .then( resp => {
            if(!resp.ok){
                throw new Error("회원가입 fetch실패..");
            }
            return resp.json();
        })
        .then(data => {
            if( data.msg === "good"){
                alert("회원가입 성공");
                navigate("/")
            }else{
                alert("회원가입 실패");
                navigate("/join")
            }
        })
        .catch( (e) => {
            console.log(e);
            alert("회원가입 실패");
        })
        .finally( () => {
            isFetching = false;
        })
        ;
    };
    const handleComparePwd = () => {
        if (vo.pwd !== vo.pwd2) {
          setPasswordMatchError(true);
        } else {
          setPasswordMatchError(false);
        }
      };
      
      const handleMailSend = (event) => {
        event.preventDefault();
        
        fetch('http://127.0.0.1:8080/app/member/join/mailSend', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: vo.email})
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.msg === 'good') {
              alert('인증번호를 전송했습니다.');
            } else {
              alert('인증번호 전송에 실패했습니다.');
            }
          });
      };
    
    const handleMailCheck = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8080/app/member/join/mailCheck",{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({emailCheck: vo.emailCheck})
        })
        .then((resp) => resp.json())
        .then((data) => {
            if(data.msg === 'good'){
                alert("이메일 인증이 완료됐습니다.");
            }else{
                alert("이메일 인증이 실패했습니다.");
            }
        });
    };

      return (
   
            <StyledJoinDiv>
                <Form onSubmit={handleJoinSubmit}>
                    <Table>
                        <tbody>
                        <InputRow>
                              <td>아이디</td>
                              <td><Input type="text" name='id' value={vo.id} onChange={handleInputChange} placeholder='6자 이상 12자 이하로 작성'/></td>
                        </InputRow>
                        <InputRow>
                            <td>비밀번호</td>
                            <td><Input type="password" name='pwd' value={vo.pwd} onChange={handleInputChange} placeholder='8자 이상 16자 이하 대소문자, 특수문자 포함'/></td>
                        </InputRow>
                        <InputRow>
                            <td>비밀번호 확인</td>
                            <td>
                            <Input
                            type="password"
                            name="pwd2"
                            value={vo.pwd2}
                            onChange={handleInputChange}
                            onBlur={handleComparePwd} // 여기에 onBlur 이벤트 핸들러 추가
                            placeholder='비밀번호 확인'
                            />
                            {passwordMatchError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
                            </td>
                        </InputRow>
                        <InputRow>
                            <td>닉네임</td>
                            <td><Input type="text" name='nick' value={vo.nick} onChange={handleInputChange} placeholder='4자 이상 12자 이하로 작성'/></td>
                        </InputRow>
                        <InputRow>
                            <td>이름</td>
                            <td><Input type="text" name='name' value={vo.name} onChange={handleInputChange} /></td>
                        </InputRow>
                        <InputRow>
                            <td>전화번호</td>
                            <td><Input type="text" name='phoneNumber' value={vo.phoneNumber} onChange={handleInputChange} placeholder="' - ' 포함해서 작성"/></td>
                        </InputRow>
                        <InputRow>
                            <td>이메일</td>
                            <td><Input type="email" name='email' value={vo.email} onChange={handleInputChange} /></td>
                            <td><button onClick={handleMailSend}>인증번호 전송</button></td>
                        </InputRow>
                        <InputRow>
                            <td>인증번호 확인</td>
                            <td><Input type="text" name="emailCheck"  value={vo.emailCheck} o nChange={handleInputChange} placeholder='인증번호를 입력하세요' /></td>
                            <td><button onClick={handleMailCheck}>인증하기</button></td>
                        </InputRow>
                        <InputRow>
                            <td>생년월일</td>
                            <td><Input type="text" name='birthday' value={vo.birthday} onChange={handleInputChange} placeholder='년도월일 8자로 작성(20000101)'/></td>
                        </InputRow>
                        <InputRow>
                            <td colSpan="2"><SubmitButton type="submit" value="회원가입" /></td>
                        </InputRow>
                    </tbody>
                </Table>
            </Form>
        </StyledJoinDiv>
    );
    };
    

export default MemberJoin;
