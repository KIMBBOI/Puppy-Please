import React from 'react';
import styled from 'styled-components';

const StyledReportListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 4fr 4fr 1fr 1fr;
    grid-gap: 5px;
    place-items: center center;
`;

const ReportList = () => {
    return (
        <StyledReportListDiv>
            <div>
                listttttttt
            </div>
        </StyledReportListDiv>
    );
};

export default ReportList;