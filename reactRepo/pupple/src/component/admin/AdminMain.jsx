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
    display: flex;
    justify-content: center; 
    align-items: flex-start;
    justify-content: space-evenly;
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
                <Route path='/visitReservation/detail' element={<AdminVisitReservationListItemDetail/>}></Route>
                <Route path='/visitReservation' element={<AdminVisitReservation/>}></Route>
            </Routes>
            </StyledAdminPageMain>
            ) : (
                alert("관리자만 접근할 수 있습니다.")
            )}
        </>
    );
};

export default AdminMain;