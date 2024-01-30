import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledItemDiv = styled.div`
    width: 100%;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    img {
        width: 400px;
        height: 350px;
    }

    .imgDiv {
        width: 350px;
        height: 380px;
        background-image: url(${props =>  props.img.replaceAll("\\" , "/")});
            // 이미지 태그에서는 되는데 여기서는 안됨 => 역슬래시 때문에 안됨 **************
        background-size: cover;
        background-position: 100%;
        margin-bottom: 15px;
    }

    span {
        width: 100%;
        height: auto;
        text-align: center;
    }

    h5{ margin: 0; }
    .tit { font-size: 16.5px; }
    .content { font-size: 13.5px; padding: 7px 20px 5px 20px; }
`;

const AdoptionNewsListItem = ( {a, b, c, d, e, vo} ) => {


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
            <span className='tit'><h5>{b}</h5></span> 
            <span className='content'>{c}</span>
            {/* <div className='date'>{d}</div> */}
        </StyledItemDiv>
    );
};

export default AdoptionNewsListItem;