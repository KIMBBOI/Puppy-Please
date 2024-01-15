import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReportListItem from './ReportListItem';
import { Link, useNavigate } from 'react-router-dom';

const StyledReportListDiv = styled.div`
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

    const currentUrl = window.location.href;

    // URL 객체 생성
    const url = new URL(currentUrl);
    // URLSearchParams 객체 생성
    const queryParams = new URLSearchParams(url.search);
    // 특정 쿼리스트링 파라미터 값 가져오기
    let pno = queryParams.get('pno');
    // 가져온 값 콘솔에 출력
    console.log('pno:', pno);
    if (pno === null) {
        pno = 1;
    }
    console.log(pno);

        // let arr = [];
        let [arr, setArr] = useState([]);
        let [pvo, setPvo] = useState({});
        // 7. uesState 사용

    useEffect( () => {
        // 11. useEffect : 렌더링 한번만
        //    ㄴ전달값으로 함수나 배열을 전달할 수 있음
        // 12. 페이징 처리 시 [] 에 currentPage 를 넣을 수 있음

        fetch(`http://127.0.0.1:8080/app/report/list?pno=${pno}`)
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
            // < GalleryListItem 컴포넌트로 값을 넘겨주기 >
            // arr = data.voList;
                // 1. arr 배열에 voList 를 할당
            setArr(data.voList);
            console.log(data.pvo);
            setPvo(data.pvo);
                // 8. useState 로 변경
            
        } )
        ;
    }, [pno] );
    // 9. 배열은 컴포넌트가 처음 마운트될 때만 실행되도록 함

    const navigate = useNavigate();
        // 13. 작성하기 누르면 페이지 전환


    return (
        <StyledReportListDiv>
            {
                arr.map( (vo) => {
                    return <ReportListItem key={vo.reportNo} a={vo.title} b={vo.imagePath} c={vo.reportNo} />;
                    // 2. map 함수를 이용해서 각각의 객체로 새로운 배열(voList 가 아닌 컴포넌트로 구성됨)로 만들어줌
                    // 3. 배열만큼 각각의 컴포넌트(GalleryListItem)를 만들면서 데이터를 전달
                    //   => 4. GalleryListItem.jsx

                    // 10. 브라우저 오류 해결 - GalleryList.jsx:32 Warning: Each child in a list should have a unique "key" prop. 
                    //   ㄴ key 값을 전달하면서 넘겨주면 됨. 
                } )
            }
            <button onClick={ () => {
                navigate("/board/report/write");
            } }>작성하기</button>
            {
                // for(let i = pvo.getStartPage(); i <= pvo.getEndPage(); i++) {
                //     if(i == pvo.getCurrentPage()) {
                //         <span> i </span>
                //     } else {
                //         <a href='/app99/board/list?pno='+ i > i </a>
                //     }
                // }

                Array.from({ length: pvo.endPage - pvo.startPage + 1 }, (_, index) => {
                        // ********************************************************************************
                    const pageNumber = pvo.startPage + index;
                    return (
                      <div key={pageNumber}>
                        {pageNumber === pvo.currentPage ? (
                          <div>{pageNumber}</div>
                        ) : (
                        //   <div onClick={ () => {
                        //     navigate(`/report/list?pno=${pageNumber}`);
                        //         // 11. 백틱 사용해야 올바름 템플릿 리터럴임. 참고할 것 ****************
                        //   }}>{pageNumber}</div>
                            //   <div onClick={ () => {
                            //     <Link to={`/report/list?pno=${pageNumber}`}></Link>
                            //   }}>{pageNumber}</div>
                                <Link to={`/board/report/list?pno=${pageNumber}`}>{pageNumber}</Link>
                                    // useNavigate 랑 Link to 이거 차이가 뭐지 ****************
                        //   <a href={`/app99/board/list?pno=${pageNumber}`}>{pageNumber}</a>
                        )}
                      </div>
                    );
                  })
            }
        </StyledReportListDiv>
    );
};

export default ReportList;