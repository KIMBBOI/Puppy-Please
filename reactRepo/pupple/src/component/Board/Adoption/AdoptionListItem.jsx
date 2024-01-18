import React from 'react';
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
    }
`;

const AdoptionListItem = ( {a, b, c, d, e, f, g } ) => {
    return (
        <StyledItemDiv>
            <img 
                src={a}
                alt='사진'
            />
            <span>{b}</span>
            <span>{c}</span>
            <span>{d}</span>
            <span>{e}</span>
            <span>{f}</span>
            <span>{g}</span>
            {/* <span>{i}</span> */}
        </StyledItemDiv>
    );
};

export default AdoptionListItem;