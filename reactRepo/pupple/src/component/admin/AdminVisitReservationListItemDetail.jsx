import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AdminPageMainSidebar from './AdminPageMainSidebar';

const StyeldAdminVisitReservationListItemDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;
    
    .wrap {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;

        table {
            width: 100%;
            height: 80%;
            background-color: #f5f5f5;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            
            & > thead > tr {
                display: flex;
                flex-direction: column;
                background-color: #ffffff;
            }
            & > tbody > tr {
                padding-left: 30px;
                display: flex;
                flex-direction: column;
                background-color: #fafafa;
            }
        }
        .btnArea {
            width: 100%;
            height: 20%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #dddddd;

            button {
                width: 15%;
                height: 40%;
            }
        }
    }
`;


const AdminVisitReservationListItemDetail = () => {
    const location = useLocation();
    const vo = location.state.item;
    const [isOk, setIsOk] = useState(false);
    const [dbVo, setDbVo] = useState();
    


    function handleComplete(vo) {
        alert('완료 클릭ㅋㅋ');
        console.log(vo);

        fetch("http://127.0.0.1:8080/app/admin" , {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if (data.msg === 'success') {
                alert('성공 !');
                setIsOk(true);
                setDbVo(data.dbVo);
            } else {
                alert('실패 ...');
            }
        } )
    }



    function handleQuit(vo) {
        alert('취소 클릭ㅋㅋ');
        console.log(vo);
        
        fetch("http://127.0.0.1:8080/app/admin" , {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if (data.msg === 'success') {
                alert('성공 !');
                setIsOk(true);
                setDbVo(data.dbVo);
            } else {
                alert('실패 ...');
            }
        } )
    }




    return (
        <>
            <AdminPageMainSidebar />
            <StyeldAdminVisitReservationListItemDetailDiv>
                <div className='wrap'>
                    <table>
                        <thead>
                            <tr>
                                <th>글번호</th>
                                <th>예약일시</th>
                                <th>예약상태</th>
                                <th>이름</th>
                                <th>휴대폰</th>
                                <th>신청일</th>
                                <th>수정일</th>
                                <th>삭제여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isOk 
                                ? 
                                    (
                                        <>
                                            <tr>
                                                <td>{dbVo.visitNo}</td>
                                                <td>{dbVo.reservationDate}</td>
                                                <td>{dbVo.reservationStatus}</td>
                                                <td>{dbVo.name}</td>
                                                <td>{dbVo.phoneNumber}</td>
                                                <td>{dbVo.summitDate}</td>
                                                    {
                                                        dbVo.modifyDate === undefined 
                                                        ?
                                                            <td>-</td>
                                                        : 
                                                            <td>{dbVo.modifyDate}</td>
                                                    }
                                                <td>{dbVo.delYn}</td>
                                            </tr>
                                        </>
                                    ) 
                                : 
                                    (
                                        <>
                                            <tr>
                                                <td>{vo.visitNo}</td>
                                                <td>{vo.reservationDate}</td>
                                                <td>{vo.reservationStatus}</td>
                                                <td>{vo.name}</td>
                                                <td>{vo.phoneNumber}</td>
                                                <td>{vo.summitDate}</td>
                                                {
                                                    vo.modifyDate === undefined 
                                                    ?
                                                        <td>-</td>
                                                    : 
                                                        <td>{vo.modifyDate}</td>
                                                }
                                                <td>{vo.delYn}</td>
                                            </tr>
                                        </>
                                    )
                            }
                        </tbody>
                    </table>
                    {
                        vo.delYn === 'N' && (
                            <div className='btnArea'>
                                <button onClick={ ()=>{handleComplete(vo)} }>상담 완료</button>
                                <button onClick={ ()=>{handleQuit(vo)} }>상담 취소</button>
                            </div>
                        )
                    }
                </div>
            </StyeldAdminVisitReservationListItemDetailDiv>
        </>
    );
};

export default AdminVisitReservationListItemDetail;