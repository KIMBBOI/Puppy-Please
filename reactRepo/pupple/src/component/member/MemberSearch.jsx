import React from 'react';
import styled from 'styled-components';

const StyledSearchDiv = styled.div`
    width: 80%;
    height: 80%;
    & > hr{
        width: 50%;
        
    }
`;
const handleSearchId = (event) => {
    event.preventDefault();
};
const handleSearchPwd = (event) => {
    event.preventDefault();
}
const handleSearchIdChange = () => {
    
}
const handleSearchPwdChange = () => {

}

const MemberSearch = () => {
    return (
        <StyledSearchDiv>
            <h1>아이디 찾기</h1>
            <form onSubmit={handleSearchId}>
                <input type="text" name="name" placeholder='이름' onChange={handleSearchIdChange}/>
                <br />
                <input type="email" name="email" placeholder='이메일' onChange={handleSearchIdChange} />
                <br />
                <input type="submit" value='이메일 전송' />
            </form>
            <hr />
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
        </StyledSearchDiv>
    );
};

export default MemberSearch;