import React from 'react';
import styled from 'styled-components';

const StyledNewsDetatilDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    text-align: center;

    img {
        width: 100%;
        height: auto;
        margin: 0 auto;
    }
`;

const AoptionNewsDetailItem = ( {vo} ) => {
    return (
        <StyledNewsDetatilDiv>
            <img 
                src={vo.imagePath} 
                alt={'imageNo' + vo.imageNo} />
            <div><h2>{vo.title}</h2></div>
            <div><h3>{vo.content}</h3></div>
        </StyledNewsDetatilDiv>
    );
};

export default AoptionNewsDetailItem;