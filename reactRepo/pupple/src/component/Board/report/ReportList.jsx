import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReportListItem from './ReportListItem';
import { useNavigate } from 'react-router-dom';

const StyledReportListDiv = styled.div`
    /* width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 4fr 4fr 1fr 1fr;
    grid-gap: 5px;
    place-items: center center; */
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 4.5fr 4.5fr 1fr;
    grid-gap: 5px;
    place-items: center center;

    & > button {
        grid-column: span 3;
        width: 100%;
    }
`;


const ReportList = () => {

        // let arr = [];
        let [arr, setArr] = useState([]);
        // 7. uesState 사용

    useEffect( () => {
        // 11. useEffect : 렌더링 한번만
        //    ㄴ전달값으로 함수나 배열을 전달할 수 있음
        // 12. 페이징 처리 시 [] 에 currentPage 를 넣을 수 있음

        fetch("http://127.0.0.1:8080/app/report/list")
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
            // < GalleryListItem 컴포넌트로 값을 넘겨주기 >
            // arr = data.voList;
                // 1. arr 배열에 voList 를 할당
            setArr(data.voList);
                // 8. useState 로 변경
        } )
        ;
    }, [] );
    // 9. 배열은 컴포넌트가 처음 마운트될 때만 실행되도록 함

    const navigate = useNavigate();
        // 13. 작성하기 누르면 페이지 전환


    return (
        <StyledReportListDiv>
                {
                    arr.map( (vo) => {
                        console.log('a : ' + vo.title);
                        console.log('b : ' + vo.imagePath);
                        return <ReportListItem key={vo.reportNo} a={vo.title} b={vo.imagePath} />;
                        // 2. map 함수를 이용해서 각각의 객체로 새로운 배열(voList 가 아닌 컴포넌트로 구성됨)로 만들어줌
                        // 3. 배열만큼 각각의 컴포넌트(GalleryListItem)를 만들면서 데이터를 전달
                        //   => 4. GalleryListItem.jsx

                        // 10. 브라우저 오류 해결 - GalleryList.jsx:32 Warning: Each child in a list should have a unique "key" prop. 
                        //   ㄴ key 값을 전달하면서 넘겨주면 됨. 
                    } )
                }
                <button onClick={ () => {
                    navigate("/report/write");
                } }>작성하기</button>
        </StyledReportListDiv>
    );
};

export default ReportList;