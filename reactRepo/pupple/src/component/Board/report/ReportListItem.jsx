import React from 'react';
import styled from 'styled-components';

const StyledWrapDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > img {
        width: 100%;
        height: auto;
        margin: 0 auto;
        /* display: block; */
    }
`;

const ReportListItem = ( {a, b} ) => {
        // 4. 전달한 데이터를 받아줌
        
    return (
        <StyledWrapDiv>
            <img 
                src={b}
                alt='엑박 시 문구ㅋㅋ'
                // 5. 전달받은 데이터를 각각 입력 a=제목, b=경로
                // 6. 근데 화면 출력 안됨 ... 왜? **************
                //   ㄴ패치함수는 비동기적으로 작동하기 때문에.. => useState();
                //   => 7. GalleryListItem.jsx
            />
            <span>{a}</span>
        </StyledWrapDiv>
    );
};

export default ReportListItem;