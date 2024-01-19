import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const StyeldReportWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    text-align: center;

    div {
        width: 600px;
        height: 10%;
        background-color: rgb(223, 255, 223);
    }
        h1 {
            width: 100%;
            height: 100%;
            margin: 0;
        }

    form {
        width: 600px;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #ffecec;

    }
        input {
            width: 70%;
            height: 10%;
        }
        textarea {
            width: 70%;
            height: 60%;
        } 

`;




const ReportWrite = () => {



    let isFetching = false;



    const navigate = useNavigate();
    const location = useLocation();



    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [fileObj, setFileObj] = useState();
        // 1. 수정인지 작성인지 판단해서 수정이면 기존의 데이터로 값을 채워줌
        // 2. location.state 에 값이 없으면 에러를 발생시키기 않고 undefind 반환. (location.state?)
        // 3. 조건문으로 확인 후 setter 로 데이터 삽입
        useEffect( () => {
            const existingReport = location.state?.vo;
            if (existingReport) {
                setTitle(existingReport.title);
                setContent(existingReport.content);
            }
        }, [location.state] );
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }
    const handleChangeFile = (e) => {
        setFileObj(e.target.files[0]);
    }
    const str = sessionStorage.getItem("loginMemberVo");
    const sessionVo = JSON.parse(str);
    const memberNo = sessionVo.memberNo;






    const handleSubmit = (e) => {
        e.preventDefault();



        // < isFetching >
        // 게시글 작성이 겹치면 이미지 시퀀스를 호출하는 과정에서 
        // 다른 게시글의 이미지 넘버를 불러올 수 있음
        //   ㄴSELECT SEQ_MEMBER_NO.CURRVAL FROM DUAL
        if (isFetching) {
            return;
        }
        isFetching = true;



        const fd = new FormData();
        fd.append("title" , title);
        fd.append("content" , content);
        fd.append("f" , fileObj);
        fd.append("memberNo" , memberNo);




        // 작성하기로 전환 시 state 에 데이터가 있으면 수정하기로 변경
        const existingReport = location.state?.vo;
        // 로캐이션으로 받은 데이터 vo 할당
        
        if (existingReport) {
            const vo = location.state.vo;
            if (title === null || title === undefined) {
                alert('제목을 입력하세요');
                return navigate("/board/report/write", {state: {vo}} );
            }
            if (title.length < 4) {
                alert('제목이 너무 짧습니다');
                return navigate("/board/report/write", {state: {vo}} );
            }
            if (content === undefined) {
                alert('내용을 입력하세요');
                return navigate("/board/report/write", {state: {vo}} );
            }
            if (content.length < 4) {
                alert('내용이 너무 짧습니다');
                return navigate("/board/report/write", {state: {vo}} );
            }
            if (fileObj === undefined) {
                alert('사진을 등록하세요');
                return navigate("/board/report/write", {state: {vo}} );
            }
            


            // 수정 시 WHERE 에 필요한 데이터 준비
            fd.append("reportNo" , existingReport.reportNo);
            fd.append("imageNo" , existingReport.imageNo);



            // 수정하기
            fetch("http://127.0.0.1:8080/app/report/edit" , {
                method: "POST" ,
                body : fd ,
            })
            .then( resp => resp.json() )
            .then( data => {
                if (data.ImgMsg === "img update success") {
                        if(data.ReportMsg === "board update success"){
                            alert("게시글 수정 완료 !");
                            navigate("/board/report/list?pno=1");
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
            if (!title) {
                alert('제목을 입력하세요');
                return navigate("/board/report/write");
            }
            if (title.length < 4) {
                alert('제목이 너무 짧습니다');
                return navigate("/board/report/write");
            }
            if (content === undefined) {
                alert('내용을 입력하세요');
                return navigate("/board/report/write");
            }
            if (content.length < 4) {
                alert('내용이 너무 짧습니다');
                return navigate("/board/report/write");
            }
            if (fileObj === undefined) {
                alert('사진을 등록하세요');
                return navigate("/board/report/write");
            }



            fetch("http://127.0.0.1:8080/app/report/write" , {
                method: "POST" ,
                body : fd ,
            })
            .then( resp => resp.json() )
            .then( data => {
                if (data.ImgMsg === "img insert success") {
                        if(data.ReportMsg === "board write success"){
                            alert("게시글 작성 완료 !");
                            navigate("/board/report/list?pno=1");
                        }else{
                            alert("게시글 작성 실패 ...");
                            navigate("/board/report/write");
                        }
                } else {
                    alert("이미지 업로드 실패 ...");
                    navigate("/board/report/write");
                }
            } )
            ;
        }

        


    };




    
    return (
        <StyeldReportWriteDiv>
            <div><h1>{location.state ? '게시글 수정' : '게시글 작성'}</h1></div>
            <form onSubmit={handleSubmit}>
                <input type="text" name='title' placeholder='제목을 작성하세요' value={title} onChange={handleChangeTitle}/>
                <textarea name="content" id="" cols="30" rows="10" placeholder='내용을 작성하세요' value={content} onChange={handleChangeContent}/>
                <input type="file" multiple name='f' onChange={handleChangeFile}/>
                <input type="submit" value={location.state ? '수정하기' : '작성하기'} />
            </form>
        </StyeldReportWriteDiv>
    );
};

export default ReportWrite;