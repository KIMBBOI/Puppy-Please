import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionWriteDiv = styled.div`
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    /* place-items: center center; */
    /* margin-right: 15px; */
    padding: 30px 0 30px 15px;
    background-color: #e5d8fd44;
    
    form {
        align-items: center;
    }

    div {
        margin-bottom: 30px;
    }

    label {
        margin-right: 100px;
    }
`;

const AdoptionWrite = ( ) => {

    let isFetching = false;

    const navigate = useNavigate(); 

    const [fileObj , setFileObj] = useState();
    const [dogName , setDogName] = useState();
    const [breed , setBreed] = useState();
    const [genderMf , setGenderMf] = useState();
    const [neuteringOx , setNeuteringOx] = useState();
    const [age , setAge] = useState();
    const [weight , setWeight] = useState();


    const handleChangeFile = (e) => {
        setFileObj(e.target.files[0]);
    };
    const handleChangeDogName = (e) => {
        setDogName(e.target.value);
    };
    const handleChangeBreed= (e) => {
        setBreed(e.target.value);
    };
    const handleChangeGender= (e) => {
        setGenderMf(e.target.value);
    };
    const handleChangeNeutering = (e) => {
        setNeuteringOx(e.target.value);
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

    // const jsonStr = sessionStorage.getItem("adminVo");
    // const sessionAdminVo = JSON.parse(jsonStr);
    // const [adminVo , setAdminVo] = useState(sessionAdminVo);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        const adminNoStr = sessionStorage.getItem("loginAdminVo");
        const adminNo = JSON.parse(adminNoStr);
   
        console.log(adminNoStr);
    
        // < isFetching >
        // 게시글 작성이 겹치면 이미지 시퀀스를 호출하는 과정에서 
        // 다른 게시글의 이미지 넘버를 불러올 수 있음
        //   ㄴSELECT SEQ_MEMBER_NO.CURRVAL FROM IMAGE
        if (isFetching) {
            return;
        }
        isFetching = true;

        
        
        const formData = new FormData();
        // formData.append("rescueDogNo", rescueDogNo);
        formData.append('file', fileObj);
        formData.append('dogName', dogName);
        formData.append('breed', breed);
        formData.append('genderMf', genderMf);
        formData.append('neuteringOx', neuteringOx);
        formData.append('age', age);
        formData.append('weight', weight);
        // formData.append('rescueDogNo', rescueDogNo);
        formData.append('adminNo', adminNo.adminNo);
        formData.append('ADOPTION_COMPLETE_YN', 'N');

        fetch('http://127.0.0.1:8080/app/adoption/write' , {
            method: 'POST' ,
            body: formData ,
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            if (data.imgMsg === 'img insert good') {
                if (data.dogMsg === 'dog insert good') {
                    if (data.boardMsg === 'board write good') {
                        alert('게시글 등록 완료하였습니다.');
                        navigate('/board/adoption/list');
                        console.log("이미지오류로 작성싫=패 : " , data.imgMsg );
                    } else {
                        alert('게시글 등록 실패하였습니다.');
                        navigate("/board/adoption/write");
                        console.log("유기견오류로 작성싫=패 : " , data.dogMsg );
                    }
                } else {
                    alert('게시글 등록 실패하였습니다.');
                    navigate("/board/adoption/write");
                    console.log("게시글오류로 작성싫=패 : " , data.boardMsg );
                }
             } else {
                 alert("이미지 업로드 실패");
                 navigate("/board/adoption/write");
             }
        } )
        ;
    };


    return (
        <StyledAdoptionWriteDiv>
            <div className="adoption-write">
                <h2>입양 글 작성</h2>
                <form onSubmit={handleSubmit}>
                    <br />
                    <div>
                        <label>이름</label>
                        <input type="text" className="dogName" onChange={handleChangeDogName} />
                    </div>
                    <div className='breed'>
                        <label>견종선택</label>
                        <select onChange={handleChangeBreed}>
                            <option value="0">견종</option>
                            <option value="믹스견">믹스견</option>
                            <option value="불독">불독</option>
                            <option value="비숑">비숑</option>
                            <option value="골든리트리버">골든리트리버</option>
                            <option value="시베리안 허스키">시베리안 허스키</option>
                            <option value="라브라도 리트리버">라브라도 리트리버</option>
                            <option value="프렌치 불독">프렌치 불독</option>
                            <option value="푸들">푸들</option>
                            <option value="말티즈">말티즈</option>
                            <option value="비글">비글</option>
                            <option value="포메라니안">포메라니안</option>
                            <option value="요크셔테리어">요크셔테리어</option>
                            <option value="치와와">치와와</option>
                            <option value="진돗개">진돗개</option>
                        </select>
                    </div>
                    <div className="genderMf">
                        <label>성별</label>
                        <input type="text" onChange={handleChangeGender} />
                    </div>
                    <div className="neuteringOx">
                        <label>중성화</label>
                        <input type="text" onChange={handleChangeNeutering} />
                    </div>
                    <div className="age">
                        <label>나이</label>
                        <input type="number" onChange={handleChangeAge} />
                    </div>
                    <div className="weight">
                        <label>몸무게</label>
                        <input type="number" onChange={handleChangeWeight} />
                    </div>
                    <div className="file">
                        <label>사진선택</label>
                        <input type="file" onChange={handleChangeFile} />
                    </div>
                    <div className='submit'>
                        <button type="submit">작성</button>
                    </div>
                </form>
            </div>
        </StyledAdoptionWriteDiv>
    );
};

export default AdoptionWrite;