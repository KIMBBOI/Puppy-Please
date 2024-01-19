import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from "date-fns/locale/ko";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';



const StyledVisitReservationDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #e2e2e2;
    padding-left: 20px;


    
    .react-datepicker {
        width: 600px;
        height: 400px;
        border: 0px;
    }
        .react-datepicker__month-container {
            width: 100%;
            height: 100%;
        }
            .react-datepicker__header  {
                height: 20%;
                border: 0px;
                background-color: white;
            }
                .react-datepicker__current-month {
                    height: 40%;
                    font-size: 1.3rem;
                }
                .react-datepicker__day-names {
                    height: 60%;
                    & > div {
                        width: 14%;
                        height: 100%;
                        margin: 0;
                        padding: 10px 4px 0 4px;
                        font-size: 1.2rem;
                    }
                }
            .react-datepicker__month {
                height: 80%;
                margin: 0;
            }
                .react-datepicker__week {
                    height: 20%;
                    & > div {
                        /* line-height: 350%; */
                        width: 14%;
                        height: 100%;
                        margin: 0;
                        padding: 3% 4px 0 4px;
                        font-size: 1.2rem;
                    }
                }
    
    .wrap {
        width: 600px;
        height: 400px;
        background-color: #f5f5f5;

        display: flex;
        flex-direction: column;
    }
`;




const VisitReservation = () => {
    console.log('---------------------------시작---------------------------');
    const [selectedDate, setSelectedDate] = useState(moment()._d);
    const navigate = useNavigate();
    
    
    
    const currentDate = moment()._d;
    const maxSelectableDate = moment().add(28,'days')._d;


    
    

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



    function handleSelectRerv(moment) {
        const vo = { 'reservationDate' : moment.format()} 
        fetch("http://127.0.0.1:8080/app/visit/list" , {
            method: "GET" ,
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(vo)
        })
        .then( resp => resp.json() )
        .then( data => {
            console.log('---------------------------패치---------------------------');
            console.log(data);
            if(data.msg === "success"){
                console.log(data.msg);
                alert("조회 성공 !");
                navigate("/board/report/list?pno=1");
            }else{
                console.log(data.msg);
                alert("조회 실패 ...");
                navigate(-1);
            }
        } )
        ;
    }
 




    return (
        <StyledVisitReservationDiv>
            <DatePicker
                inline
                locale={ko}
                dateFormat='yyyy.MM.dd'     // 날짜 형태
                minDate={currentDate}       // minDate 이전 날짜 선택 불가
                maxDate={maxSelectableDate} // maxDate 이후 날짜 선택 불가
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date); 
                    handleSelectRerv(moment(date));
                }}
            />
            <div className='wrap'>
                <div>10:00</div>
                <div>10:30</div>
                <div>11:00</div>
                <div>11:30</div>
                <div>12:00</div>
                <div>12:30</div>
                <div>13:00</div>
                <div>13:30</div>
                <div>14:00</div>
                <div>14:30</div>
                <div>15:00</div>
                <div>15:30</div>
                <div>16:00</div>
                <div>16:30</div>
                <div>17:00</div>
                <div>17:30</div>
            </div>
        </StyledVisitReservationDiv>
    );
};

export default VisitReservation;