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
    table-layout: fixed;
    

    .mark {
        margin: 0 0 0 20px;
        font-size: 24px;
        color: #333;
    }

    button {
        width: 550px;
        height: 400px;
        font-size: 14px;
        font-weight: 500;
        border: 1.5px solid #d1b8ffe9;
        border-radius: 20px;
        color: #ffff;
        background-color: #d1b8ffe9;
        cursor: pointer;
    }

    .writeBtn {
        display: flex;
        justify-content: end;
    }
    
    .wrap {
        display: grid;
        gap: 50px; /* 열과 행 사이의 간격 조절 */
        padding: 30px 0;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr; 
        place-items: center center;
        cursor: pointer;
    }

    .wrap > div {
        border: 1px solid #dddddd;
        border-radius: 4px;
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1); /* 그림자 스타일 조정 */
    }

    .footer {
        align-items: center;
        margin-top: 20px;
    }

    span {
        margin-bottom: 13px;
    }

    .btn{
        width: 105px;
        height: 35px;
    }

`;

const AdoptionNewsList = () => {
    
    const navigate = useNavigate();
    
    const loginMemberVo = JSON.parse(sessionStorage.getItem("loginMemberVo"));
    
    // loginMemberVo에서 memberNo와 loginAdminVo를 확인
    const memberNo = loginMemberVo ? loginMemberVo.memberNo : null;
    const loginAdminVo = loginMemberVo ? loginMemberVo.loginAdminVo : null;

    // '작성하기' 버튼을 표시할 조건: loginMemberVo가 존재하고 loginAdminVo가 1이 아닌 경우
    const showWriteButton = !!loginMemberVo && loginAdminVo !== 1;


    
    // 현재 페이지의 URL을 가져옴
    const currentUrl = window.location.href;
        console.log('currentUrl :::',currentUrl);
    // URL 객체 생성 ( 현재 URL 파싱 )
    const url = new URL(currentUrl);
        console.log('url :::',url);
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
            console.log("List Data:", data); // 데이터 콘솔 출력
            setArr(data.voList);
            setPvo(data.pvo);
        } )
        ;
    } , [pno] );


    return (
        <>
            <StyledAdoptionNewsListDiv>
                <div className='mark'>입양 후 소식</div>
                <div className='writeBtn'>
                { showWriteButton && (
                    <button className='btn' onClick={ () => navigate("/board/adoptionNews/write") }>작성하기</button>
                )}
                </div>
                <div className='wrap'>
                    {
                        arr.map( (vo) => {
                            return (
                                <AdoptionNewsListItem 
                                    key={vo.newsAfterAdoptionNo} 
                                    a={vo.imagePath}  
                                    b={vo.title}
                                    c={vo.content}
                                    d={vo.writerNick}
                                    e={vo.enrollDate}
                                    f={vo.newsAfterAdoptionNo} 
                                    vo={vo} 
                                />
                            )
                        } )
                    }
                </div>
                <div className='footer'>
                    <AdoptionNewsPageItem pvo={pvo} />
                </div>
            </StyledAdoptionNewsListDiv>
        </>
    );
};

export default AdoptionNewsList;