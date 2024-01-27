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



const AdminVisitReservationList = () => {
    console.log("컴포넌트 호출됨 ~~~~~~~~~~~~~~~~~~~~~~");
    const { pno } = useParams(); 
    if (pno === null) {
        pno = 1;
    }
    console.log('useParams pno :::', pno);



    // const location = useLocation();
    //     console.log('location :::',location);
    // const pathArray = location.pathname.split('/');
    //     console.log('pathArray :::',pathArray);   
    // const pno = pathArray[pathArray.length - 1];
    //     console.log('pno :::', pno);
    
    
    
    const [orderBy, setOrderBy] = useState();
    const [reservationStatus, setReservationStatus] = useState();
    let [arr, setArr] = useState([]);
    let [pvo, setPvo] = useState({});      
    
    

    const [vo, setVo] = useState({
        orderBy: 'visitNo',
        reservationStatus: '',
        pno: pno || 1,
    });
  
    
    
    
    
    useEffect(() => {
        setVo(prevVo => ({
            ...prevVo,
            pno: pno || 1,
        }));
    }, [pno]);
    
    
    
    useEffect( () => {
        console.log("useEffect called......@@@@@@@@@@@@@@@@@@@");
        console.log("useEffect called......@@@@@@@@@@@@@@@@@@@");
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
            console.log('@@@@@@@@@@@@@@data@@@@@@@@@@@@@@ :::',data);
            setArr(data.voList);
            setPvo(data.pvo);
        } )
        ;
        console.log(pno);
        console.log("useEffect called......@@@@@@@@@@@@@@@@@@@");
        console.log("useEffect called......@@@@@@@@@@@@@@@@@@@");
        console.log("useEffect called......@@@@@@@@@@@@@@@@@@@");
    }, [vo] );





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





    const handleCheckOrderBy = (option) => {
        setOrderBy(option);
        setVo((vo) => ({
            ...vo,
            orderBy: option,
        }));
        console.log('handleCheckOrderBy :::',vo);
    };
    const handleCheckStatus = (option) => {
        setReservationStatus(option);
        setVo((vo) => ({
            ...vo,
            reservationStatus: option,
        }));
        console.log('reservationStatus :::',vo);
    };





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
                    <input type="checkbox" name="reservationStatus" checked={reservationStatus === ''} onChange={() => handleCheckStatus('')} id='all'/>
                    <label for='all'>전체조회</label>

                    <input type="checkbox" name="reservationStatus" checked={reservationStatus === '예약 중'} onChange={() => handleCheckStatus('예약 중')} id='progress'/>
                    <label for='progress'>예약 중</label>

                    <input type="checkbox" name="reservationStatus" checked={reservationStatus === '상담 완료'} onChange={() => handleCheckStatus('상담 완료')} id='complete'/>
                    <label for='complete'>상담 완료</label>

                    <input type="checkbox" name="reservationStatus" checked={reservationStatus === '예약 취소'} onChange={() => handleCheckStatus('예약 취소')} id='quit'/>
                    <label for='quit'>예약 취소</label>
                </div>
            </div>
            <AdminVisitReservationListItem key="adminListItemKey" arr={arr} />
            <VisitReservationPageItem key="pageItemKey" pvo={pvo} /> 
        </StyledAdminVisitReservation>
    );
};

export default AdminVisitReservationList;