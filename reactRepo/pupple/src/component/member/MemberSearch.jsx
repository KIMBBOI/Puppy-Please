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
                <form onSubmit={handleSearchId}>
                    <input type="text" name="name" placeholder='이름' onChange={handleSearchIdChange}/>
                    <br />
                    <input type="email" name="email" placeholder='이메일' onChange={handleSearchIdChange} />
                    <br />
                    <input type="submit" value='아이디 찾기' />
                </form>
            </div>
            <hr />
            <div>
                <h1>비밀번호 찾기</h1>
                <form onSubmit={handleSearchPwd}>
                    <input type="text" name="id" placeholder='아이디' onChange={handleSearchPwdChange}/>
                    <br />
                    <input type="text" name="name" placeholder='이름' onChange={handleSearchPwdChange}/>
                    <br />
                    <input type="email" name="email" placeholder='이메일' onChange={handleSearchPwdChange}/>
                    <br />
                    <input type="submit" value='이메일 전송' />
                </form>
            </div>
        </StyledSearchDiv>
    );
};

export default MemberSearch;