import React from 'react';
import styled from 'styled-components';
import ReportDetailItem from './ReportDetailItem';
import { useLocation } from 'react-router-dom';

const StyledDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    padding: 30px;
`;



const ReportDetail = () => {


    const location = useLocation();
    let vo = location.state.vo;



    return (
        <StyledDetailDiv>
            {vo ? (
                <ReportDetailItem key={vo.reportNo} vo={vo} />
            ) : (
                <div>Loading...</div>
            )}
        </StyledDetailDiv>
    );
};

export default ReportDetail;
