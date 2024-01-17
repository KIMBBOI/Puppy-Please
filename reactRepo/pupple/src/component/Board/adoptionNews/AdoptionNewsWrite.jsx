import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionNewsWriteDiv = styled.div`
  width: 100%;
  height: 100%;
  
  h3 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
    font-size: 12px;
  }

  .title {
    padding: 3px 8px;
  }

  .content {
    padding: 4px 8px;
  }

  .submit {
    display: flex;
  }

`;

const AdoptionNewsWrite = ( ) => {

  let isFetching = false;


  const navigate = useNavigate();


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

  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('file', fileObj);
    formData.append('memberNo', memberNo); // 이 부분은 실제로 사용되는 변수 이름으로 변경해야 합니다.


    fetch('http://127.0.0.1:8080/app/adoptionNews/write', {
      method: 'POST',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.imgMsg === 'img insert good') {
          if (data.boardMsg === 'board write good') {
            alert('게시글 등록 완료하였습니다.');
            navigate('/board/adoptionNews/list');
          } else {
            alert('게시글 등록 실패하였습니다.');
            navigate("/board/adoptionNews/write");
          }
        } else {
            alert("이미지 업로드 실패");
            navigate("/board/adoptionNews/write");
        }
      })
      ;
  };

  
  return (
    <StyledAdoptionNewsWriteDiv>
      <div><h3>게시글 작성</h3></div>
      <form onSubmit={handleSubmit}>
        <input type="text" className="title" placeholder="제목을 작성하세요" onChange={handleChangeTitle} />
        <br />
        <textarea className="content" cols="30" rows="10" placeholder="내용을 입력하세요" onChange={handleChangeContent} />
        <br />
        <input type="file" className="file" onChange={handleChangeFile} />
        <br />
        <div className='submit'>
          <input type="submit" className='cancle' value="취소" />
          <input type="submit" className='ok' value="확인" />
        </div>
      </form>
    </StyledAdoptionNewsWriteDiv>
  );
};

export default AdoptionNewsWrite;