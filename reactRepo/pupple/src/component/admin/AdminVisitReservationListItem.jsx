import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyeldWrapDiv = styled.div`
    width: 100%;
    height: 90%;
    cursor: pointer;

    .wrap {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }

    td, th, table{
        border: 1px solid black;
    }

    td {
        height: 12.5%;
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
                {arr && arr.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>예약일</th>
                                <th>상태</th>
                                <th>삭제여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arr.map( (item) => 
                                    <tr key={item.visitNo} onClick={() => handleDetail(item)}>
                                        <td>{item.visitNo}</td>
                                        <td>{item.reservationDate}</td>
                                        <td>{item.reservationStatus}</td>
                                        <td>{item.delYn}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                )}
            </div>
        </StyeldWrapDiv>
    );
};

export default AdminVisitReservationListItem;