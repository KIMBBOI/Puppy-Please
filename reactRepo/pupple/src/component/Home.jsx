import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 20px; 

    .imgAni {
        width: 100%;
        height: 200px;
        overflow: hidden;
    }
    .imgAni_Bottom {
        width: 100%;
        height: 200px;
        overflow: hidden;
    }
`;

const StyledSection = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledTitle = styled.h2`
    margin: 0 0 10px;
    font-size: 24px;
`;

const StyledMore = styled.span`
    color: #d1b8ffe9; 
    cursor: pointer;
    margin-top: 10px;
    font-size: 16px;
    transform: scale(1.0); /* 이미지 확대 */
    transition: transform .5s; /* 시간 설정 */
    &:hover {
        font-weight: bold;
        transform: scale(1.05);   /* 이미지 확대 */
        transition: transform .5s;  /* 시간 설정 */
    }
`;

const StyledList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
    gap: 20px;
    margin-top: 10px;
`;

const StyledListItem = styled.div`
    flex: 0 0 calc(33.333% - 20px); 
    margin-bottom: 20px;
    list-style: none;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 10px;
    /* box-shadow: ; */
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    ul {
        margin: 0;
        padding: 0;
    }
    li {
        padding: 3px 7px 7px 7px;
    }
`;

const StyledImage = styled.img`
    width: 300px;
    max-height: 200px; 
    object-fit: cover;
    transform: scale(1.0); /* 이미지 확대 */
    transition: transform .5s; /* 시간 설정 */
    &:hover {  
        transform: scale(1.07);   /* 이미지 확대 */
        transition: transform .5s;  /* 시간 설정 */
    }
`;
const StyledImageBottom = styled.img`
    width: 100%;
    max-height: 200px; 
    object-fit: cover;
    transform: scale(1.0); /* 이미지 확대 */
    transition: transform .5s; /* 시간 설정 */
    &:hover {  
        transform: scale(1.07);   /* 이미지 확대 */
        transition: transform .5s;  /* 시간 설정 */
    }
`;



