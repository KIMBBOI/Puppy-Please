import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VisitReservationPageItem from './VisitReservationPageItem';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminVisitReservationListItem from './AdminVisitReservationListItem';

const StyledAdminVisitReservation = styled.div`
    width: 100%;
    height: 100%;
`;

const AdminVisitReservationList = () => {
    // useNavigate();
    useLocation();

    
    let [arr, setArr] = useState([]);
    let [pvo, setPvo] = useState({});
    


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


    // const location = useLocation();
    //     console.log('location :::',location);
    //     console.log('location.search :::',location.search);
    // const queryParams = new URLSearchParams(location.search);
    //     console.log('queryParams :::',queryParams);
    // const pno = queryParams.get('pno') || 1; // Default to page 1 if "pno" is not present
    // // const [currentPage, setCurrentPage] = useState(parseInt(pno));
    // // console.log('pno :::',pno);
    
    
    useEffect( () => {
        fetch(`http://127.0.0.1:8080/app/admin?pno=${pno}`)
        .then( resp => resp.json() )
        .then( data => {
            setArr(data.voList);
            setPvo(data.pvo);
        } )
        ;
    }, [pno] );



    return (
        <StyledAdminVisitReservation>
           <AdminVisitReservationListItem arr={arr} />
            <VisitReservationPageItem pvo={pvo} />          
        </StyledAdminVisitReservation>
    );
};

export default AdminVisitReservationList;