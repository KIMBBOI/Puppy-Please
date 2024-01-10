import React from 'react';
import styled from 'styled-components';

const styledItemDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AdoptionNewsListItem = ( {a, b, c} ) => {
    return (
        <styledItemDiv>
            <img 
                src={c}
                alt='사진'
                width='300px'
                height='200px'
            />
            <span>{a}</span>
            <span>{b}</span>
        </styledItemDiv>
    );
};

export default AdoptionNewsListItem;