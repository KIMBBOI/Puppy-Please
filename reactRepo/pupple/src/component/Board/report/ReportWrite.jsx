import React, { useState } from 'react';
import styled from 'styled-components';

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



    const handleSubmit = (e) => {
        e.preventDefault();



        const fd = new FormData();
        fd.append("title" , title);
        fd.append("content" , content);
        fd.append("f" , fileObj);
        // fd.append("writerNo" , writerNo);
    }



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