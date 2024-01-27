import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyeldWrapDiv = styled.div`
    width: 100%;
    height: 425px;

    .wrap {
        width: 100%;
        height: 420px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    td, th, table{
        /* border: 1px solid black; */
    }

    table {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        width: 500px;
        height: 500px;
        height: auto;
        text-align: center;
        padding-top: 7px;
    }

    thead {
        border: 1px solid #ddd;
    }
    thead > tr {
        height: 30px;
        border-bottom: 1px solid #ddd;
    }

    tbody > tr {
        height: 35px;
        cursor: pointer;

        & > td:nth-of-type(1) {
            width: 30px;
            height: 45px;
        } 
        & > td:nth-of-type(2) {
            width: 40px;
        } 
        & > td:nth-of-type(3) {
            width: 30px;
        } 
    }
    tbody > tr:hover {
        cursor: pointer;
        /* font-weight: bold; */
        background-color: #f8f2ff;
    }
`;




const AdminVisitReservationListItem = ( {arr} ) => {



    const navigate = useNavigate();
    const handleDetail = (item) => {
        navigate('detail' , {state: {item}} );
    }





    return (
        <StyeldWrapDiv>
            <div className='wrap'>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>예약일</th>
                            <th>상태</th>
                        </tr>
                        <div className='line'></div>
                    </thead>
                    <tbody>
                        {
                            arr && arr.length > 0 && (
                                arr.map( (item) => 
                                    <tr key={item.visitNo} onClick={() => handleDetail(item)}>
                                        <td>{item.visitNo}</td>
                                        <td>{item.reservationDate}</td>
                                        <td>{item.reservationStatus}</td>
                                    </tr>
                                )
                            )
                        }
                    </tbody>
                </table>
            </div>
        </StyeldWrapDiv>
    );
};

export default AdminVisitReservationListItem;