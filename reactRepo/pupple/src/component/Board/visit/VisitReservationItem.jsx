import React, { useState } from 'react';
import styled from 'styled-components';

const StyeldVisitReservationItemDiv = styled.div`
    width: 600px;
    height: 260px;
    background-color: #ffffff;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px 0 20px 0;
    font-size: 0.8rem;

        & > div {
            width: 23%;
            height: 19%;
            text-align: center;
            line-height: 39px;
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
`;
 
{
    document.querySelectorAll('.reservDiv');
}
// function handleReservation(moment) {
//     console.log('---------------------------핸들---------------------------');
//     const str = sessionStorage.getItem("loginMemberVo");
//     const jsonStr = JSON.parse(str);
//     const memberNo = jsonStr.memberNo;



//     const vo = { 'reservationDate' : moment.format(), 'memberNo' : memberNo}


    
//     fetch("http://127.0.0.1:8080/app/visit" , {
//         method: "POST" ,
//         headers: {
//             'Content-Type': 'application/json',
//           },
//         body: JSON.stringify(vo)
//     })
//     .then( resp => resp.json() )
//     .then( data => {
//         console.log('---------------------------패치---------------------------');
//         console.log(data);
//         if(data.msg === "success"){
//             console.log(data.msg);
//             alert("예약 완료 !");
//             navigate("/");
//         }else{
//             console.log(data.msg);
//             alert("예약 실패 ...");
//             navigate(-1);
//         }
//     } )
//     ;
// }
// console.log('---------------------------패치 끝---------------------------');






const VisitReservationItem = ({dbVoArr}) => {
    console.log('--------- VisitReservationItem 시작 ---------');
    console.log('dbVoArr :::',  dbVoArr);




    {/* < list를 매핑하여 각각의 값을 출력하고 새로운 배열 만들기> */}
    const dbList = dbVoArr && dbVoArr.map( (item, index) => {
            // list 에 배열이 있을 때만 && 이후의 동작 수행
        console.log(`Item ${index + 1}: ${item.reservationDate}`) 
            // Item 1: item객체의 reservationDate 변수의 값
        return item.reservationDate;
            // return 키워드를 추출하여 새로운 배열 생성 (dbList)
    });
    console.log('dbList :::', dbList);






    const [selectedTime, setSelectedTime] = useState();
    const handleReservDivClick = (time) => {
        // 클릭한 시간을 상태에 저장 또는 다른 동작 수행
        setSelectedTime(time);
        // 여기서 다른 동작을 수행
        console.log('---- 핸들 클릭됨 ----');
    };





    {/* < 10:00 ~ 17:30 까지 30분 간격으로 증가하는 배열 생성 > */}
    // 시작 시간과 종료 시간 설정
    const startTime = new Date();
    startTime.setHours(10, 0); // 10:00 AM
    const endTime = new Date();
    endTime.setHours(17, 30); // 15:30 PM
    // 배열 생성
    const timeSlots = [];
    // 현재 시간
    const currentTime = new Date(startTime);
    // 반복문
    while (currentTime <= endTime) {
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            // toLocaleTimeString : 날짜 객체의 시간 부분을 현지 시간대에 맞게 형식화
                // [] : 빈 배열은 현지 설정을 사용하겠다는 의미
                // { hour: '2-digit', minute: '2-digit', hour12: false } : 시간을 2자리 숫자로, 분을 2자리 숫자로, 12시간 형식이 아닌 24시간 형식으로 표시
                    // ex.) 16시 00분 50초 -> 16:00
        timeSlots.push(formattedTime);
            // 배열에 추가
        currentTime.setMinutes(currentTime.getMinutes() + 30);
            // 현재시간 분에 30분을 더함.
    }





    // const x = () => {
    //     timeSlots.map((time, index) => (
    //         <div key={index}>{time}</div>
    //     ))
    // }





    console.log('--------- VisitReservationItem 종료 ---------');
    return (
        <StyeldVisitReservationItemDiv>
            {timeSlots.map((time, index) => (
                <div 
                    className={`reservDiv ${selectedTime === time ? 'selected' : ''}`} 
                    key={index}
                    onClick={() => handleReservDivClick(time)}
                >
                    {time}
                </div>
            ))}
        </StyeldVisitReservationItemDiv>
    );
};

export default VisitReservationItem;