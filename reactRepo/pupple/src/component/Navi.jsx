import React from 'react';
import styled from 'styled-components';

const StyledNaviDiv = styled.div`
    width: 100%;
    height: 80%;
    background-color: #C8ADFF;
    color: black;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    place-items: center center;
    font-size: 1.5rem;
`;


const Navi = () => {
    return (
        <StyledNaviDiv>
               <div>공지사항</div>
               <div>입양게시판</div>
               <div>제보</div>
               <div>방문예약</div>
        </StyledNaviDiv>
    );
};

export default Navi;