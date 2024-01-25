import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AdminPageMainSidebar from './AdminPageMainSidebar';

const StyeldAdminVisitReservationListItemDetailDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fcfcfc;

    & > div {
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        display: flex;

        & > div:nth-of-type(1) {
            text-align: center;
        }
        & > div:nth-of-type(2) {
            padding-left: 40px;
        }
    }
`;


const AdminVisitReservationListItemDetail = () => {
    const location = useLocation();
    const vo = location.state.item;

    return (
        <>
            <AdminPageMainSidebar />
            <StyeldAdminVisitReservationListItemDetailDiv>
                <div>
                    <div>
                        <div>글번호</div>
                        <div>예약일시</div>
                        <div>예약상태</div>
                        <div>이름</div>
                        <div>휴대폰</div>
                        <div>신청일</div>
                        <div>수정일</div>
                        <div>삭제여부</div>
                    </div>
                    <div>
                        <div>{vo.visitNo}</div>
                        <div>{vo.reservationDate}</div>
                        <div>{vo.reservationStatus}</div>
                        <div>{vo.name}</div>
                        <div>{vo.phoneNumber}</div>
                        <div>{vo.summitDate}</div>
                        {
                            vo.modifyDate === undefined 
                            ?
                                <div>수정 전</div>
                            : 
                                <div>{vo.modifyDate}</div>
                        }
                        <div>{vo.delYn}</div>
                    </div>
                </div>
            </StyeldAdminVisitReservationListItemDetailDiv>
        </>
    );
};

export default AdminVisitReservationListItemDetail;