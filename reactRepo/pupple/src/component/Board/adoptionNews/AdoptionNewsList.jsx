import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdoptionNewsListItem from './AdoptionNewsListItem';

const StyledAdoptionNewsListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 2fr 2fr 1fr;
    place-items: center center;
`;

const AdoptionNewsList = () => {

    const [arr, setArr] = useState([]);

    useEffect( () => {
        fetch("http://127.0.0.1:8080/app/api/adoptionNews/list")
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
                    return <AdoptionNewsListItem a={vo.title} b={vo.content}  c={vo.imageDath} />
                } )
            }
            <button onClick={ () => {
                navigate("/Board/adoptionNews/write");
            } }>작성하기</button>
        </StyledAdoptionNewsListDiv>
    );
};

export default AdoptionNewsList;