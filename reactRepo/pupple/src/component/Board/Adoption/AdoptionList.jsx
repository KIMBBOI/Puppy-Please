import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AdoptionListItem from './AdoptionListItem';

const StyledAdoptionListDiv = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 4.5fr 4.5fr 1fr;
    grid-gap: 5px;
    place-items: center center;

    & > button {
        /* grid-column: span 3;
        width: 30%; */
    }
    .category {
        /* width: auto;
        height: 30%;
        font-size: 16px;
        display: flex;
        flex-direction: row; */
        background-color: $bg-white;
        width: 100%;
        padding: 4rem;
        border-block: 1px solid $text-black;
        height: auto;
        position: relative;
        z-index: 4;
    }

    
`;

const AdoptionList = () => {

        // let arr = [];
        let [arr, setArr] = useState([]);
        // 7. uesState 사용

    useEffect( () => {
        // 11. useEffect : 렌더링 한번만
        //    ㄴ전달값으로 함수나 배열을 전달할 수 있음
        // 12. 페이징 처리 시 [] 에 currentPage 를 넣을 수 있음

        fetch("http://127.0.0.1:8080/app/api/adoption/list")
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
        <>
            <StyledAdoptionListDiv>
                {
                    arr.map( (vo) => {
                        console.log('a : ' + vo.imagePath);
                        console.log('b : ' + vo.name);
                        console.log('c : ' + vo.breed);
                        console.log('d : ' + vo.gender);
                        console.log('e : ' + vo.inoculation);
                        console.log('f : ' + vo.age);
                        console.log('g : ' + vo.weight);
                        return <AdoptionListItem key={vo.adoptionBoardNo} a={vo.imagePath} b={vo.name} c={vo.breed} d={vo.gender} e={vo.inoculation} f={vo.age} g={vo.weight} />;
                    } )
                }
                <button onClick={ () => {
                    navigate("/board/adoption/write");
                } }>등록하기</button>
                
               
            </StyledAdoptionListDiv>    
        </>
    );
};

export default AdoptionList;