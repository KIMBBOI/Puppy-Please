import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
`;







const VisitReservationItem = ({dbDateStrArr}) => {
    const navigate = useNavigate();
    console.log('------------------ Item 시작 ------------------');
    console.log('1. dbDateStrArr :::',dbDateStrArr);
    useEffect( () => {
        setSelectedTime(null);
        setSelectedDate(null);
    }, [dbDateStrArr])






    {/* 
        < 예약내열 배열을 새로운 배열("HH:mm")로 만들기>
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
    if (dbDateStrArr) {
        for (let i = 0; i < dbDateStrArr.length; i++) {
          const formattedTime = new Date(dbDateStrArr[i]).toLocaleTimeString([], { 
                                                                                    hour: '2-digit', 
                                                                                    minute: '2-digit', 
                                                                                    hour12: false 
                                                                                 });
          extractedTimes.push(formattedTime);
        }
    }
    console.log('2. extractedTimes :::',extractedTimes);






    {/* 
        < 10:00 ~ 17:30 까지 30분 간격으로 증가하는 배열 생성 > 
    */}
    // 시작 시간과 종료 시간 설정
    const startTime = new Date(0, 0, 0, 10, 0); // startTime.setHours(10, 0); // 10:00 AM
    const endTime = new Date(0, 0, 0, 17, 30);  // endTime.setHours(17, 30); // 15:30 PM
    console.log('startTime :::',startTime);
    console.log('endTime :::',endTime);
   
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
    console.log('3. timeSlots 확인 :::',timeSlots);


 





    {/* 예약시간 선택 시 Date객체 생성 */}
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleReservDivClick = (time) => {
        console.log('------------- 핸들 클릭 시작 -------------');
        console.log('time :::', time);




        // 클릭한 시간을 상태에 저장 또는 다른 동작 수행
        setSelectedTime(time);
        // insert 데이터 준비
        const insertDate = new Date();
        const [hours, minutes] = time.split(':');   
        insertDate.setHours(hours, minutes, 0, 0);
        const tltsDate = insertDate.toLocaleTimeString([], { 
                                                        year: '2-digit',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                        hour12: false
                                                        });
        // Date 문자열 데이터 가공
        const plDate = tltsDate.replace('. ', '/').replace('. ', '/').replace('.','');
        setSelectedDate(plDate);
        console.log('selectedDate 이전클릭 :::', selectedDate);
        



        console.log('------------- 핸들 종료 -------------');
    };
    console.log('selectedDate 현재클릭 :::', selectedDate);
    console.log('selectedTime :::', selectedTime);
    console.log('------------ insert ------------');
    console.log('selectedDate :::', selectedDate);

    





    const str = sessionStorage.getItem("loginMemberVo");
    const sessionVo = JSON.parse(str);
    const memberNo = sessionVo.memberNo;
    console.log('memberNo :::',memberNo);
    let vo = {};
    if (typeof memberNo === 'string') {
        console.log('memberNo :::', 'memberNo 데이터 있음');
        if (selectedDate !== null) {
            console.log('selectedDate :::', 'selectedDate 데이터 있음');
            console.log('selectedDate :::',selectedDate);
            vo = {
                memberNo,
                'reservationDate': selectedDate
            }
            console.log('vo :::', vo);
        } else {
            console.log('selectedDate :::', 'selectedDate 데이터 없음');
            console.log('selectedDate :::',selectedDate);
        }
    } else {
        console.log('memberNo :::', 'memberNo 데이터 없음');
    }

    





    function handleReservation(vo) {
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
                navigate(-1);
            }
        } )
        ;
    }









    console.log('------------------ Item 종료 ------------------');
    return (
        <StyeldVisitReservationItemDiv>
            {timeSlots.map((time, index) => (
                <div 
                    className={`reservDiv 
                        ${selectedTime === time         ? 'selected'  : ''} 
                        ${extractedTimes.includes(time) ? 'extracted' : ''}
                    `} 
                    key={index}
                    onClick={
                        !extractedTimes.includes(time) ? ()=>{handleReservDivClick(time)} : ()=>{}
                    }
                >
                    {time}
                </div>
            ))}
            <div className='section_button'>
                <div className='button_inner'>
                    <button 
                        className={`btn ${selectedDate === null ? 'notReadyVo' : ''}`}
                        onClick={ () => {
                            selectedDate !== null && handleReservation(vo)
                        }}
                    >
                        예약하기
                    </button>
                </div>
            </div>
        </StyeldVisitReservationItemDiv>
    );
};

export default VisitReservationItem;