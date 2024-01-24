import React, { useState, useEffect } from 'react';
import AdoptionListItem from './AdoptionListItem';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdoptionPageItem from './AdoptionPageItem';
// import Modal from 'react-modal';


const StyledAdoptionListDiv = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px 0 40px 0;

    .tit {
      margin: 0 0 30px 20px;
      /* display: none; */
    }

    button {
        width: 110px;
        height: 36px;
        font-size: 14px;
        font-weight: 545;
        border: 1.5px solid #d1b8ffe9;
        border-radius: 20px;
        color: #ffff;
        background-color: #d1b8ffe9;
    }

    .writeBtn {
        display: flex;
        justify-content: end;
    }

    .wrap {
        /* border: 1px solid gray; */
        display: grid;
        gap: 80px 50px; /* 열과 행 사이의 간격 조절 */
        padding: 30px 0;
        /* grid-template-rows: 1.5fr;  */
        grid-template-columns: 6fr 7fr 6fr;
        // grid-template-columns: repeat(3, 1fr); 3개의 열로 구성
        
        place-items: center center;
        
    }

    .wrap > div {
        border: 1px solid #e6e6e6;
        border-radius: 4px;
    }

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
                <div className='tit'>입양신청 페이지</div>
                <div className='writeBtn'>
                    <button onClick={ () => {
                        navigate("/board/adoption/write");
                    } }>등록하기</button>
                </div>
                <div className='wrap'>
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
                                    h={vo.adoptionBoardNo}
                                    vo={vo}
                                />
                            )
                        } )
                    }
                </div>
                <div className='footer'>
                    <AdoptionPageItem pvo={pvo} />
                </div>
            </StyledAdoptionListDiv>
        </>
    );
};

export default AdoptionList;