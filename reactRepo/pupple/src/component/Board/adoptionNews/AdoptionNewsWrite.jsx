import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionNewsWriteDiv = styled.div`
  width: 100%;
  height: 100%;
`;

const AdoptionNewsWrite = ( { memberNo , imageNo } ) => {
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
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', fileObj);
    // 추가
    formData.append('memberNo', memberNo); // 이 부분은 실제로 사용되는 변수 이름으로 변경해야 합니다.
    formData.append('imageNo', imageNo); // 이 부분도 사용되는 변수 이름으로 변경 필요
  
    fetch('http://127.0.0.1:8080/app/adoptionNews', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.msg === 'good') {
          alert('입양 후 소식 등록 완료하였습니다.');
          navigate('/board/adoptionNews/list');
        } else {
          alert('입양 후 소식 등록 실패하였습니다.');
        }
      })
      .catch((error) => {
        console.error('Error during Adoption News write : ', error);
        alert('입양 후 소식 등록 중 오류가 발생했습니다.');
      });
  };
  
  return (
    <StyledAdoptionNewsWriteDiv>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="제목을 작성하세요" onChange={handleChangeTitle} />
        <input type="text" name="content" placeholder="내용을 입력하세요" onChange={handleChangeContent} />
        <input type="file" name="file" onChange={handleChangeFile} />
        <input type="submit" value="등록하기" />
      </form>
    </StyledAdoptionNewsWriteDiv>
  );
};

export default AdoptionNewsWrite;
