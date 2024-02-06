import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VisitReservationPageItem from './VisitReservationPageItem';
import { useLocation, useParams } from 'react-router-dom';
import AdminVisitReservationListItem from './AdminVisitReservationListItem';

const StyledAdminVisitReservation = styled.div`
    width: 100%;
    height: 100%;

    span {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    h2 {
        text-align: left;
        width: 493px;
    }
    
    .clicked {
        color: black !important;
        font-weight: bold;
    }

    .filterArea {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* margin-top: 25px; */
    }

    .topArea {
        border-top: 1px solid #ddd;
        width: 500px;
        display: flex;
        flex-direction: row;
        /* justify-content: space-between; */
        font-size: 19px;

        & > div:nth-of-type(1) {
            & > input[type=checkbox] {
                display: none;
            }
            & > label { 
                color: #acacac;
                display:inline-block; 
                margin:0;
                text-transform:uppercase; 
                margin: 10px 10px 10px 10px;
            }
            & > label:hover {
                color: #000000d1;
                font-weight: bold;
                cursor: pointer;
            }
            & > label:after {
                display:block;
                content: '';
                border-bottom: solid 3px #ea2129;  
                transform: scaleX(0);  
                transition: transform 250ms ease-in-out;
            }
            & > label:hover:after { 
                transform: scaleX(1); 
            }
        }
        
        & > div:nth-of-type(2) {
            & > input[type=checkbox] {
                display: none;
            }
            & > label { 
                color: #acacac;
                display:inline-block; 
                margin:0;
                text-transform:uppercase; 
                margin: 10px 10px 10px 10px;
            }
            & > label:hover {
                color: #000000d1;
                font-weight: bold;
                cursor: pointer;
            }
            & > label:after {
                display:block;
                content: '';
                border-bottom: solid 3px #ea2129;  
                transform: scaleX(0);  
                transition: transform 250ms ease-in-out;
            }
            & > label:hover:after { 
                transform: scaleX(1); 
            }
        }
    }

    .bottomArea {
        border-top: 1px solid #ddd;
        width: 500px;
        height: 50px;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        justify-content: left;
        align-items: center;
        padding-top: 7px 0 7px 0;

        & > div > input[type=checkbox] {
            width: 17px;
            height: 17px;
            margin: 10px 5px 10px 10px;
            cursor: pointer;
            border-color: #ddd;
            position: relative;
            top: 2px;
        }
        & > div > label {
            cursor: pointer;
            padding: 8px 8px 8px 0;
            box-sizing: border-box;
            line-height: 30px;
        }
    }
`;



const AdminVisitReservationList = () => {

    

    const { pno } = useParams(); 
    if (!pno) { 
        pno = 1; 
    }
    

    
    const [arr, setArr] = useState([]);
    const [pvo, setPvo] = useState({});  
    // vo 초기값 ( 최신순 , 전체조회 )   
    const [vo, setVo] = useState({
        orderBy: 'visitNo',
        reservationStatus: '',
        pno: pno || 1,
    });
    
    
    
    // className 부여
    const [clickOrderBy, setClickOrderBy] = useState('');
    const [clickReservDate, setClickReservDate] = useState('');
    // 필터 변수
    const [orderBy, setOrderBy] = useState();
    const [reservationStatus, setReservationStatus] = useState();
    


    // 정렬 함수 호출 (OrderBy)
    const handleOrderBy = (selectOrderBy) => {
        // state 할당
        setOrderBy(selectOrderBy);
        setVo((vo) => ({
            ...vo,
            orderBy: selectOrderBy,
        }));
        if (selectOrderBy === 'visitNo') {
            // className 부여
            setClickOrderBy('visitNo');
            setClickReservDate('');
        } else if (selectOrderBy === 'reservationDate') {
            // className 부여
            setClickOrderBy('');
            setClickReservDate('reservationDate');
        }
    };



    // 필터 함수 호출 (option)
    const handleStatus = (selectOption) => {
        // state 할당
        setReservationStatus(selectOption);
        setVo((vo) => ({
            ...vo,
            reservationStatus: selectOption,
            pno: 1, // 조회옵션 변경시 1페이지 부터
        }));
    };





    // 초기실행, pno변경 시 실행 ( 기본 필터 = 최신순 , 전체 )
    useEffect(() => {
        setVo(vo => ({
            ...vo,
            pno: pno || 1,
            // reservationStatus: '',
        }));
        setClickOrderBy('visitNo'); // className 부여
        if (clickReservDate === 'reservationDate') {
            setClickOrderBy('');
            setClickReservDate('reservationDate');
        }
        // console.log('clickOrderBy :::',clickOrderBy);
        // console.log('clickReservDate :::',clickReservDate);
        // console.log('@@@@@@@@@@정렬기준@@@@@@@@@@');
    }, [pno]);



    // 초기실행, vo업데이트 시 실행
    useEffect( () => {
        fetch('http://127.0.0.1:8080/app/admin/reservationList' , {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            setArr(data.voList);
            setPvo(data.pvo);
        } )
        ;
    }, [vo] );


// console.log('vo :::',vo);
// console.log('11111111111111111111111111111111111111111111111');
    return (
        <StyledAdminVisitReservation>
            <span><h2>방문예약관리</h2></span>
            <div className='filterArea'>
                <div className='topArea'>
                    <div>
                        <input 
                            type="checkbox" 
                            name="orderBy" 
                            checked={orderBy === 'visitNo'} // 정렬 옵션이 넘버면 활성화
                            onChange={() => handleOrderBy('visitNo')} 
                            id='latest' />
                        <label for='latest' className={`clickable-text ${clickOrderBy === 'visitNo' ? 'clicked' : ''}`}>최신순</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            name="orderBy" 
                            checked={orderBy === 'reservationDate'} 
                            onChange={() => handleOrderBy('reservationDate')} 
                            id='earlyDate' />
                        <label for='earlyDate' className={`clickable-text ${clickReservDate === 'reservationDate' ? 'clicked' : ''}`}>예약순</label>
                    </div>
                </div>

                <div className='bottomArea'>
                    <div>
                        <input 
                            type="checkbox" 
                            name="reservationStatus"        
                            checked={reservationStatus === '' || reservationStatus === undefined} // undefined : 초기값 없어도 체크
                            onChange={() => handleStatus('')} 
                            id='all'/>
                        <label for='all'>전체조회</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            name="reservationStatus" 
                            checked={reservationStatus === '예약 중'} 
                            onChange={() => handleStatus('예약 중')} 
                            id='progress'/>
                        <label for='progress'>예약 중</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            name="reservationStatus" 
                            checked={reservationStatus === '상담 완료'} 
                            onChange={() => handleStatus('상담 완료')} 
                            id='complete'/>
                        <label for='complete'>상담 완료</label>
                    </div>
                    <div>
                        <input 
                            type="checkbox" 
                            name="reservationStatus" 
                            checked={reservationStatus === '예약 취소'} 
                            onChange={() => handleStatus('예약 취소')} 
                            id='quit'/>
                        <label for='quit'>예약 취소</label>
                    </div>
                </div>
            </div>
            
            <AdminVisitReservationListItem key="adminListItemKey" arr={arr} />
            <VisitReservationPageItem key="pageItemKey" pvo={pvo} reservationStatus={reservationStatus} /> 
        </StyledAdminVisitReservation>
    );
};

export default AdminVisitReservationList;