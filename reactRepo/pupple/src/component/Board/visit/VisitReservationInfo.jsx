import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const VisitReservationInfoDiv = styled.div`
    width: 100%;
    height: 500px;
    padding-bottom: 38px;
    background-color: #f0f0f0;

    .section_top {
        width: 100%;
        height: 80%;
        padding: 12px 16px;

        div:nth-of-type(1) {
            width: 100%;
            height: 20%;
        }
        div:nth-of-type(2) {
            width: 100%;
            height: 30%;

            div:nth-of-type(1) {
                width: 100%;
                height: 100%;
                display: flex;

                div:nth-of-type(1) {
                    width: 30%;
                    height: 100%;
                }   
                div:nth-of-type(2) {
                    width: 70%;
                    height: 100%;
                }   
            }   
        }
        div:nth-of-type(3) {
            width: 100%;
            height: 50%;

            div:nth-of-type(1) {
                width: 100%;
                height: 20%;
            }
            div:nth-of-type(2) {
                width: 100%;
                height: 80%;

                div:nth-of-type(1) {
                    width: 100%;
                    height: 33%;
                    display: flex;

                    div:nth-of-type(1) {
                        width: 30%;
                        height: 100%;
                    }
                    div:nth-of-type(2) {
                        width: 70%;
                        height: 100%;
                    }
                }
                div:nth-of-type(2) {
                    width: 100%;
                    height: 33%;
                    display: flex;

                    div:nth-of-type(1) {
                        width: 30%;
                        height: 100%;
                    }
                    div:nth-of-type(2) {
                        width: 70%;
                        height: 100%;
                    }
                }
                div:nth-of-type(3) {
                    width: 100%;
                    height: 33%;
                    display: flex;

                    div:nth-of-type(1) {
                        width: 30%;
                        height: 100%;
                    }
                    div:nth-of-type(2) {
                        width: 70%;
                        height: 100%;
                    }
                }
            }
        }
    }

    .section_bottom {
        width: 100%;
        height: 20%;
        background-color: #f5f5f5;
        padding: 12px 16px;
        margin-top: 15px;
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
        }
    }
`;

const VisitReservationInfo = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [vo, setVo] = useState();
    const [DateNo, setDateNo] = useState();




    const str = sessionStorage.getItem("loginMemberVo");
    const sessionVo = JSON.parse(str);
    const memberNo = sessionVo.memberNo;
    const stateVo = location.state?.vo;
    useEffect( ()=>{
        setDateNo(stateVo);
        {/* reservationDate 없으면 디비에서 불러와야 함 */}
        if ( location.state?.vo !== undefined) {
            setVo(location.state.vo)
        } else {
            fetch(`http://127.0.0.1:8080/app/visit?memberNo=${memberNo}` , {
                method: "get" ,
                headers: {
                    'Content-Type': 'application/json',
                  }
            })
            .then( resp => resp.json() )
            .then( data => {
                console.log(data);
                if(data.msg === "success"){
                    console.log(data.msg);
                    alert("조회 완료 !");
                    setDateNo(data.dbVo);
                    // navigate("/");
                } else {
                    console.log(data.msg);
                    alert("조회 실패 ...");
                    alert("예약 내역이 없습니다.");
                    navigate("/");
                }
            } )
            ;
        }
    },[] )






    {/* 취소 UPDATE */}
    function handleQuit() {
        console.log('패치 vo 확인 :::', vo);

        fetch("http://127.0.0.1:8080/app/visit" , {
            method: "delete" ,
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
            if(data.msg === "success"){
                console.log(data.msg);
                alert("취소 완료 !");
                navigate("/");
            }else{
                console.log(data.msg);
                alert("취소 실패 ...");
                alert("처음부터 다시 시도하세요.");
                navigate("/");
            }
        } )
        ;
    }
    {/* 변경 UPDATE */}
    // 네비게이트(/board/visit/reservation)





    {/* INSERT */}
    function handleReservation() {
        console.log('패치 vo 확인 :::', vo);

        fetch("http://127.0.0.1:8080/app/visit" , {
            method: "POST" ,
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            console.log(data);
            if(data.msg === "success"){
                console.log(data.msg);
                alert("예약 완료 !");
                navigate("/");
            }else{
                console.log(data.msg);
                alert("예약 실패 ...");
                alert("처음부터 다시 시도하세요.");
                navigate("/");
            }
        } )
        ;
    }






    const handleMyReservation = () => {
        navigate("/board/visit/reservationInfo")
    }
    console.log('vo :::',vo);





    return (
        <VisitReservationInfoDiv>
            <div className='section_top'>
                <div>아래 내용이 맞는지 확인해 주세요.</div>
                <div>
                    <div>
                        <div>일정</div>
                        {
                            DateNo === undefined ? <div>조회중...</div> : <div>{DateNo.reservationDate}</div>
                        }
                    </div>
                </div>
                <div>
                    <div>예약자 정보</div>
                    <div>
                        <div>
                            <div>예약자</div>
                            <div>{sessionVo.name}</div>
                        </div>
                        <div>
                            <div>연락처</div>
                            <div>{sessionVo.phoneNumber}</div>
                        </div>
                        <div>l
                            <div>이메일</div>
                            <div>{sessionVo.email}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='section_bottom'>
                <div>
                    <button onClick={ () => {navigate(-1);}}>이전</button>
                </div>
                <div>
                    <button onClick={(handleReservation)}>예약하기</button>
                </div>
                <div>
                    <button onClick={(handleMyReservation)}>테스트접속</button>
                </div>
            </div>
        </VisitReservationInfoDiv>
    );
};

export default VisitReservationInfo;