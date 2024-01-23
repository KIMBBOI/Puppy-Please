import React from 'react';
import styled from 'styled-components';
import VisitReservationInfo from '../board/visit/VisitReservationInfo';

const StyledMemberReservationDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: #d2d2d2;
`;

const MemberReservation = () => {
    return (
        <StyledMemberReservationDiv>
            <VisitReservationInfo />
        </StyledMemberReservationDiv>
    );
};

export default MemberReservation;