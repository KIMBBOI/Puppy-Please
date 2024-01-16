import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledMemberQuitDiv = styled.div`

`;
const ErrorMsg = styled.span`
  color: red;
  display: block; // or inline-block, depending on preference
  margin-top: 5px;
`;

const MemberQuit = () => {
    const navigate = useNavigate();
    let [isFetching, setIsFetching] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    
    const loginMemberVo = JSON.parse(sessionStorage.getItem("loginMemberVo"));
    console.log(loginMemberVo);

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
        .then( resp => {resp.json()})
        .then((data) => {
            if(data.msg === "good"){
                alert("회원 탈퇴 성공");
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
            <form onSubmit={handleQuitSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>회원 이름</td>
                            <td><input type="text" name="name" placeholder={loginMemberVo.name} disabled/></td>
                        </tr>
                        <tr>
                            <td>닉네임</td>
                            <td><input type="text" name="nick" placeholder={loginMemberVo.nick} disabled/></td>
                        </tr>
                        <tr>
                            <td>회원ID</td>
                            <td><input type="text" name="id" placeholder={loginMemberVo.id} disabled/></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name="pwd" onChange={handleInputChange}/></td>
                        </tr>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td><input type="password" name="pwd2" onChange={handleInputChange} onBlur={handleComparePwd}/>
                            {passwordMatchError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}</td>
                        </tr>
                        <tr>
                            <td>생년월일</td>
                            <td><input type="text" name="birthday" placeholder={loginMemberVo.birthday} disabled/></td>
                        </tr>
                        <tr>
                            <td>휴대폰 번호</td>
                            <td><input type="text" name="phoneNumber" placeholder={loginMemberVo.phoneNumber} disabled/></td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input type="text" name="email" placeholder={loginMemberVo.email} disabled/></td>
                        </tr>
                        <tr>
                            <td rowSpan={2}><input type="submit" value="회원탈퇴"/></td>
                        </tr>
                    </tbody>

                </table>

            </form>
        </StyledMemberQuitDiv>
    );
};

export default MemberQuit;