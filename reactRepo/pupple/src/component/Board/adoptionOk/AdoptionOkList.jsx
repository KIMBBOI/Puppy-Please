import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AdoptionOkListItem from './AdoptionOkListItem';
import AdoptionOkPageItem from './AdoptionOkPageItem';

const AdoptionOkListDiv = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px 0 40px 0;

    .tit {
      margin: 0 0 30px 20px;
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
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1); /* 그림자 스타일 조정 */
    }

    span {
        padding: 6px;
        font-size: 14px;
    }
    
`;


const AdoptionOkList = () => {

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
    // let adoptionCompleteYn = 'Y';
    

    useEffect(() => {
      // 서버에서 데이터를 가져오는 비동기 함수 호출
      // 예: axios 또는 fetch를 사용하여 데이터를 가져옴
      // 가져온 데이터를 setAdoptionData로 설정
      fetch(`http://127.0.0.1:8080/app/adoptionOk/list?pno=${pno}`)
      .then( (resp) => {return resp.json()} )
      .then( (data) => {
          setArr(data.voList)
          setPvo(data.pvo);
    } )
    ;

}, [pno]);


    return (
      <>
          <AdoptionOkListDiv>
              <div className='tit'>입양완료 페이지</div>
              <div className='wrap'>
                {
                    arr.map((vo) => {
                        return (
                            <AdoptionOkListItem 
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
                  <AdoptionOkPageItem pvo={pvo} />
              </div>
          </AdoptionOkListDiv>
      </>
    );

};

export default AdoptionOkList;
