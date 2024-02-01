import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledItemDiv = styled.div`
    width: 100%;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;

    img {
        width: 400px;
        height: 350px;
        transition: all 0.3s ease-in; /* 이미지 축소 효과를 위한 트랜지션 */
    }
    
    .imgDivWrap {
        width: 100%;
        height: 100%; /* 부모 div에도 크기 지정 */
        overflow: hidden; /* 이미지를 컨테이너 내에 감추기 */
    }  
    
    .imgDiv {
        width: 100%;
        height: 100%;
        background-image: url(${props => props.img.replaceAll("\\" , "/")});
        background-size: cover;
        background-position: 50%;
        margin-bottom: 15px;
        position: relative; /* 부모 컨테이너 기준으로 자식 컨테이너 위치 조정 */
    }

    .imgDiv:hover {
        filter: brightness(60%); /* 호버 시 흐린 효과 적용 */
        transform: scale(1.05); /* 호버 시 이미지 확대 효과 */
        transition: transform .5s; /* 시간 설정 */
    }

    form {
        width: 100%;
        height: 160px;
        text-align: center;
        align-items: center; /* 세로 중앙 정렬을 위한 추가 */
        display: flex; /* 요소를 가로로 배열하기 위한 추가 */
        flex-direction: column; /* 세로 방향으로 배치하기 위한 추가 */
        justify-content: center; /* 가로 중앙 정렬을 위한 추가 */
    }

    form tr {
    display: flex; /* 요소를 가로로 배열하기 위한 추가 */
    align-items: center; /* 세로 중앙 정렬을 위한 추가 */
    justify-content: center; /* 가로 중앙 정렬을 위한 추가 */
    }

    .con {
        padding: 10px 0 30px 0;
        font-size: 14px;
    }

    tr:nth-child(2){
        font-size: 12.8px;
        margin-bottom: 15px;
    }

    td:nth-child(2) {
        margin-left: 120px;
    }

    h5{ margin: 0; }
    .tit { margin-top: 10px; font-size: 17px; }
    .content { font-size: 13.5px; padding: 7px 20px 5px 20px; }

`;

const AdoptionNewsListItem = ( {a, b, c, d, e, f, vo} ) => {


    const navigate = useNavigate();

    const handleClickDetail = (vo) => {
        navigate( "/board/adoptionNews/detail", { state: {vo} } );
    }

    return (
        <StyledItemDiv img={a} value={f} onClick={ () => handleClickDetail(vo) } >
            <div className='imgDivWrap'>
                <div className='imgDiv'></div>
                {/* {
                    5. 전달받은 데이터를 각각 입력 a=제목, b=경로, c=pk
                    6. 근데 화면 출력 안됨 ... 왜? **************
                    ㄴ패치함수는 비동기적으로 작동하기 때문에.. => useState();
                    => 7. AdoptionList.jsx
                } */}
            </div>
            <form>
                <tr className='con'>
                    <td>{c}</td>
                </tr>
                <tr className='info'>
                    <td>{d}</td>
                    <td>{e}</td>
                </tr>
            </form>
        </StyledItemDiv>
    );
};

export default AdoptionNewsListItem;