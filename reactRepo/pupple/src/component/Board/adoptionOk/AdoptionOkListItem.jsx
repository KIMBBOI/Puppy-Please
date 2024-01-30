import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const AdoptionOkListItemDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
        width: 400px;
        height: 300px;
    }

    .name {
        font-size: 18px;
        font-weight: 550;
        padding-top: 6px;
        align-items: start;
        display: flex;
        justify-content: flex-start;
    }

    div {
        padding-bottom: 6px;
        display: flex; /* 추가 */
        align-items: start; /* 추가 */
    }
    
    div > span:nth-child(1) {
        align-items: start;
        padding-right: 150px;
       
    }
`;

const AdoptionOkListItem = ( {a, b, c, d, e, f, g, h , vo} ) => {

    const navigate = useNavigate();

    const handleDetail = (vo) => {
        navigate("/board/adoptionOk/detail" , {state: {vo}});
    };

    return (
        <AdoptionOkListItemDiv>
            <img 
                src={a}
                alt='사진'
                value={h}
                onClick={ () => handleDetail(vo) }
                width='300px'
                height='200px'
            />
            <span className='name'>{b}</span>
            <div>
                <span>견종</span>
                <span className='breed'>{c}</span>
            </div>
            <div>
                <span>성별</span>
                <span className='gender'>{d}</span>
            </div>
            <div>
                <span>중성화</span>
                <span className='neutering'>{e}</span>
            </div>
            <div>
                <span>나이</span>
                <span className='age'>{f}</span>
            </div>
            <div>
                <span>몸무게</span>
                <span className='weight'>{g}</span>
            </div>
        </AdoptionOkListItemDiv>
    );
};

export default AdoptionOkListItem;