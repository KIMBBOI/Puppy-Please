import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdoptionNewsWriteDiv = styled.div`
    width: 95%;
    height: 100%;
    display: grid;
    justify-content: center;
    text-align: center;
    background-color: #e5d8fd44;
    padding: 30px 50px;
    margin: 30px 0 60px 0;

    /* text-align: center;
    text-align: center; */

    & > div {
        width: 700px;
        height: 100%;
        & > h2 {
            width: 100%;
            height: 100%;
            /* margin: 10px 0 0 0; */
        }
    }

    & > form {
        width: 100%;
        height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* * {
            border: 1px solid black;
        } */
        & > tr:nth-of-type(1) {
            width: 80%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
            & > td:nth-of-type(1) {
                width: 20%;
            }
            & > td:nth-of-type(2) {
                width: 80%;
                height: 100%;
                display: flex;
                & > input {
                    width: 90%;
                    height: 100%;
                }
            }
        }
        & > tr:nth-of-type(2) {
            width: 80%;
            height: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
            & > td:nth-of-type(1) {
                width: 20%;
            }
            & > td:nth-of-type(2) {
                width: 80%;
                height: 100%;
                display: flex;
                & > textarea {
                    width: 90%;
                    height: 100%;
                }
            }
        }
        & > tr:nth-of-type(3) {
            width: 80%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
            margin-bottom: 10px;
            & > td:nth-of-type(1) {
                width: 20%;
            }
            & > td:nth-of-type(2) {
                width: 80%;
                height: 100%;
                display: flex;
                align-items: center;

                & > input {
                    width: 90%;
                    height: auto;
                }
            }
        }
        & > tr:nth-of-type(4) {
            width: 80%;
            height: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-bottom: 10px;
            margin-bottom: 10px;
            & > td:nth-of-type(1) {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: right;
                & > button {
                    width: 50%;
                    height: 100%;
                    border-radius: 5px;
                    background-color: #C8ADFF;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    border: none;

                    &:hover {
                        background-color: #A080FF;
                    }
                }
            }
            & > td:nth-of-type(2) {
                width: 50%;
                height: 100%;
                display: flex;
                & > input {
                    width: 50%;
                    height: 100%;
                    border-radius: 5px;
                    background-color: #C8ADFF;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    border: none;
                    margin-left: 20px;
                    &:hover {
                        background-color: #A080FF;
                    }
                }
            }
          }
    }
  
    

`;

const AdoptionNewsWrite = ( ) => {

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
      const existing = location.state?.vo;
      if (existing) {
        setTitle(existing.title);
        setContent(existing.content);
    }
    }, [location.state] );

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };
  const handleChangeFile = (e) => {
    setFileObj(e.target.files[0]);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const str = sessionStorage.getItem("loginMemberVo");
    const vo = JSON.parse(str);
    const memberNo = vo.memberNo;


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


    // 작성하기로 전환 시 state 에 데이터가 있으면 수정하기로 변경
    const existing = location.state?.vo;
    // 로캐이션으로 받은 데이터 vo 할당

    if (existing) {

      // 수정 시 WHERE 에 필요한 데이터 준비
      formData.append("newsAfterAdoptionNo" , existing.newsAfterAdoptionNo);
      formData.append("imageNo" , existing.imageNo);

      // 수정하기
      fetch("http://127.0.0.1:8080/app/adoptionNews/edit" , {
        method: "POST",
        body: formData , 
      })
      .then( resp => resp.json() )
      .then( data => {
        if (data.imgMsg === "img update good") {
          if(data.boardMsg === "board update good"){
              alert("게시글이 수정되었습니다.");
              navigate("/board/adoptionNews/list?pno=1");
          }else{
              alert("게시글 수정에 실패하였습니다.");
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
      fetch('http://127.0.0.1:8080/app/adoptionNews/write', {
        method: 'POST',
        body: formData,
      })
        .then( resp => resp.json() )
        .then( data => {
          if (data.imgMsg === 'img insert good') {
            if (data.boardMsg === 'board write good') {
              alert('게시글 등록 완료하였습니다.');
              navigate('/board/adoptionNews/list?pno=1');
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
    }
  };


  return (
    <StyledAdoptionNewsWriteDiv>
      <div><h3>{location.state ? '게시글 수정' : '게시글 작성'}</h3></div>
      <form onSubmit={handleSubmit}>
        <tr>
          <td>제목</td>
          <td><input type="text" className="title" value={title} placeholder="제목을 작성하세요" onChange={handleChangeTitle} /></td>
        </tr>
        <tr>
          <td>내용</td>
          <td><textarea className="content" cols="30" rows="10" value={content} placeholder="내용을 입력하세요" onChange={handleChangeContent} /></td>
        </tr>
        <tr>
          <td>파일첨부</td>
          <td><input type="file" className="file" onChange={handleChangeFile} /></td>
        </tr>
        <tr>
          <td><button onClick={ () => {navigate("/board/adoptionNews/list")} }>이전</button></td>
          <td><input type="submit" value={location.state ? '수정하기' : '작성하기'} /></td>
        </tr>
      </form>
    </StyledAdoptionNewsWriteDiv>
  );
};

export default AdoptionNewsWrite;