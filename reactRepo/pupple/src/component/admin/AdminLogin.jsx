import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAdminAuth } from '../PuppleContext';

const AdminLoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f4f4f4; 

  & form {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px; 
  }

  & table {
    width: 100%;
  }

  & td {
    padding: 10px; 
  }

  & input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px; 
    border: 1px solid #ccc;
    border-radius: 4px; 
  }

  & button {
    width: 100%;
    padding: 10px 0;
    background-color: #5C6BC0; 
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  & button:hover {
    background-color: #3F51B5; 
  }
`;


const AdminLogin = () => {
    const navigate = useNavigate();
    const { loginAdmin} = useAdminAuth();
    const jsonStr = sessionStorage.getItem("loginAdminVo");
    const sessionLoginAdminVo = JSON.parse(jsonStr);
    const [loginAdminVo, setLoginAdminVo] = useState(sessionLoginAdminVo);
    const [vo, setVo] = useState();

    useEffect(() => {
    }, [loginAdminVo]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setVo({
            ...vo,
            [name] : value,
        });
    };

    const handleAdminLogin = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8080/app/admin/login", {
            method: "post",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(vo),
        })
        .then((resp) => { return resp.json();})
        .then((data) => {
            if(data.msg === "login success"){
                alert("로그인 성공");
                sessionStorage.setItem(
                    "loginAdminVo",
                    JSON.stringify(data.loginAdminVo)
                );
                setLoginAdminVo(data.loginAdminVo);
                loginAdmin(data.loginAdminVo);
            }else{
                alert("로그인 실패");
            }
        })
        .catch((e) => {
            console.log(e);
        })
        navigate("/");
    };



    return (
        loginAdminVo ? (
             alert("이미 로그인했습니다.")
        ):(
        <AdminLoginDiv>
            <form onSubmit={handleAdminLogin}>
                <table>
                    <tbody>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" name="id" onChange={handleInputChange} placeholder='아이디' /></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name="pwd" onChange={handleInputChange} placeholder='비밀번호' /></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit">로그인</button>    
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </AdminLoginDiv>
        )
    );
};



export default AdminLogin;