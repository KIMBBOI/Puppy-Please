import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberEditDiv = styled.div`
    width: 100%;
    height: 100%;
    & > form{
        width: 100%;
        height: 100%;
        margin: 0%;
        border: 1px dashed black;
        & > table{
            width: 100%;
            height: 100%;
            table-layout: fixed;
        }
    }
`;

const MemberEdit = () => {
    const navigate = useNavigate();

    let isFetching = false;

    const [vo, setVo] = useState();
    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setVo({
            ...vo,
            [name] : value
        });

    };
    const handleEditSubmit = (event) => {
        if(isFetching){
            return;
        }

        isFetching(true);
        event.preventDefault();

        fetch("http://127.0.0.1:8080/app/member/edit", {
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(vo)
        })
        .then( resp => {
            if(!resp.ok){
                throw new Error("회원정보수정 fetch 실패");
            }
            return resp.json();
        })
        .then( data => {
            if( data.msg === "good"){
                alert("회원정보수정 성공");
                navigate("/mypage")
            }else{
                alert("회원정보수정 실패");
                navigate("/edit")
            }
        })
        .catch( (e) => {
            console.log(e);
            alert("회원정보 수정 실패");
        })
        .finally( () => {
            isFetching = false;
        })
        ;
    }
    return (
        <StyledMemberEditDiv>
            <form onSubmit={ handleEditSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" name='id' onChange={ handleInputChange }></input></td>
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
                            <td><input type="text" name='name' onChange={ handleInputChange} /></td>
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
                            <td><input type="submit" value='정보 수정' /></td>
                        </tr>
                    </tbody>
                </table>    
            </form>   
        </StyledMemberEditDiv>
    );
};

export default MemberEdit;