import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionNewsWriteDiv = styled.div`
    width: 100%;
    height: 100%;
`;

const AdoptionNewsWrite = () => {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [fileObj, setFileObj] = useState();

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };
    const handleChangeFile = (e) => {
        setFileObj(e.target.files[0]);
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("title", title);
        fd.append("content", content);
        fd.append("f", fileObj);
        fd.append("writeNo", 1);

        fetch("http://127.0.0.1:8080/app/api/adoptionNews", {
            method: "POST",
            body: fd,
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "good") {
                alert("입양후소식 등록 완료하였습니다.");
                navigate("/adoption/list");
            } else {
                alert("입양후소식 등록 실패하였습니다.");
            }
        } )
    };

    return (
        <StyledAdoptionNewsWriteDiv>
            <form onSubmit={handleSubmit}>
                <input type="text" name='title' placeholder='제목을 작성하세요' onChange={handleChangeTitle} />
                <input type="text" name='content' placeholder='내용을 입력하세요' onChange={handleChangeContent} />
                <input type="file" multiple name='f' onChange={handleChangeFile} />
                <input type="submit" value="등록하기" />
            </form>
        </StyledAdoptionNewsWriteDiv>
    );
};

export default AdoptionNewsWrite;