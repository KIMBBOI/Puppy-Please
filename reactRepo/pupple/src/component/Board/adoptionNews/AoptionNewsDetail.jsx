import styled from 'styled-components';
import AoptionNewsDetailItem from './AoptionNewsDetailItem';
import { useLocation } from 'react-router-dom';

const StyledNewsDetailDiv = styled.div`
    width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    padding: 30px 0 30px 0;
`;

const AoptionNewsDetail = () => {

    const location = useLocation();
    let vo = location.state.vo;

    return (
        <StyledNewsDetailDiv>
            {vo ? (
                <AoptionNewsDetailItem key={vo.newsAfterAdoptionNo} vo={vo} />
            ) : (
                <div>로딩중</div>
            )}
        </StyledNewsDetailDiv>
    );
};

export default AoptionNewsDetail;