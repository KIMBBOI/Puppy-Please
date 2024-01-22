import React from 'react';
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
        width: 300px;
        height: 200px;
    }
`;

const AdoptionOkListItem = ( {a, b, c, d, e, f, g, h} ) => {
    return (
        <AdoptionOkListItemDiv>
            <img 
                src={a}
                alt='사진'
                value={h}
                width='300px'
                height='200px'
            />
            <span>이름 : {b}</span>
            <span>{c}</span>
            <span>{d}</span>
            <span>{e}</span>
            <span>{f}</span>
            <span>{g}</span>
        </AdoptionOkListItemDiv>
    );
};

export default AdoptionOkListItem;