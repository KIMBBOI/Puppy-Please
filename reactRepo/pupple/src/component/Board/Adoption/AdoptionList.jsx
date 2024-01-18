// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';
// import AdoptionListItem from './AdoptionListItem';

// const StyledAdoptionListDiv = styled.div`
//     width: 100%;
//     height: 1000px;
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     grid-template-rows: 1.5fr 1.5fr 1fr;
//     place-items: center center;

    
// `;

// const AdoptionList = () => {

//         // let arr = [];
//         let [arr, setArr] = useState([]);
//         // 7. uesState 사용

//     useEffect( () => {
//         // 11. useEffect : 렌더링 한번만
//         //    ㄴ전달값으로 함수나 배열을 전달할 수 있음
//         // 12. 페이징 처리 시 [] 에 currentPage 를 넣을 수 있음

//         fetch("http://127.0.0.1:8080/app/adoption/list")
//         .then( resp => resp.json() )
//         .then( data => {
//             console.log(data);
//             // < GalleryListItem 컴포넌트로 값을 넘겨주기 >
//             // arr = data.voList;
//                 // 1. arr 배열에 voList 를 할당
//             console.log(data);
//             setArr(data.voList);
//                 // 8. useState 로 변경
//         } )
//         ;
//     }, [] );
//     // 9. 배열은 컴포넌트가 처음 마운트될 때만 실행되도록 함

//     const navigate = useNavigate();
//     // 13. 작성하기 누르면 페이지 전환

//     return (
//         <StyledAdoptionListDiv>
//             {
//                 arr.map( (vo) => {
//                     return <AdoptionListItem key={vo.adoptionBoardNo} a={vo.imagePath} b={vo.name} c={vo.breed} d={vo.gender} e={vo.inoculation} f={vo.age} g={vo.weight} />;
//                 } )
//             }
//             <button onClick={ () => {
//                 navigate("/board/adoption/write");
//             } }>등록하기</button>
//         </StyledAdoptionListDiv>    
//     );
// };

// export default AdoptionList;

import React, { useState, useEffect } from 'react';
import AdoptionListItem from './AdoptionListItem';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdoptionPageItem from './AdoptionPageItem';

const StyledAdoptionListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3개의 열로 구성 */
    gap: 20px; /* 열과 행 사이의 간격 조절 */
    padding: 30px 0;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1.5fr 1.5fr 1.5fr; 
    place-items: center center;
    padding: 30px 0 30px 0;
`;

const AdoptionList = () => {

     // 현재 페이지의 URL을 가져옴
     const currentUrl = window.location.href;
     // URL 객체 생성 ( 현재 URL 파싱 )
     const url = new URL(currentUrl);
     // URLSearchParams 객체 생성 ( URL의 쿼리 문자열 추출 )
     const queryParams = new URLSearchParams(url.search);
     // 특정 쿼리스트링 파라미터 값 가져오기
     let pno = queryParams.get('pno');
     if (pno === null) {
         pno = 1;
     }
 


    let [arr, setArr] = useState([]);
    let [pvo, setPvo] = useState([]);

    // const [adoptionData, setAdoptionData] = useState([]);

    useEffect(() => {
        // 서버에서 데이터를 가져오는 비동기 함수 호출
        // 예: axios 또는 fetch를 사용하여 데이터를 가져옴
        // 가져온 데이터를 setAdoptionData로 설정
        fetch(`http://127.0.0.1:8080/app/adoption/list?pno=${pno}`)
        .then( (resp) => {return resp.json()} )
        .then( (data) => {
            setArr(data.voList)
            setPvo(data.pvo);
        } )
        ;
    
    }, [pno]);

    const navigate = useNavigate();

    return (
        <>
            <StyledAdoptionListDiv className="adoptionList">
                {
                    arr.map((vo) => {
                        return (
                            <AdoptionListItem 
                                key={vo.adoptionBoardNo} 
                                a={vo.imagePath} 
                                b={vo.dogName} 
                                c={vo.breed} 
                                d={vo.genderMf} 
                                e={vo.neuteringOx} 
                                f={vo.age} 
                                g={vo.weight} 
                            />
                        )
                    } )
                }
                <div>
                    <button onClick={ () => {
                        navigate("/board/adoption/write");
                    } }>등록하기</button>
                </div>
                <div className='footer'>
                    <AdoptionPageItem pvo={pvo} />
                </div>
            </StyledAdoptionListDiv>
        </>
    );
};

export default AdoptionList;
