import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import VisitReservationPageItem from './VisitReservationPageItem';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AdminVisitReservationListItem from './AdminVisitReservationListItem';

const StyledAdminVisitReservation = styled.div`
    width: 100%;
    height: 500px;

    .filterArea {
        width: 100%;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;



const AdminVisitReservationList = ({pno}) => {
    console.log("컴포넌트 호출됨 ~~~~~~~~~~~~~~~~~~~~~~");
    console.log(pno);
    // const navigate = useNavigate();
    // useLocation();


    const [orderBy, setOrderBy] = useState('visitNo');
    const [reservationStatus, setReservationStatus] = useState('');


    let [arr, setArr] = useState([]);
    let [pvo, setPvo] = useState({});                                    
    // if (pno === null) {
    //     pno = 1;
    // }
    console.log(pno);
    // const location = useLocation();
    //     console.log('location :::',location);
    //     console.log('location.search :::',location.search);
    // const queryParams = new URLSearchParams(location.search);
    //     console.log('queryParams :::',queryParams);
    // const pno = queryParams.get('pno') || 1; // Default to page 1 if "pno" is not present


    
    // 초기 상태로 사용할 vo 객체 정의
    const [vo, setVo] = useState({
        orderBy: 'visitNo',
        reservationStatus: '',
        pno: pno || 1,
    });
    console.log(pno);
    console.log('vo.pno :::', vo.pno);
    

    
    useEffect( () => {
        console.log("useEffect called......@@@@@@@@@@@@@@@@@@@");
        console.log(pno);
        fetch('http://127.0.0.1:8080/app/admin/reservationList' , {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
            setArr(data.voList);
            setPvo(data.pvo);
        } )
        ;
        console.log(pno);
    }, [pno, vo] );
    console.log(pno);





    const handleCheckOrderBy = (option) => {
        setOrderBy(option);
        setVo((prevVo) => ({
            ...prevVo,
            orderBy: option,
        }));
        console.log('handleCheckOrderBy :::',vo);
    };

    const handleCheck = (option) => {
        setReservationStatus(option);
        setVo((prevVo) => ({
            ...prevVo,
            reservationStatus: option,
        }));
        console.log('reservationStatus :::',vo);
    };



    // const handleDelete = (vo) => {
        // fetch("http://127.0.0.1:8080/app/report" , {
        //     method: 'delete',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(vo)
        // })
    //     .then( resp => resp.json() )
    //     .then( data => {
    //         if (data.msg === 'success') {
    //             alert('게시글 삭제 성공 !');
    //             navigate("/board/report/list");
    //         } else {
    //             alert('게시글 삭제 실패 ...');
    //             navigate(-1)
    //         }
            
    //     } )
    // }




    return (
        <StyledAdminVisitReservation>
            <div className='filterArea'>
                <div>
                    <input type="checkbox" name="orderBy" checked={orderBy === 'visitNo'} onChange={() => handleCheckOrderBy('visitNo')} id='latest'/>
                    <label for='latest'>최신순</label>

                    <input type="checkbox" name="orderBy" checked={orderBy === 'reservationDate'} onChange={() => handleCheckOrderBy('reservationDate')} id='earlyDate'/>
                    <label for='earlyDate'>예약일</label>
                </div>
                <div>
                    <input type="checkbox" name="reservationStatus" checked={reservationStatus === ''} onChange={() => handleCheck('')} id='all'/>
                    <label for='all'>전체조회</label>

                    <input type="checkbox" name="reservationStatus" checked={reservationStatus === '예약 중'} onChange={() => handleCheck('예약 중')} id='progress'/>
                    <label for='progress'>예약 중</label>

                    <input type="checkbox" name="reservationStatus" checked={reservationStatus === '상담 완료'} onChange={() => handleCheck('상담 완료')} id='complete'/>
                    <label for='complete'>상담 완료</label>

                    <input type="checkbox" name="reservationStatus" checked={reservationStatus === '상담 취소'} onChange={() => handleCheck('상담 취소')} id='quit'/>
                    <label for='quit'>상담 취소</label>
                </div>
            </div>
            <AdminVisitReservationListItem arr={arr} />
            <VisitReservationPageItem pvo={pvo} /> 
        </StyledAdminVisitReservation>
    );
};

export default AdminVisitReservationList;