import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHomeDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 20px; 
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
`;

const StyledImage = styled.img`
    width: 100%;
    max-height: 200px; 
    object-fit: cover; 
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
                                <StyledImage
                                src={dog.imagePath}
                                alt='사진'
                                width='300px'
                                height='200px' />
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
                                <StyledImage
                                src={dog.imagePath}
                                alt='사진'
                                width='300px'
                                height='200px' />
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

            {/* 입양 후 소식목록 */}
            <StyledSection>
                <StyledTitle>입양 후 소식</StyledTitle>
                <StyledList>
                    {newsList.slice(0,3).map((dog, index) => (
                        <StyledListItem key={index}>
                            <ul onClick={ () => handleClickNewsList() }>        
                                <StyledImage
                                    src={dog.imagePath}
                                    alt='사진'
                                    width='300px'
                                    height='200px' />
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
                                <StyledImage
                                    src={dog.imagePath}
                                    alt='사진'
                                    width='300px'
                                    height='200px' />
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