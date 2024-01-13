import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionWriteDiv = styled.div`
    width: 80%;

`;

const AdoptionWrite = () => {

    const [fileObj , setFileObj] = useState();
    const [name , setName] = useState();
    const [breed , setBreed] = useState();
    const [gender , setGender] = useState();
    const [inoculation , setInoculation] = useState();
    const [age , setAge] = useState();
    const [weight , setWeight] = useState();

    const handleChangeFile = (e) => {
        setFileObj(e.target.files[0]);
    };
    const handleChangeName = (e) => {
        setName(e.target.value);
    };
    const handleChangeBreed= (e) => {
        setBreed(e.target.value);
    };
    const handleChangeGender= (e) => {
        setGender(e.target.value);
    };
    const handleChangeInoculation = (e) => {
        setInoculation(e.target.value);
    };
    const handleChangeAge = (e) => {
        setAge(e.target.value);
    };
    const handleChangeWeight = (e) => {
        setWeight(e.target.value);
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("f", fileObj);
        fd.append("name", name);
        fd.append("breed", breed);
        fd.append("gender", gender);
        fd.append("inoculation", inoculation);
        fd.append("age", age);
        fd.append("weight", weight);
        fd.append("adminNo", 1);

        fetch("http://127.0.0.1:8080/app/api/adoption" , {
            method: "POST" ,
            body: fd ,
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "good"){
                alert("입양신청목록 작성 완료 !");
                navigate("/board/adoption/list");
            }else{
                console.log(data);
                alert("입양신청목록 작성 실패 ...");
            }
        } )
        .catch((error) => {
            console.error("입양 신청 목록 작성 오류: ", error);
        });
        ;
    }

    return (
        <StyledAdoptionWriteDiv>
            <form onSubmit={handleSubmit}>
                <input type="file" multiple name='f' onChange={handleChangeFile}/>
                <input type="text" name='name' placeholder="이름입력" onChange={handleChangeName} />
                <span>종</span><input type="text" name='breed' placeholder="견종입력" onChange={handleChangeBreed} />
                <span>성별</span><input type="text" name='gender' placeholder="성별입력" onChange={handleChangeGender} />
                <span>중성화</span><input type="text" name='inoculation' placeholder="중성화입력" onChange={handleChangeInoculation} />
                <span>나이</span><input type="text" name='age' placeholder="나이입력" onChange={handleChangeAge} />
                <span>몸무게</span><input type="text" name='weight' placeholder="몸무게입력" onChange={handleChangeWeight} />
                {/* <span>종</span> <input type="text" name='name' placeholder="털색입력" /> */}
                <input type="submit" value="등록하기" />
            </form>
        </StyledAdoptionWriteDiv>
    );
};

export default AdoptionWrite;