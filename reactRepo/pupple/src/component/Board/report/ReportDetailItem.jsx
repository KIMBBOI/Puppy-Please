import React from 'react';
import styled from 'styled-components';

const StyeldDitailDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    place-items: center center;
    text-align: center;
    

    & > div {
        width: 100%;
        height: 100%;
    }

    img {
        width: 100%;
        height: auto;
        margin: 0 auto;
    }

    .controllArea {
        display: flex;
        justify-content: right;
    }

    button {
        width: 10%;
        height: 100%;
        margin-left: 10px;
    }

`;



const ReportDetailItem = ( {vo} ) => {
    return (
        <StyeldDitailDiv>
            <div className='boardArea'>
                <div><h1>{vo.title}</h1></div>
                <img 
                    src={vo.imagePath}
                    alt={'imageNo' + vo.imageNo}
                    // 5. 전달받은 데이터를 각각 입력 a=제목, b=경로
                    // 6. 근데 화면 출력 안됨 ... 왜? **************
                    //   ㄴ패치함수는 비동기적으로 작동하기 때문에.. => useState();
                    //   => 7. GalleryListItem.jsx
                />
                <div><h3>{vo.content}</h3></div>
            </div>
            <div className='controllArea'>
                <button>수정</button>
                <button>삭제</button>
            </div>
        </StyeldDitailDiv>
    );
};

export default ReportDetailItem;