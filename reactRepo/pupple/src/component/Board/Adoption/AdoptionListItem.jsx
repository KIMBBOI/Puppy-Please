import React from 'react';
import styled from 'styled-components';

const StyledItemDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AdoptionListItem = ( {a, b, c, d, e, f, g} ) => {
    return (
        <StyledItemDiv>
            <img 
                src={a}
                alt='사진'
                width='300px'
                height='200px'
            />
            <span>{b}</span>
            <span>{c}</span>
            <span>{d}</span>
            <span>{e}</span>
            <span>{f}</span>
            <span>{g}</span>
        </StyledItemDiv>
    );
};

export default AdoptionListItem;