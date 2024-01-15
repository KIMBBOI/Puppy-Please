import React from 'react';
import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom'
import MemberMain from './member/MemberMain';
import Aside from './Aside';
import AdoptionMain from './board/adoption/AdoptionMain';
import AdoptionNewsMain from './board/adoptionNews/AdoptionNewsMain';
import ReportMain from './board/report/ReportMain';
import VisitMain from './board/visit/VisitMain';
import LawMain from './board/law/LawMain';
import AdoptionOkMain from './board/adoptionOk/AdoptionOkMain';
import MyPageMain from './mypage/MyPageMain';
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
                <Route path='/mypage/*' element={<MyPageMain />}></Route>
                <Route path='/board/adoptionNews/*' element={ <AdoptionNewsMain />} ></Route>
                <Route path='/board/law/*' element={ <LawMain />} ></Route>
                <Route path='/board/adoption/*' element={ <AdoptionMain />}></Route>
                <Route path='/board/adoptionOk/*' element={ <AdoptionOkMain />}></Route>
                <Route path='/board/report/*' element={ <ReportMain />}></Route>
                <Route path='/board/visit/*' element={ <VisitMain />}></Route>
            </Routes>
            <Aside />
        </StyledMainDiv>
    );
};

export default Main;