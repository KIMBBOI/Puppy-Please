import React from 'react';
import styled from 'styled-components';

const StyledWrapDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
        /* width: 100%;
        height: auto; */
        width: 100%;
        height: 100%;
        margin: 0 auto;
        /* display: block; */
    }

    .hidden {
        display: none;
    }

    .imgDiv {
        width: 100%;
        height: 100%;
        /* overflow: hidden; */
        background-image: url(${props =>  props.imgUrl.replaceAll("\\" , "/")});
            // 이미지 태그에서는 되는데 여기서는 안됨 => 역슬래시 때문에 안됨 **************
        background-size: cover;
        background-position: 50%;
    }
`;

const ReportListItem = ( {a, b, c} ) => {
        // 4. 전달한 데이터를 받아줌
        
    return (
        <StyledWrapDiv imgUrl={b}>
            <div className='imgDiv'>
            </div>
            {/* <img 
                src={b}
                alt='엑박 시 문구ㅋㅋ'

            /> */}
            <div className='hidden' name='reportNo' >{c}</div>
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