import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdoptionNewsListItem from './AdoptionNewsListItem';
import { useNavigate } from 'react-router-dom';
import AdoptionNewsPageItem from './AdoptionNewsPageItem';

const StyledAdoptionNewsListDiv = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px 0 40px 0;

    .tit {
        margin: 0 0 30px 20px;
    }
    
    .wrap {
        display: grid;
        // grid-template-columns: repeat(3, 1fr); 3개의 열로 구성
        gap: 50px; /* 열과 행 사이의 간격 조절 */
        padding: 30px 0;
        grid-template-columns: 6fr 7fr 6fr;
        grid-template-rows: 1fr; 
        place-items: center center;
        
    }

    .wrap > div {
        border: 1px solid #e6e6e6;
    }

    .footer {
        align-items: center;
    }

    span {
        margin-bottom: 13px;
    }

    
`;

const AdoptionNewsList = () => {
    
    const loginInfo = sessionStorage.getItem("loginMemberVo");
    const navigate = useNavigate();
    
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



    useEffect( () => {
        // 11. useEffect : 렌더링 한번만
        //    ㄴ전달으로 함수나 배열을 전달할 수 있음
        // 12. 페이징 처리 시 [] 에 currentPage 를 넣을 수 있음

        fetch(`http://127.0.0.1:8080/app/adoptionNews/list?pno=${pno}`)
        .then( (resp) => {return resp.json()} )
        .then( (data) => {
            // < AdoptionNewsListItem 컴포넌트로 값을 넘겨주기 >
            // arr = data.voList;
            setArr(data.voList);
            setPvo(data.pvo);
        } )
        ;
    } , [pno] );


    return (
        <>
            <StyledAdoptionNewsListDiv>
                <div className='tit'>입양 후 소식</div>
                <div className='wrap'>
                    {
                        arr.map( (vo) => {
                            return (
                                <AdoptionNewsListItem 
                                    key={vo.newsAfterAdoptionNo} 
                                    a={vo.imagePath}  
                                    b={vo.title}
                                    c={vo.content}
                                    d={vo.newsAfterAdoptionNo} 
                                    vo={vo} 
                                />
                            )
                        } )
                    }
                </div>
                <div className='body'>
                    { loginInfo ? (
                        <button onClick={ () => navigate("/board/adoptionNews/write") }>작성하기</button>
                    ) : (
                        <button onClick={ () => alert("로그인 후 이용바랍니다.") }>작성하기</button>
                    ) }
                </div>
                <div className='footer'>
                    <AdoptionNewsPageItem pvo={pvo} />
                </div>
            </StyledAdoptionNewsListDiv>
        </>
    );
};

export default AdoptionNewsList;