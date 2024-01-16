import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdoptionNewsListItem from './AdoptionNewsListItem';

const StyledAdoptionNewsListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1.5fr 1.5fr 1fr;
    place-items: center center;
`;

const AdoptionNewsList = () => {

    let [arr, setArr] = useState([]);

    useEffect( () => {
        fetch("http://127.0.0.1:8080/app/adoptionNews/list")
        .then( (resp) => {return resp.json()} )
        .then( (data) => {
            console.log(data);
            setArr(data.voList);
        } )
        ;
    } , [] );

    const navigate = useNavigate();

    return (
        <StyledAdoptionNewsListDiv>
            {
                arr.map( (vo) => {
                    return <AdoptionNewsListItem key={vo.newsAfterAdoptionNo} a={vo.title} b={vo.content}  c={vo.imagePath} />
                } )
            }
            <button onClick={ () => {
                navigate("/board/adoptionNews/write");
            } }>작성하기</button>
        </StyledAdoptionNewsListDiv>
    );
};

export default AdoptionNewsList;