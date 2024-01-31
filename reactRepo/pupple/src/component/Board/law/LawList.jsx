import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyleLawListDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(6, 1fr);
    place-items: left;
    & > h2 {
        color: #292929;
    }
    & > div {
        border: 1px solid #ccc;
        margin-top: 30px;
        line-height: 43px;
        padding: 0 20px;
        margin-right: 60px;
        font-size: 16px;
        text-align: left;
    }
    & > span {
        margin-left: 50px;
    }
`;

const LawList = () => {
    return (
        <StyleLawListDiv>
            <h2>동물보호법</h2>
            <h2>야생동물보호 및 관리에 관한 법률</h2>
            <div><Link to="http://www.law.go.kr/법령/동물보호법">동물보호법</Link></div>
            <div><Link to="http://www.law.go.kr/법령/동물보호법시행령">동물보호법 시행령</Link></div>
            <div><Link to="http://www.law.go.kr/법령/동물보호법시행규칙">동물보호법 시행규칙</Link></div>
            <div><Link to="http://www.law.go.kr/법령/야생생물보호및관리에관한법률">야생동물보호 및 관리에 관한 법률</Link></div>
            <div><Link to="http://www.law.go.kr/법령/야생생물보호및관리에관한법률시행령">야생동물보호 및 관리에 관한 법률 시행령</Link></div>
            <div><Link to="http://www.law.go.kr/법령/야생생물보호및관리에관한법률시행규칙">야생동물보호 및 관리에 관한 법률 시행규칙</Link></div>
        </StyleLawListDiv>
    );
};

export default LawList;