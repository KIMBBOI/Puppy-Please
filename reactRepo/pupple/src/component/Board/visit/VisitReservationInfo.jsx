import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const VisitReservationInfoDiv = styled.div`
    width: 50%;
    height: 550px;
    padding-bottom: 38px;
    background-color: #ffffff;
    

    .section_top {
        width: 100%;
        height: 80%;
        padding: 12px 16px;
        margin-top: 12px;
        padding: 20px;
        border: 2px solid #929292;
        border-radius: 15px;

        div:nth-of-type(1) {
            width: 100%;
            height: 20%;
        }
        & > div:nth-of-type(2) {
            width: 100%;
            height: 30%;
            & > div:nth-of-type(1) {
                width: 100%;
                height: 100%;
                display: flex;
                & > div:nth-of-type(1) {
                    width: 100%;
                    height: 30%;
                    border-bottom: 2px solid black;
                    /* margin: 10px 0 10px 0; */
                    padding-bottom: 10px;
                    display: flex;

                    & > div:nth-of-type(1) {
                        width: 30%;
                    }
                    & > div:nth-of-type(2) {
                        width: 70%;
                        text-align: right;
                    }
                }
                & > table {
                    border-bottom: 2px solid black;
                    /* margin-bottom: 10px; */
                }
                & > table > thead:nth-of-type(1) { 
                    width: 100%;
                    height: 100%;
                    & > div:nth-of-type(1) {
                        width: 30%;
                    }
                    & > div:nth-of-type(2) {
                        width: 70%;
                        text-align: right;
                    }
                }   
                & > table > tbody:nth-of-type(1) { 
                    width: 100%;
                    height: 100%;
                    margin: 10px 0 10px 0;
                    & > div:nth-of-type(1) {
                        width: 30%;
                    }
                    & > div:nth-of-type(2) {
                        width: 70%;
                        text-align: right;
                    }
                }   
            }   
        }
        div:nth-of-type(3) {
            width: 100%;
            height: 50%;
            
            // 예약자 정보
            & > div:nth-of-type(1) {
                width: 30%;
                height: 20%;
                font-weight: bold;
                line-height: 38px;
            }
            // 정보
            & > div:nth-of-type(2) {
                width: 100%;
                height: 80%;
                
                & > thead:nth-of-type(1) {
                    margin: 6px 0 6px 0;
                    & > div:nth-of-type(1) {
                        width: 20%;
                        line-height: 38px;
                        /* padding-left: 30px; */
                    }
                    & > div:nth-of-type(2) {
                        width: 80%;
                        height: 40px;
                        line-height: 38px;
                        padding-left: 14px;
                        border: 1px solid #d9d9dc;
                        border-radius: 8px;
                    }
                }    
                & > tbody:nth-of-type(1) {
                    margin: 6px 0 6px 0;
                    & > div:nth-of-type(1) {
                        width: 20%;
                        line-height: 38px;
                    }
                    & > div:nth-of-type(2) {
                        width: 80%;
                        height: 40px;
                        line-height: 38px;
                        padding-left: 14px;
                        border: 1px solid #d9d9dc;
                        border-radius: 8px;
                    }
                }
                & > tbody:nth-of-type(2) {
                    margin: 6px 0 6px 0;
                    & > div:nth-of-type(1) {
                        width: 20%;
                        line-height: 38px;
                    }
                    & > div:nth-of-type(2) {
                        width: 80%;
                        height: 40px;
                        line-height: 38px;
                        padding-left: 14px;
                        border: 1px solid #d9d9dc;
                        border-radius: 8px;
                    }
                }
            }
        }
    }

    .section_bottom {
        width: 100%;
        height: 20%;
        /* background-color: #7e7e7e; */
        padding: 12px 0 12px 0;
        /* margin-top: 15px; */
        display: flex;

        div:nth-of-type(1) {
            width: 20%;
            height: 100%;
            margin-right: 7px;
        }
        div:nth-of-type(2) {
            width: 80%;
            height: 100%;
        }
        
        button {
            width: 100%;
            height: 100%;
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
    }
    table {
        width: 100%;
        height: 50%;
    }
    thead {
        display: flex;
    }
    tbody {
        display: flex;
    }
    h3 {
        text-align: center;
    }
`;

const VisitReservationInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    



    const vo = location.state?.vo;
    const [beforeVo, setBeforeVo] = useState(location.state.myPageBeforeVo)
    const fromSidebar = location.state.myPagefromSidebar

    const str = sessionStorage.getItem("loginMemberVo");
    const sessionVo = JSON.parse(str);





    // 확인
    useEffect( () => {
        if (beforeVo === undefined)
        fetch(`http://127.0.0.1:8080/app/visit?memberNo=${sessionVo.memberNo}` , {
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "success"){
                setBeforeVo(data.dbVo);
            }
        } )
        ;
    }, [] )



    

    {/* INSERT */}
    function handleReservation() {
        fetch("http://127.0.0.1:8080/app/visit" , {
            method: "POST" ,
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "success"){
                alert("예약 완료 !");
                navigate("/");
            }else{
                alert("예약 실패 ...");
                alert("처음부터 다시 시도하세요.");
                navigate("/");
            }
        } )
        ;
    }





    {/* 취소 UPDATE */}
    function handleQuit() {
        let editVo = { 'memberNo': beforeVo.memberNo};
        fetch("http://127.0.0.1:8080/app/visit" , {
            method: "delete" ,
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(editVo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "success"){
                alert("취소 완료 !");
                navigate("/");
            }else{
                alert("취소 실패 ...");
                alert("처음부터 다시 시도하세요.");
                navigate("/");
            }
        } )
        ;
    }





    // 변경에 대한 reservationDate 데이터는 변수명이 달라야 함.
    {/* 변경 UPDATE */}
    function handleChangeReservation() {
        fetch("http://127.0.0.1:8080/app/visit" , {
            method: "put" ,
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "success"){
                alert("변경 완료 !");
                navigate("/");
            }else{
                alert("변경 실패 ...");
                alert("처음부터 다시 시도하세요.");
                navigate("/");
            }
        } )
        ;
    }





    return (
        <VisitReservationInfoDiv>
            <div className='section_top'>
                <div><h3>아래 내용이 맞는지 확인해 주세요.</h3></div>
                <div>
                    <div>
                        
                        {
                            vo === undefined
                            ? 
                                <>
                                    <div>
                                        <div>예약일</div>
                                        <div>{beforeVo.reservationDate}</div>
                                    </div>
                                </>
                            : 
                                beforeVo
                                ?
                                    <>
                                        <table>
                                            <thead>
                                                <div>기존예약일</div>
                                                <div>{beforeVo.reservationDate}</div>
                                            </thead>
                                            <tbody>
                                                <div>변경일</div>
                                                <div>{vo.reservationDate}</div>
                                            </tbody>
                                        </table>
                                    </>
                                :
                                    <>  
                                        <div>
                                            <div>예약일</div>
                                            <div>{vo.reservationDate}</div>
                                        </div>
                                    </>
                        }
                    </div>
                </div>
                <div>
                    <div>예약자 정보</div>
                    <div>
                        <thead>
                            <div>예약자</div>
                            <div>{sessionVo.name}</div>
                        </thead>
                        <tbody>
                            <div>연락처</div>
                            <div>{sessionVo.phoneNumber}</div>
                        </tbody>
                        <tbody>
                            <div>이메일</div>
                            <div>{sessionVo.email}</div>
                        </tbody>
                    </div>
                </div>
            </div>
            <div className='section_bottom'>
                { 
                    fromSidebar
                    ? 
                        <>
                            <div><button className='btn_quit' onClick={handleQuit}>예약취소</button></div>
                            <div><button className='btn_change' onClick={() => navigate("/board/visit/reservation")}>예약변경</button></div>
                        </>
                    :
                        beforeVo
                        ?
                            <>
                                <div><button onClick={() => navigate(-1)}>이전</button></div>
                                <div><button onClick={(handleChangeReservation)}>예약변경</button></div>
                            </>
                        :
                            <>
                                <div><button onClick={ () => {navigate(-1);}}>이전</button></div>
                                <div><button onClick={(handleReservation)}>예약하기</button></div>
                            </>
                }
            </div>
        </VisitReservationInfoDiv>
    );
};

export default VisitReservationInfo;