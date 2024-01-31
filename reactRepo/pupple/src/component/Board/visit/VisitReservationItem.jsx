import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyeldVisitReservationItemDiv = styled.div`
    width: 700px;
    height: 400px;
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px 0 20px 0;
    font-size: 0.8rem;

    .reservDiv {
        width: 23%;
        height: 16%;
        text-align: center; 
        line-height: 55px;
        background-color: #ffffff;
        margin: 0 1px 0 1px;
        border: 1px solid #e9e9e9;
        border-radius: 5px;
        cursor: pointer;
    }
    .selected {
        color: white;
        background-color: #dac7ff;
        border: 0px;
        font-weight: 600;
    }
    .extracted {
        color: #dadada;
        font-weight: 600;
        cursor: default;
    }

    .section_button {
        width: 100%;
        height: 80px;
        background-color: #ffffff;
        padding: 12px 10px;

        & > div {
            width: 100%;
            height: 100%;
            background-color: #ffffff;


        }
    }

    .btn {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 8px;
        background-color: #b28fff;
        font-size: 15px;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    .notReadyVo {
        /* width: 100%;
        height: 100%;
        border: none;
        border-radius: 8px; */
        background-color: #e9e9ec;
        /* font-size: 15px;
        font-weight: 600;
        color: #ffffff; */
        cursor: default;
    }
    .onhover:hover {
        background-color: #926dff;
    }
`;



const VisitReservationItem = ({db_DateStrArr, selectedDatePicker}) => {
    const navigate = useNavigate();


    useEffect( () => {
        setSelectedTime(null);
        setSelectedDate(null);
    }, [db_DateStrArr])





    {/* 
        < 예약내역 배열을 새로운 배열("HH:mm")로 만들기>
            1. 배열 생성
            2. 배열에서 문자열 추출
            3. Date 객체로 파싱
            4. "HH:mm" 부분만 추출
            5. 배열에 추가
                * .toLocaleTimeString([],{hour: '2-digit', minute: '2-digit', hour12: false})
                    - Date 객체에 사용 가능
                    - 반환값은 문자열
                    - 빈 배열은 현지 설정을 사용하겠다는 의미
                    - 시간을 2자리 숫자로, 분을 2자리 숫자로, 24시간 형식으로 표시
                        // ex.) 16시 00분 50초 -> 16:00
                * 날짜를 클릭하지 않았고 
    */}
    const extractedTimes = [];
    if (db_DateStrArr) {
        for (let i = 0; i < db_DateStrArr.length; i++) {
          const formattedTime = new Date(db_DateStrArr[i]).toLocaleTimeString([], { 
                                                                                    hour: '2-digit', 
                                                                                    minute: '2-digit', 
                                                                                    hour12: false 
                                                                                 });
          extractedTimes.push(formattedTime);
        }
    }





    {/* 
        < 10:00 ~ 17:30 까지 30분 간격으로 증가하는 배열 생성 > 
    */}
    // 시작 시간과 종료 시간 설정
    const startTime = new Date(0, 0, 0, 10, 0); // startTime.setHours(10, 0); // 10:00 AM
    const endTime = new Date(0, 0, 0, 17, 30);  // endTime.setHours(17, 30); // 15:30 PM
    // 배열 생성
    const timeSlots = [];
    // 현재 시간
    const currentTime = new Date(startTime);
    // 반복문
    while (currentTime <= endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        timeSlots.push(formattedTime);
            // 배열에 추가
        currentTime.setMinutes(currentTime.getMinutes() + 30);
            // 현재시간 분에 30분을 더함.
    }





    {/* 
        < 예약시간 선택 시 Date객체 생성 >
    */}
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleReservDivClick = (time) => {
        // 클릭한 시간을 상태에 저장 또는 다른 동작 수행
        setSelectedTime(time);
        // insert 데이터 준비
        const insertDate = new Date(selectedDatePicker);
        const [hours, minutes] = time.split(':');   
        insertDate.setHours(hours, minutes, 0, 0);
        const tltsInsertDate = insertDate.toLocaleTimeString([], { 
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                        hour12: false
                                                        });
        // Date 문자열 데이터 가공
        const plTltsInsertDate = tltsInsertDate.replace('. ', '-').replace('. ', '-').replace('.','');
        setSelectedDate(plTltsInsertDate);
    };



    {/* 
        < 로그인 확인 및 vo 준비( reservationInfo 컴포넌트 전달 )
    */}
    const str = sessionStorage.getItem("loginMemberVo");
    const sessionVo = JSON.parse(str);
    const memberNo = sessionVo.memberNo;
    let vo = {};
    if (typeof memberNo === 'string') {
        if (selectedDate !== null) {
            vo = {
                memberNo,
                'reservationDate': selectedDate,
            }
        } else {
        }
    } else {
    }
    
    


    return (
        <StyeldVisitReservationItemDiv>
            {timeSlots.map((time, index) => (
                <div 
                    key={index}
                    className=
                        {`reservDiv 
                            ${selectedTime === time         ? 'selected'  : ''} 
                            ${extractedTimes.includes(time) ? 'extracted' : ''}
                        `} 
                    onClick=
                        {
                            !extractedTimes.includes(time) 
                            ? 
                                ()=>{handleReservDivClick(time)} 
                            : 
                                ()=>{}
                        }
                >
                    {time}
                </div>
            ))}
            <div className='section_button'>
                <div className='button_inner'>
                    <button 
                        className={`btn ${selectedDate === null ? 'notReadyVo' : 'onhover'}`}
                        onClick={ () => {
                            selectedDate !== null && navigate("/board/visit/reservationInfo", {state:{vo}});
                        }}
                    >
                        다음단계
                    </button>
                </div>
            </div>
        </StyeldVisitReservationItemDiv>
    );
};

export default VisitReservationItem;