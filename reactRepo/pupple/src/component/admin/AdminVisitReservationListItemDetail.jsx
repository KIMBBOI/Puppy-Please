import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AdminPageMainSidebar from './AdminPageMainSidebar';

const StyeldAdminVisitReservationListItemDetailDiv = styled.div`
    width: 100%;
    height: 100%;    

    td, th {
        padding: 20px;
        border-bottom: 1px solid #ddd;
    }

    td {
        padding-left: 40px;
    }

    th {
        background-color: #fcf9ff;
        padding-right: 30px;
        padding-left: 30px;
    }

    span {
        padding-top: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    h2 {
        width: 650px;
        margin-left: 10px;
    }

    button {
        border-radius: 5px;
        background-color: #C8ADFF;
        color: white;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
        border: none;

        &:hover {
            background-color: #A080FF;
        }
    }

    .wrap {
        width: 100%;
        height: 600px;
        display: flex;
        flex-direction: column;
        

        & > div:nth-of-type(1) {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 65%;
            /* background-color: black; */
            

            & > div:nth-of-type(1) > {
                width: 100%;
                height: 100%;
                background-color: black;

                table {
                    padding-top: 30px;
                    width: 400px;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: right;

                    & > thead {
                        height: 100%;

                        & > tr {
                            display: flex;
                            flex-direction: column;
                            border-top: 1px solid #ddd;
                        }
                    }

                    & > tbody{
                        display: flex;

                        & > tr {
                            /* padding-left: 50px; */
                            display: flex;
                            flex-direction: column;
                            border-top: 1px solid #ddd;
                        }
                    }
                }    
            }


            &  div:nth-of-type(2) {

                table {
                    padding-top: 30px;
                    width: 400px;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    justify-content: left;

                    & > thead {
                        display: flex;

                        & > tr {
                        display: flex;
                        flex-direction: column;
                        border-top: 1px solid #ddd;
                        }
                    } 
                    & > tbody{
                        display: flex;

                        & > tr {
                            /* padding-left: 50px; */
                            display: flex;
                            flex-direction: column;
                            /* background-color: #fafafa; */
                            border-top: 1px solid #ddd;
                        }
                    }
                }    
            } 
        }
        

        & > div:nth-of-type(2) {
            display: flex;
            justify-content: center;
            width: 100%;
            height: 10%;
            /* margin-top: 20px; */

            & > div:nth-of-type(1) {
                /* border-top: 1px solid #ddd; */
                width: 350px;
                height: 100%;
                display: flex;
                justify-content: left;

                & > button:nth-of-type(1) {
                    width: 35%;
                    height: 35px;
                    margin: 0px 20px 0 15px;
                }
                & > button:nth-of-type(2) {
                    width: 35%;
                    height: 35px;
                    /* margin: 30px 10px 0 0; */
                }
            }

            & > div:nth-of-type(2) {
                /* border-top: 1px solid #ddd; */
                width: 350px;
                height: 100%;
                display: flex;
                justify-content: right;

                & > button {
                    width: 30%;
                    height: 35px;
                    margin: 0px 15px 0 10px;
                }
            }
        }
    }

    .listBtnAreaA {
        position: relative;
        right: -370px;
        width:100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
`;




const AdminVisitReservationListItemDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const vo = location.state.item;
    const [isOk, setIsOk] = useState(false);
    const [dbVo, setDbVo] = useState();
    


    function handleComplete(vo) {
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
                alert('상담 완료 !');
                setIsOk(true);
                setDbVo(data.dbVo);
                navigate(-1);
            } else {
                alert('완료 실패 ...');
            }
        } )
    }



    function handleQuit(vo) {
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
                alert('취소 처리 완료 !');
                setIsOk(true);
                setDbVo(data.dbVo);
                navigate(-1);
            } else {
                alert('취소 실패 ...');
            }
        } )
    }




    return (
        <>
            <AdminPageMainSidebar />
            <StyeldAdminVisitReservationListItemDetailDiv>
                <div className='wrap'>
                    <span><h2>방문예약관리</h2></span>
                    <div>
                        <div> 
                            <table className='leftTable'> 
                                <thead>
                                    <tr>
                                        <th>글번호</th>
                                        <th>예약일시</th>
                                        <th>예약상태</th>
                                        <th>이름</th>
                                        <th>휴대폰</th>
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
                                                    </tr>
                                                </>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                        
                        <div>
                            <table className='rightTable'>
                                <thead>
                                    <tr>
                                        <th>신청일</th>
                                        <th>수정일</th>
                                        <th>삭제여부</th>
                                        <th>&nbsp;</th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        isOk 
                                        ? 
                                            (
                                                <>
                                                    <tr>
                                                        <td>{dbVo.summitDate}</td>
                                                            {
                                                                dbVo.modifyDate === undefined 
                                                                ?
                                                                    <td>-</td>
                                                                : 
                                                                    <td>{dbVo.modifyDate}</td>
                                                            }
                                                        <td>{dbVo.delYn}</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                    </tr>
                                                </>
                                            ) 
                                        : 
                                            (
                                                <>
                                                    <tr>
                                                        <td>{vo.summitDate}</td>
                                                        {
                                                            vo.modifyDate === undefined 
                                                            ?
                                                                <td>-</td>
                                                            : 
                                                                <td>{vo.modifyDate}</td>
                                                        }
                                                        <td>{vo.delYn}</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                    </tr>
                                                </>
                                            )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div>
                        {
                            vo.delYn === 'N' 
                            ? 
                            (
                                <>
                                    <div className='updateBtnArea'>
                                        <button onClick={ ()=>{handleComplete(vo)} }>상담 완료</button>
                                        <button onClick={ ()=>{handleQuit(vo)} }>상담 취소</button>
                                    </div>
                                    <div className='listBtnArea'>
                                        <button onClick={ ()=>{navigate(-1)} }>목록</button>
                                    </div>
                                </>
                            )
                            :
                            <div className='listBtnAreaA'>
                                <button onClick={ ()=>{navigate(-1)} }>목록</button>
                            </div>
                        }
                    </div>
                </div>
            </StyeldAdminVisitReservationListItemDetailDiv>
        </>
    );
};

export default AdminVisitReservationListItemDetail;