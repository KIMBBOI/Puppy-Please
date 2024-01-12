import React from 'react';
import styled from 'styled-components';

const StyledFooterDiv = styled.div`
  width: 100%;
  padding: 20px 40px; 
  background-color: #f1f1f1; 
  border-top: 2px solid #C8ADFF;
  box-sizing: border-box;
  display: flex;
  justify-content: center; 
  align-items: center;
`;

const FooterText = styled.p`
  color: #333;
  font-size: 0.8rem;
  text-align: center; 
  line-height: 1.5; 
  margin: 0;
`;

const Footer = () => {
  return (
    <StyledFooterDiv>
      <FooterText>
        (사)강아지를 부탁해 퍼플 | 서울시  강남구 역삼동 823-23번지(테헤란로 130번지)
        <br />
        MAIL: info@pupple.org | TEL: 02-1234-4321 | FAX: 02-1234-4321
        <br />
        COPYRIGHT 2024 PUPPLE. ALL RIGHTS RESERVED
      </FooterText>
    </StyledFooterDiv>
  );
};

export default Footer;
