import React from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import AoptionOkDetailItem from './AoptionOkDetailItem';

const StyledAdoptionOkDetailDiv = styled.div`
    width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    padding: 30px 0 30px 0;
`;

const AdoptionOkDetail = () => {

  const location = useLocation();
  let vo = location.state.vo;

  return (
      <StyledAdoptionOkDetailDiv>
          {vo ? (
              <AoptionOkDetailItem key={vo.adoptionBoardNo} vo={vo} />
          ) : (
              <div>로딩중</div>
          )}
      </StyledAdoptionOkDetailDiv>
  );
};

export default AdoptionOkDetail;