import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const StyledDetailItem = styled.div`
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    background-color: #e5d8fd44;
    text-align: center;

    img {
        width: 450px;
        height: 400px;
    }
`;

const AoptionOkDetailItem = ( {vo} ) => {

    return (
        <StyledDetailItem>
            <div>
                <div className='date'>입양완료일 : {vo.quitDate}</div>
                <img 
                    src={vo.imagePath} 
                    alt={'imageNo' + vo.imageNo}
                />
                <div><h4>이름 : {vo.dogName}</h4></div>
                <div><h5>종 : {vo.breed}</h5></div>
                <div><h5>성별 : {vo.genderMf}</h5></div>
                <div><h5>중성화 : {vo.neuteringOx}</h5></div>
                <div><h5>나이 : {vo.age}</h5></div>
                <div><h5>몸무게 : {vo.weight}</h5></div>
            </div>
        </StyledDetailItem>
    );
};

export default AoptionOkDetailItem;