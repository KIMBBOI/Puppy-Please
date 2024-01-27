import React from 'react';
import AdminPageMainSidebar from './AdminPageMainSidebar';
import styled from 'styled-components';
import AdminVisitReservationList from './AdminVisitReservationList';

const StyeledAdminVisitReservation = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #ffffff;
`;

const AdminVisitReservation = () => {

    return (
        <>
            <AdminPageMainSidebar />
            <StyeledAdminVisitReservation>
                <AdminVisitReservationList/>
            </StyeledAdminVisitReservation>
        </>
    );
};

export default AdminVisitReservation;