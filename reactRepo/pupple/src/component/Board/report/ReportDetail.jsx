import React, { useState } from 'react';
import styled from 'styled-components';

const StyledDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
`;

// const [vo , setVo] = useState({ReportNo : "1",}); // 게시글 번호는 1번으로 고정 ( 받아와야 함 )
    


const ReportDetail = () => {


    
    return (
        <StyledDetailDiv>
            <div>vo.title</div>
            <div>vo.imagePath</div>
            <div>vo.content</div>
        </StyledDetailDiv>
    );
};

export default ReportDetail;