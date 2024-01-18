import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSearchDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    & > div{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    & > hr{
        width: 30%;
    }
`;

const Form = styled.form`
  background: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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
const MemberSearch = () => {

    const [vo, setVo] = useState(null);
        
    const handleSearchId = (event) => {
        event.preventDefault();
        fetch("http://127.0.0.1:8080/app/member/searchId", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vo)
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg != null){
                alert("아이디 : "+ data.msg);
            }else{
                alert("아이디 조회 실패");

            }
            
        })
    };
    const handleSearchPwd = (event) => {
        event.preventDefault();
        fetch('http://127.0.0.1:8080/app/member/searchPwd',{
            method: 'post',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(vo)
        })
        .then(resp => resp.json())
        .then((data) => {
            if(data.msg === "good"){
                alert("이메일로 비밀번호를 전송했습니다.");
            }else{
                alert("해당 아이디가 없습니다.");
            }
        })            
        
    }
    const handleSearchIdChange = (e) => {
        const {name, value} = e.target;
        setVo({
            ...vo,
            [name]: value
        });
    }
    const handleSearchPwdChange = (e) => {
        const {name, value} = e.target;
        setVo({
            ...vo,
            [name]: value
        });
    }
    return (
        <StyledSearchDiv>
            <div>
                <h1>아이디 찾기</h1>
                <Form onSubmit={handleSearchId}>
                    <Input type="text" name="name" placeholder='이름' onChange={handleSearchIdChange}/>
                    <br />
                    <Input type="email" name="email" placeholder='이메일' onChange={handleSearchIdChange} />
                    <br />
                    <SubmitButton type="submit" value='아이디 찾기' />
                </Form>
            </div>
            <br />
            <hr />
            <div>
                <h1>비밀번호 찾기</h1>
                <Form onSubmit={handleSearchPwd}>
                    <Input type="text" name="id" placeholder='아이디' onChange={handleSearchPwdChange}/>
                    <br />
                    <Input type="text" name="name" placeholder='이름' onChange={handleSearchPwdChange}/>
                    <br />
                    <Input type="email" name="email" placeholder='이메일' onChange={handleSearchPwdChange}/>
                    <br />
                    <SubmitButton type="submit" value='이메일 전송' />
                </Form>
            </div>
        </StyledSearchDiv>
    );
};

export default MemberSearch;