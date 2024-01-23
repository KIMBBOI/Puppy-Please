import React from 'react';
import styled from 'styled-components';
import VisitReservationInfo from '../board/visit/VisitReservationInfo';
import { useLocation } from 'react-router';

const StyledMemberReservationDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: #d2d2d2;
`;

const MemberReservation = () => {
    const location = useLocation();
    const fromSidebar = location.state.statusVo;
    console.log('fromSidebar :::',fromSidebar); // fromSidebar ::: {status: true}

    return (
        <StyledMemberReservationDiv>
            <VisitReservationInfo fromSidebar={fromSidebar}/>
        </StyledMemberReservationDiv>
    );
};

export default MemberReservation;