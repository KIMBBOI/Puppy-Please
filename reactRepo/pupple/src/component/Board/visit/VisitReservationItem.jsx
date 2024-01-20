import React from 'react';
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
            line-height: 37px;
            background-color: #ffffff;
            margin: 0 1px 0 1px;
            border: 1px solid #e9e9e9;
            border-radius: 5px;
        }
`;
 


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





const VisitReservationItem = () => {
        

    // 시작 시간과 종료 시간 설정
    const startTime = new Date();
    startTime.setHours(10, 0); // 10:00 AM
    const endTime = new Date();
    endTime.setHours(17, 30); // 6:00 PM

    // 30분 간격으로 증가하는 배열 생성
    const timeSlots = [];
    const currentTime = new Date(startTime);

    while (currentTime <= endTime) {
        // toLocaleTimeString : 날짜 객체의 시간 부분을 현지 시간대에 맞게 형식화
        // [] : 안의 빈 배열: 현지 설정을 사용하겠다는 의미
        // { hour: '2-digit', minute: '2-digit', hour12: false } : 시간을 2자리 숫자로, 분을 2자리 숫자로, 12시간 형식이 아닌 24시간 형식으로 표시
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        timeSlots.push(formattedTime);
        // 현재 분에 30분을 더함.
        currentTime.setMinutes(currentTime.getMinutes() + 30);
    }


    return (
        <StyeldVisitReservationItemDiv>
            {timeSlots.map((time, index) => (
                <div key={index}>{time}</div>
            ))}
        </StyeldVisitReservationItemDiv>
    );
};

export default VisitReservationItem;