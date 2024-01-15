import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionWriteDiv = styled.div`
    width: 80%;

`;

const AdoptionWrite = ( { adminNo , imageNo} ) => {

    const [fileObj , setFileObj] = useState(null);
    const [name , setName] = useState();
    const [breed , setBreed] = useState();
    const [gender , setGender] = useState();
    const [inoculation , setInoculation] = useState();
    const [age , setAge] = useState();
    const [weight , setWeight] = useState();
    // const [rescueDogNo, setRescueDogNo] = useState();

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

    // const handleChangeRescueDogNo = (e) => {
    //     setRescueDogNo(e.target.value);
    // }

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        // fd.append("rescueDogNo", rescueDogNo);
        formData.append('file', fileObj);
        formData.append('name', name);
        formData.append('breed', breed);
        formData.append('gender', gender);
        formData.append('inoculation', inoculation);
        formData.append('age', age);
        formData.append('weight', weight);
        formData.append('adminNo', adminNo);
        formData.append('imageNo', imageNo); // 이 부분도 사용되는 변수 이름으로 변경 필요

        fetch('http://127.0.0.1:8080/app/api/adoption' , {
            method: 'POST' ,
            body: formData ,
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            if(data.msg === 'good'){
                alert('입양신청목록 등록 완료 !');
                navigate("/board/adoption/list");
            }else{
                alert('입양신청목록 등록 실패 ...');
                console.log(data);
            }
        } )
        .catch((error) => {
            console.error('입양 신청 목록 작성 오류: ', error);
            alert('입양 후 소식 등록 중 오류가 발생했습니다.');
        });
        ;
    };

    return (
        <StyledAdoptionWriteDiv>
            <form onSubmit={handleSubmit}>
                {/* <input type="text" name='rescueDogNo' placeholder='구조견 번호 입력' onChange={handleChangeRescueDogNo} /> */}
                <input type="file" multiple name='file' onChange={handleChangeFile}/>
                <div>
                    <span>이름</span><input type="text" name='name' placeholder="이름입력" onChange={handleChangeName} />
                </div>
                <div>
                    <span>종</span><input type="text" name='breed' placeholder="견종입력" onChange={handleChangeBreed} />
                </div>
                <div>
                    <span>성별</span><input type="text" name='gender' placeholder="성별입력" onChange={handleChangeGender} />
                </div>
                <div>
                    <span>중성화</span><input type="text" name='inoculation' placeholder="중성화입력" onChange={handleChangeInoculation} />
                </div>
                <div>
                    <span>나이</span><input type="text" name='age' placeholder="나이입력" onChange={handleChangeAge} />
                </div>
                <div>
                    <span>몸무게</span><input type="text" name='weight' placeholder="몸무게입력" onChange={handleChangeWeight} />
                </div>
                <div>
                    <input type="submit" value="등록하기" />
                </div>
                    {/* <span>종</span> <input type="text" name='name' placeholder="털색입력" /> */}
            </form>
        </StyledAdoptionWriteDiv>
    );
};

export default AdoptionWrite;