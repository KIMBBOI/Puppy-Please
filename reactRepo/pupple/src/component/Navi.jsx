import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeList from './Board/Notice/NoticeList';
import NewsAdoptionList from './Board/Notice/NewsAdoptionList';
import AdoptionList from './Board/Adoption/AdoptionList';
import Report from './Board/Report';
import Visit from './Board/Visit';

const StyledNaviDiv = styled.div`
    width: 100%;
    height: 80%;
    background-color: #C8ADFF;
    color: black;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    place-items: center center;
    font-size: 1.5rem;
`;

const StyledMenuItem = styled.div`
    position: relative;
    cursor: pointer;

    &:hover {
        color: #DBE76D;
    }
`;

const StyledSubMenu = styled.div`
    color: #C7C7C7;
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
`;

const Navi = () => {
    const [isNewsAdoptionOpen, setIsNewsAdoptionOpen] = useState(false);

    const toggleNewsAdoption = () => {
        setIsNewsAdoptionOpen(!isNewsAdoptionOpen);
    };

    return (
        <StyledNaviDiv>
            <StyledMenuItem onClick={toggleNewsAdoption}>
                <NoticeList />
                <StyledSubMenu isOpen={isNewsAdoptionOpen}>
                    <NewsAdoptionList />
                </StyledSubMenu>
            </StyledMenuItem>
            <StyledMenuItem>
                <AdoptionList />
            </StyledMenuItem>
            <StyledMenuItem>
                <Report />
            </StyledMenuItem>
            <StyledMenuItem>
                <Visit />
            </StyledMenuItem>
        </StyledNaviDiv>
    );
};

export default Navi;
