import React from 'react';
import AdminPageMainSidebar from './AdminPageMainSidebar';
import styled from 'styled-components';
import AdminVisitReservationList from './AdminVisitReservationList';
import { useParams } from 'react-router-dom';

const StyeledAdminVisitReservation = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #f7f8f8;
`;

const AdminVisitReservation = () => {

    const {pno} = useParams();

    return (
        <>
            <AdminPageMainSidebar />
            <StyeledAdminVisitReservation>
                <AdminVisitReservationList pno={pno} />
            </StyeledAdminVisitReservation>
        </>
    );
};

export default AdminVisitReservation;