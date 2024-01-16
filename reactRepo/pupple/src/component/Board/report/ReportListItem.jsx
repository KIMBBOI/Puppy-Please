import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledWrapDiv = styled.div`
    width: 24%;
    height: 48%;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-align: center;

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

    span {
        width: 100%;
        height: 15%;
    }
`;





const ReportListItem = ( {a, b, c, vo} ) => {
        // 4. 전달한 데이터를 받아줌
        


    const navigate = useNavigate();
    const handleDetail = (vo) => {
        navigate("/board/report/detail", {state: {vo}} );
            // {state: {vo, title:'zzz'}} } -> 객체와 변수 같이 전달 가능
    }



    return (
        <StyledWrapDiv imgurl={b} name='reportNo' value={c} onClick={ () => handleDetail(vo) }>
            <div className='imgDiv'></div>
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