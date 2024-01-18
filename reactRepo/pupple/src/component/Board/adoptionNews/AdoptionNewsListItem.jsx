import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledItemDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }

    .imgDiv {
        width: 300px;
        height: 200px;

    }

    /* .imgDiv {
        width: 100%;
        height: 100%;
        background-image: url(${props =>  props.img.replaceAll("\\" , "/")});
            // 이미지 태그에서는 되는데 여기서는 안됨 => 역슬래시 때문에 안됨 **************
        background-size: cover;
        background-position: 100%;
    } */

    span {
        width: 100%;
        height: auto;
    }
`;

const AdoptionNewsListItem = ( {a, b, c, d, vo} ) => {


    const navigate = useNavigate();

    const handleClickDetail = (vo) => {
        navigate( "/board/adoptionNews/detail", { state: {vo} } );
    }

    return (
        <StyledItemDiv 
            img={a} 
            value={d} 
            onClick={ () => handleClickDetail(vo) } 
        >
            <div className='imgDiv'></div>
            {

            }
            <span>{b}</span> 
            <span>{c}</span>
        </StyledItemDiv>
    );
};

export default AdoptionNewsListItem;