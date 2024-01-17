import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyeldReportWriteDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    text-align: center;

    & > form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & > input[type=text] {
            width: 50%;
            height: 40px;
        }

        textarea {
            height: 50%;
            width: 50%;
        } 
    }
`;




const ReportWrite = () => {



    let isFetching = false;



    const navigate = useNavigate();



    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [fileObj, setFileObj] = useState();
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
    const vo = JSON.parse(str);
    const memberNo = vo.memberNo;
    console.log(memberNo);



    const handleSubmit = (e) => {
        e.preventDefault();



        // < isFetching >
        // 게시글 작성이 겹치면 이미지 시퀀스를 호출하는 과정에서 
        // 다른 게시글의 이미지 넘버를 불러올 수 있음
        //   ㄴSELECT SEQ_MEMBER_NO.CURRVAL FROM IMAGE
        if (isFetching) {
            return;
        }
        isFetching = true;



        const fd = new FormData();
        fd.append("title" , title);
        fd.append("content" , content);
        fd.append("f" , fileObj);
        fd.append("memberNo" , memberNo);



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
    };



    
    return (
        <StyeldReportWriteDiv>
            <div><h1>게시글 작성</h1></div>
            <form onSubmit={handleSubmit}>
                <input type="text" name='title' placeholder='제목을 작성하세요' onChange={handleChangeTitle}/>
                <textarea name="content" id="" cols="30" rows="10" placeholder='내용을 작성하세요' onChange={handleChangeContent}/>
                <input type="file" multiple name='f' onChange={handleChangeFile}/>
                <input type="submit" value="작성하기" />
            </form>
        </StyeldReportWriteDiv>
    );
};

export default ReportWrite;