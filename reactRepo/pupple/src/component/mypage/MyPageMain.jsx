import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberQuit from './MemberQuit';
import MemberAdoptList from './MemberAdoptList';
import MemberInfoEdit from './MemberInfoEdit';
import styled from 'styled-components';
import MyPageMainSidebar from './MyPageMainSidebar';
import MemberReservation from './MemberReservation';
import VisitReservationInfo from '../board/visit/VisitReservationInfo';

import VisitReservationInfo from '../board/visit/VisitReservationInfo';
import MemberAdoptDetail from './MemberAdoptDetail';

const StyledMyPageMainDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 4fr 1.5fr;
    place-items: center center;
`;

const MyPageMain = () => {
    return (
        <StyledMyPageMainDiv>
            <MyPageMainSidebar />
            <Routes>
                <Route path='/memberInfoEdit' element = {<MemberInfoEdit />}></Route>
                <Route path='/memberQuit' element = {<MemberQuit />}></Route>
                <Route path='/memberAdoptList' element = {<MemberAdoptList />}></Route>
                <Route path='/memberReservation' element = {<MemberReservation />}></Route>
                <Route path='/memberReservationInfo' element = {<VisitReservationInfo />}></Route>
                <Route path='/memberAdoptList/adoptDetail' element={<MemberAdoptDetail />} />
            </Routes>
        </StyledMyPageMainDiv>
    );
};

export default MyPageMain;