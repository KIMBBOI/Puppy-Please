import React from 'react';
import styled from 'styled-components';

const StyledAdoptionDetailItem = styled.div`
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

const AoptionDetailItem = ( {vo} ) => {
    return (
        <StyledAdoptionDetailItem>
            <img 
                src={vo.imagePath} 
                alt={'imageNo' + vo.imageNo} />
            <div><h4>이름 : {vo.dogName}</h4></div>
            <div><h4>{vo.breed}</h4></div>
            <div><h4>{vo.genderMf}</h4></div>
            <div><h4>{vo.neuteringOx}</h4></div>
            <div><h4>{vo.age}</h4></div>
            <div><h4>{vo.weight}</h4></div>
        </StyledAdoptionDetailItem>
    );
};

export default AoptionDetailItem;