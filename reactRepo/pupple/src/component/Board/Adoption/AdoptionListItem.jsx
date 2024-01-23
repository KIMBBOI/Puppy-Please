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
        width: 300px;
        height: 200px;
        margin-bottom: 5px;
    }

    .adoptionBtn {
        width: 100%;
        height: 47px;
        border: none;
        font-size: 16.5px;
        font-weight: 450;
        color: #ffff;
        background-color: #cfb7fd;
        cursor: pointer;
        margin-top: 7px;
    }

    span {
        padding: 6px;
        font-size: 14px;
    }
`;

const AdoptionListItem = ( {a, b, c, d, e, f, g, h, vo } ) => {

    const navigate = useNavigate();

    const handleDetail = (vo) => {
        navigate("/board/adoption/detail" , {state: {vo}});
    }
    const handleAdoption = () => {
        console.log(vo);
        navigate("/board/adoption/survey", {state: {vo}});
    }
    return (
        <StyledItemDiv>
            <img 
                src={a}
                alt='사진'
                value={h}
                onClick={ () => handleDetail(vo) }
                width='300px'
                height='200px'
            />
            <span>이름 : {b}</span>
            <span>{c}</span>
            <span>{d}</span>
            <span>{e}</span>
            <span>{f}</span>
            <span>{g}</span>
            <button className='adoptionBtn' onClick={ handleAdoption }>입양신청</button>
        </StyledItemDiv>
    );
};

export default AdoptionListItem;