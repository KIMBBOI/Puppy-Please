import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledAdminPageSidebarDiv = styled.div`
    width: 250px;
    height: 300px;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
    align-items: center;
    justify-content: flex-start;
`;

const SidebarItem = styled.div`
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
        a {
            text-decoration: none;
            color: #333;

            &:hover {
                color: #555;
            }
        }

    .myReservation:hover {
        cursor: pointer;
        color: #555;
    }
`;

const AdminPageMainSidebar = () => {
    return (
        <StyledAdminPageSidebarDiv>
            <SidebarItem>관리자 메뉴</SidebarItem>
            <SidebarItem>
                <Link to ="/admin/adoptList">입양신청목록</Link>
            </SidebarItem>
            <SidebarItem>
                <Link to ="/admin/visitReservation">방문예약관리</Link>
            </SidebarItem>
            
        </StyledAdminPageSidebarDiv>
    );
};

export default AdminPageMainSidebar;
