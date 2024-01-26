import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyeldWrapDiv = styled.div`
    width: 100%;
    height: 50%;

    .wrap {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    td, th, table{
        border: 1px solid black;
    }

    table {
        width: 80%;
        height: 1px;
        text-align: center;
    }

    tbody > tr {
        height: 30px;
        cursor: pointer;
    }
    tbody > tr:hover {
        height: 30px;
        cursor: pointer;
        background-color: #f0e4ff;
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