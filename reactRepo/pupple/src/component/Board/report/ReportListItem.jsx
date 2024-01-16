import React from 'react';
import styled from 'styled-components';

const StyledWrapDiv = styled.div`
    width: 24%;
    height: 40%;

    img {
        width: 100%;
        height: 100%;
        margin: 0 auto;
    }

    .imgDiv {
        width: 100%;
        height: 100%;
        background-image: url(${props =>  props.imgurl.replaceAll("\\" , "/")});
            // 이미지 태그에서는 되는데 여기서는 안됨 => 역슬래시 때문에 안됨 **************
        background-size: cover;
        background-position: 50%;
    }
`;

const ReportListItem = ( {a, b, c} ) => {
        // 4. 전달한 데이터를 받아줌
        
    return (
        <StyledWrapDiv imgurl={b}>
            <div className='imgDiv' name='reportNo' value={c}>console.log({c});</div>
                {/* 
                    5. 전달받은 데이터를 각각 입력 a=제목, b=경로, c=pk
                    6. 근데 화면 출력 안됨 ... 왜? **************
                      ㄴ패치함수는 비동기적으로 작동하기 때문에.. => useState();
                     => 7. ReportList.jsx
                */}
            <span>{a}</span>
        </StyledWrapDiv>
    );
};

export default ReportListItem;