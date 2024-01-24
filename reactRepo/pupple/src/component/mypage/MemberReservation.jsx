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
    let fromSidebar = location.state.fromSidebar
    let beforeVo = location.state.brforeVo


    return (
        <StyledMemberReservationDiv>
            <VisitReservationInfo />
        </StyledMemberReservationDiv>
    );
};

export default MemberReservation;