import React, { useState } from 'react';
import styled from 'styled-components';
import NoticeList from './board/notice/NoticeList';
import { Link } from 'react-router-dom';

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
    & > div:nth-child(2){
        font-size: 15px;
    }
    & > div:nth-child(2) :hover {
        color: #292929;
        border-bottom: 1px solid #292929;
    }
`;

const StyledSubMenu = styled.div`
    color: #C7C7C7;
    display: ${props => props.isopen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
`;

const Navi = () => {
    const [isNewsAdoptionOpen, setIsNewsAdoptionOpen] = useState(undefined);

    const toggleNewsAdoption = () => {
        setIsNewsAdoptionOpen(!isNewsAdoptionOpen);
    };

    return (
        <StyledNaviDiv>
            <StyledMenuItem onClick={toggleNewsAdoption}>
                <NoticeList />
                <StyledSubMenu isopen={isNewsAdoptionOpen}>
                    <div><Link to="/board/adoptionNews/list">입양 후 소식</Link></div>
                    <div><Link to="/board/law/list">관련법규</Link></div>
                </StyledSubMenu>
            </StyledMenuItem>
            <StyledMenuItem onClick={toggleNewsAdoption}>
                <div>입양하기</div>
                <StyledSubMenu isopen={isNewsAdoptionOpen}>
                    <div><Link to="/board/adoption/list">입양신청</Link></div>
                    <div><Link to="/board/adoptionOk/list">입양완료</Link></div>
                </StyledSubMenu>
            </StyledMenuItem>
            <StyledMenuItem>
                <div><Link to="/board/report/list">제보</Link></div>
            </StyledMenuItem>
            <StyledMenuItem>
                <div><Link to="/board/visit/write">방문예약</Link></div>
            </StyledMenuItem>   
        </StyledNaviDiv>
    );
};

export default Navi;
