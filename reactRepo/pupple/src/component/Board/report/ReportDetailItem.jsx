import React from 'react';
import styled from 'styled-components';

const StyeldDitailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;

    img {
        width: 100%;
        height: auto;
        margin: 0 auto;
    }
`;

const ReportDetailItem = ( {a,b,c} ) => {
    return (
        <StyeldDitailDiv>
            <div>{a}</div>
            <img 
                src={b}
                alt='엑박 시 문구ㅋㅋ'
                // 5. 전달받은 데이터를 각각 입력 a=제목, b=경로
                // 6. 근데 화면 출력 안됨 ... 왜? **************
                //   ㄴ패치함수는 비동기적으로 작동하기 때문에.. => useState();
                //   => 7. GalleryListItem.jsx
            />
            <div>{c}</div>
        </StyeldDitailDiv>
    );
};

export default ReportDetailItem;