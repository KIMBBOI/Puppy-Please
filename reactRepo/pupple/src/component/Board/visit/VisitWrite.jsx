import React from 'react';
import styled from 'styled-components';

const StyledVisitWriteDiv = styled.div`
    width: 100%;
    height: 100%;

    & > div > label > i {
        display: inline-block;
        width: 5px;
        height: 5px;
        background: #f25656;
        border-radius: 50%;
        margin-left: 5px;
        vertical-align: 2px;
    }
`;

const VisitWrite = () => {
    return (
        <StyledVisitWriteDiv>
            <div>
                <label for='name'>
                    이름
                    <i aria-hidden="true"></i>
                </label>
                <input type="text" name='name' id='name'/>
            </div>
        </StyledVisitWriteDiv>
    );
};

export default VisitWrite;