const Home = () => {
    const [voList, setVoList] = useState([]);
    const [adoptedList, setAdoptedList] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const [reportList, setReportList] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        getVoList();
        getAdoptedList();
        getNewsList();
        getReportList();
    }, [])

    //입양하기 게시판의 최신목록
    const getVoList = () => {
        fetch('http://127.0.0.1:8080/app/adoption/list')
        .then( resp => resp.json())
        .then( (data) => {
            if(data.msg === "good"){
                setVoList(data.voList);
            }else{
                alert("입양가능한 강아지들이 없습니다.")
            }
        })

    }

    //입양완료된 게시판의 최신목록
    const getAdoptedList = () => {
        fetch('http://127.0.0.1:8080/app/adoptionOk/list')
        .then( resp => resp.json())
        .then( (data) => {
            if(data.msg === "good"){
                setAdoptedList(data.voList);
            }else{
                alert("입양 완료된 강아지들이 없습니다.")
            }
        })
    }   

    //입양 후 소식 게시판의 최신목록
    const getNewsList = () => {
        fetch('http://127.0.0.1:8080/app/adoptionNews/list')
        .then( resp => resp.json())
        .then( (data) => {
            if(data.msg === "good"){
                setNewsList(data.voList);
            }else{
                alert("입양 후 소식이 없습니다.")
            }
        })
    }

    //유기견 제보 게시판의 최신목록
    const getReportList = () => {
        fetch('http://127.0.0.1:8080/app/report/list')
        .then( resp => resp.json())
        .then( (data) => {
            if(data.msg === "success"){
                setReportList(data.voList);
            }else{
                alert("제보된 게시글이 없습니다.");
            }
        })
    }

    
    const handleMoreDogList = () => {
        navigate("/board/adoption/list");
    }
    const handleClickDogList = () => {
        navigate("/board/adoption/list");
    }

    const handleClickAdoptedList = () => {
        navigate("/board/adoptionOk/list");
    }
    const handleMoreAdoptedList = () => {
        navigate("/board/adoptionOk/list");
    }

    const handleClickNewsList = () => {
        navigate("/board/adoptionNews/list");
    }
    const handleMoreNewsList = () => {
        navigate("/board/adoptionNews/list");
    }

    const handleClickReportList = () => {
        navigate("/board/report/list");
    }
    const handleMoreReportList = () => {
        navigate("/board/report/list");
    }

    return (
        <StyledHomeDiv>

            {/* 입양하기 게시판의 최신목록*/}
            <StyledSection>
                <StyledTitle>입양 가능한 강아지 목록</StyledTitle>
                <StyledList>
                   {voList.slice(0,3).map((dog, index) => (
                         <StyledListItem key={index}>
                            <ul onClick={ () => handleClickDogList() }>        
                                <div className='imgAni'>
                                    <StyledImage
                                    src={dog.imagePath}
                                    alt='사진'
                                    width='300px'
                                    height='200px' />
                                </div>
                                <li  style={{ listStyleType: 'none' }}>{dog.dogName}</li>
                                <li  style={{ listStyleType: 'none' }}>{dog.breed}</li>
                                <li  style={{ listStyleType: 'none' }}>{dog.genderMf}</li>
                                <li  style={{ listStyleType: 'none' }}>{dog.age}살</li>
                            </ul>
                    </StyledListItem>
                    ))}
                </StyledList>
                <StyledMore onClick={ () => handleMoreDogList()}>더보기</StyledMore>
            </StyledSection>

            {/* 입양완료된 친구들 목록*/}
            <StyledSection>
                <StyledTitle>입양 완료된 친구들</StyledTitle>
                <StyledList>
                    {adoptedList.slice(0,3).map((dog, index) => (
                        <StyledListItem key={index}>
                            <ul onClick={ () => handleClickAdoptedList() }>   
                                <div className='imgAni'>
                                    <StyledImage
                                    src={dog.imagePath}
                                    alt='사진'
                                    width='300px'
                                    height='200px' />
                                </div>     
                                <li style={{ listStyleType: 'none' }}>{dog.dogName}</li>
                                <li  style={{ listStyleType: 'none' }}>{dog.breed}</li>
                                <li  style={{ listStyleType: 'none' }}>{dog.genderMf}</li>
                                <li  style={{ listStyleType: 'none' }}>{dog.age}살</li>
                            </ul>
                        </StyledListItem>
                    ))}
                </StyledList>
                <StyledMore onClick={ () => handleMoreAdoptedList()}>더보기</StyledMore>
            </StyledSection>
            <hr width='100%'/>
            {/* 입양 후 소식목록 */}
            <StyledSection>
                <StyledTitle>입양 후 소식</StyledTitle>
                <StyledList>
                    {newsList.slice(0,3).map((dog, index) => (
                        <StyledListItem key={index}>
                            <ul onClick={ () => handleClickNewsList() }>        
                                <div className='imgAni'>
                                    <StyledImageBottom
                                        src={dog.imagePath}
                                        alt='사진'
                                        width='300px'
                                        height='200px' />
                                </div>
                                <li  style={{ listStyleType: 'none' }}>제목 : {dog.title}</li>
                                <li  style={{ listStyleType: 'none' }}>내용 : {dog.content}</li>
                                <li  style={{ listStyleType: 'none' }}>작성자 : {dog.writerNick}</li>
                            </ul>
                        </StyledListItem>
                    ))}        
                </StyledList>
                <StyledMore onClick={ () => handleMoreNewsList()}>더보기</StyledMore>
            </StyledSection>

            {/* 제보하기 게시판 목록 */}
            <StyledSection>
                <StyledTitle>제보 게시판</StyledTitle>
                <StyledList>
                    {reportList.slice(0,3).map((dog, index) => (
                        <StyledListItem key={index}>
                            <ul onClick={() => handleClickReportList()}> 
                                <div className='imgAni_Bottom'>
                                    <StyledImageBottom
                                        src={dog.imagePath}
                                        alt='사진'
                                        width='300px'
                                        height='200px' />
                                </div>
                                <li  style={{ listStyleType: 'none' }}>제목 : {dog.title}</li>
                                <li  style={{ listStyleType: 'none' }}>내용 : {dog.content}</li>
                                <li  style={{ listStyleType: 'none' }}>작성자 : {dog.writerNick}</li>
                            </ul>
                        </StyledListItem>
                    ))}
                </StyledList>
                <StyledMore onClick={ () => handleMoreReportList()}>더보기</StyledMore>    
            </StyledSection>
        </StyledHomeDiv>
    );
};

export default Home;