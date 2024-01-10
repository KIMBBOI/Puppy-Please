import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom'
import MemberMain from './member/MemberMain';
import Aside from './Aside';
import AdoptionMain from './Board/adoption/AdoptionMain';
import AdoptionNewsMain from './Board/adoptionNews/AdoptionNewsMain';
import ReportMain from './Board/report/ReportMain';
import VisitMain from './Board/visit/VisitMain';
const StyledMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 7fr 1.5fr;
    grid-template-rows: 1fr;
    place-items: center center;
`;

const Main = () => {
    return (
        <StyledMainDiv>
            <Aside />
            <Routes>
                <Route path='/member/*' element={ <MemberMain />}></Route>
                <Route path='/Board/adoptionNews/*' element={ <AdoptionNewsMain />} ></Route>
                <Route path='/Board/adoption/*' element={ <AdoptionMain />}></Route>
                <Route path='/Board/report/*' element={ <ReportMain />}></Route>
                <Route path='/Board/visit/*' element={ <VisitMain />}></Route>
            </Routes>
            <Aside />
        </StyledMainDiv>
    );
};

export default Main;