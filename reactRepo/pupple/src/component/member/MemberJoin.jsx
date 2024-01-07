import React, { useState } from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom'
const StyledJoinDiv = styled.div`
    width: 100%;
    height: 100%;
    & > form{
        width: 100%;
        height: 100%;
        margin: 0;
        border: 1px dashed black;
        & > table{
            width: 100%;
            height: 100%;
            table-layout: fixed;
        }
    }
`;


const MemberJoin = () => {

    const navigate = useNavigate();

    let [isFetching, setIsFetching] = useState(false);

    const [vo, setVo] = useState({
        id: '', pwd: '', nick: '', name: '', phoneNumber: '', email: '', birthday: ''
    });
    const handleInputChange = (event) => {

        const {name, value} = event.target;
        
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

    return (
        <StyledJoinDiv>
            <form onSubmit={ handleJoinSubmit }>
                <table>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" name='id' onChange={ handleInputChange }/></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name='pwd' onChange={ handleInputChange } /></td>
                        </tr>
                        <tr>
                            <td>닉네임</td>
                            <td><input type="text" name='nick' onChange={ handleInputChange } /></td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td><input type="text" name='name' onChange={ handleInputChange } /></td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td><input type="text" name='phoneNumber' onChange={ handleInputChange } /></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input type="email" name='email' onChange={ handleInputChange } /></td>
                        </tr>
                        <tr>
                            <td>생년월일</td>
                            <td><input type="text" name='birthday' onChange={ handleInputChange } /></td>
                        </tr>
                        <tr>
                            <td><input type="submit" value='회원가입' /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </StyledJoinDiv>
    );
};

export default MemberJoin;