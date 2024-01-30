import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import AdminAdopt from './AdminAdopt';
import AdminAdoptDetail from './AdminAdoptDetail';
import AdminVisitReservation from './AdminVisitReservation';
import AdminVisitReservationListItemDetail from './AdminVisitReservationListItemDetail';

const StyledAdminPageMain = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 4fr 1.5fr;
    place-items: center center;
    align-items: baseline;
`;


const AdminMain = () => {

    const loginAdminVo = sessionStorage.getItem("loginAdminVo");


    return (
        <>
        {loginAdminVo ? (
            <StyledAdminPageMain>
            <Routes>
                <Route path='/adoptList' element={<AdminAdopt/>}></Route>
                <Route path='/adoptList/adoptDetail' element={<AdminAdoptDetail/>}></Route>
                <Route path='/visitReservation/:pno/detail' element={<AdminVisitReservationListItemDetail/>}></Route>
                <Route path='/visitReservation/:pno' element={<AdminVisitReservation/>}></Route>
            </Routes>
            </StyledAdminPageMain>
            ) : (
                alert("관리자만 접근할 수 있습니다.")
            )}
        </>
    );
};

export default AdminMain;