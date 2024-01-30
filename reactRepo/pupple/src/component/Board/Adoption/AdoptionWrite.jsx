import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionWriteDiv = styled.div`
    width: 70%;
    height: 90%;
    display: flex;
    flex-direction: column;
    padding: 30px 0;
    text-align: center;
    background-color: #e5d8fd44;
    margin: 100px;
    
    
    form { align-items: center; font-size: 18.5px; }
    div { margin-bottom: 30px; }
    label { margin-right: 100px; }
    input { width: 35%; height: 30px; font-size: 17.3px; }
    .submit { width: 45%; }
    select { width: 22%; height: 30px; font-size: 17.3px; }
`;

const AdoptionWrite = ( ) => {

    let isFetching = false;


    const navigate = useNavigate(); 
    const location = useLocation();



    const [fileObj , setFileObj] = useState();
    const [dogName , setDogName] = useState();
    const [breed , setBreed] = useState();
    const [genderMf , setGenderMf] = useState();
    const [neuteringOx , setNeuteringOx] = useState();
    const [age , setAge] = useState();
    const [weight , setWeight] = useState();
        // 1. 수정인지 작성인지 판단해서 수정이면 기존의 데이터로 값을 채워줌
        // 2. location.state 에 값이 없으면 에러를 발생시키기 않고 undefind 반환. (location.state?)
        // 3. 조건문으로 확인 후 setter 로 데이터 삽입
        useEffect( () => {
            const existing = location.state?.vo;
            if (existing) {
                setDogName(existing.dogName);
                setBreed(existing.breed);
                setGenderMf(existing.genderMf);
                setNeuteringOx(existing.neuteringOx);
                setAge(existing.age);
                setWeight(existing.weight);
            }
        }, [location.state] );


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
        formData.append('file', fileObj);
        formData.append('dogName', dogName);
        formData.append('breed', breed);
        formData.append('genderMf', genderMf);
        formData.append('neuteringOx', neuteringOx);
        formData.append('age', age);
        formData.append('weight', weight);
        formData.append('adminNo', adminNo.adminNo);
        formData.append('ADOPTION_COMPLETE_YN', 'N');
        // formData.append('rescueDogNo', rescueDogNo);

        console.log("file :" , fileObj);

        // 작성하기로 전환 시 state 에 데이터가 있으면 수정하기로 변경
        const existing = location.state?.vo;
        // 로캐이션으로 받은 데이터 vo 할당

        if (existing) {

            // 수정 시 WHERE 에 필요한 데이터 준비
            formData.append("adoptionBoardNo", existing.adoptionBoardNo);
            formData.append("imageNo", existing.imageNo);

            // 수정하기
            fetch('http://127.0.0.1:8080/app/adoption/edit', {
                method: 'POST' , 
                body: formData ,
            })
            .then( resp => resp.json() )
            .then( data => {
                if (data.imgMsg === "img update good") {
                    if(data.boardMsg === "board update good"){
                        alert("게시글 수정 완료 !");
                        navigate("/board/adoption/list?pno=1");
                    }else{
                        alert("게시글 수정 실패 ...");
                        navigate(-1);
                    }
                } else {
                    alert("이미지 수정 실패 ...");
                    navigate(-1);
                }
            } )
            ;
        } else {
            // 작성하기
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
                        } else {
                            alert('게시글 등록 실패하였습니다.');
                            navigate("/board/adoption/write");
                        }
                    } else {
                        alert('게시글 등록 실패하였습니다.');
                        navigate("/board/adoption/write");
                    }
                } else {
                    alert("이미지 업로드 실패");
                    navigate("/board/adoption/write");
                }
            } )
            ;
        }
            
    };

        


    return (
        <StyledAdoptionWriteDiv>
            <div className="adoption-write">
                <div><h2>{location.state ? '게시글 수정' : '게시글 작성'}</h2></div>
                <form onSubmit={handleSubmit}>
                    <br />
                    <div>
                        <label>이름</label>
                        <input type="text" className="dogName" value={dogName} onChange={handleChangeDogName} />
                    </div>
                    <div className='breed'>
                        <label>견종선택</label>
                        <select value={breed} onChange={handleChangeBreed}>
                            <option value="0">견종</option>
                            <option value="믹스견">믹스견</option>
                            <option value="스피츠">스피츠</option>
                            <option value="불독">불독</option>
                            <option value="비숑">비숑</option>
                            <option value="골든리트리버">골든리트리버</option>
                            <option value="시베리안 허스키">시베리안 허스키</option>
                            <option value="라브라도 리트리버">라브라도 리트리버</option>
                            <option value="프렌치 불독">프렌치 불독</option>
                            <option value="푸들">푸들</option>
                            <option value="말티즈">말티즈</option>
                            <option value="비글">시추</option>
                            <option value="포메라니안">포메라니안</option>
                            <option value="요크셔테리어">요크셔테리어</option>
                            <option value="치와와">치와와</option>
                            <option value="시바견">시바견</option>
                            <option value="진돗개">진돗개</option>
                        </select>
                    </div>
                    <div className="genderMf">
                        <label>성별 (M / F)</label>
                        <input type="text" value={genderMf} onChange={handleChangeGender} />
                    </div>
                    <div className="neuteringOx">
                        <label>중성화   (O / X)</label>
                        <input type="text" value={neuteringOx} onChange={handleChangeNeutering} />
                    </div>
                    <div className="age">
                        <label>나이</label>
                        <input type="number" value={age} onChange={handleChangeAge} />
                    </div>
                    <div className="weight">
                        <label>몸무게</label>
                        <input type="number" value={weight} onChange={handleChangeWeight} />
                    </div>
                    <div className="file">
                        <label>사진선택</label>
                        <input type="file" multiple name='file' onChange={handleChangeFile} />
                    </div>
                    <div className='submit'>
                        <input type="submit" value={location.state ? '수정' : '등록'} />
                    </div>
                </form>
            </div>
        </StyledAdoptionWriteDiv>
    );
};

export default AdoptionWrite;