import React from 'react';
import styled from 'styled-components';

const StyledNewsAdoptionListDiv = styled.div`
    color: #C7C7C7;
    &:hover{
        color: #292929;
        border: 1px solid #292929;
    }
`;

const NewsAdoptionList = () => {
    return (
        <StyledNewsAdoptionListDiv>
            입양 후 소식
        </StyledNewsAdoptionListDiv>
    );
};

export default NewsAdoptionList;