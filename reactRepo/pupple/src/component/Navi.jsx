import React from 'react';
import styled from 'styled-components';
import Notice from './Board/Notice';
import Adoption from './Board/Adoption';
import Visit from './Board/Visit';
import Report from './Board/Report';

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
               <Notice />
               <Adoption />
               <Report />
               <Visit />
        </StyledNaviDiv>
    );
};

export default Navi;