import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from "date-fns/locale/ko";
import moment from 'moment';
import VisitReservationItem from './VisitReservationItem';



const StyledVisitReservationDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    padding: 20px 0 20px 0;

    
    .react-datepicker__day:hover {
        background-color: #ece2ff; 
        color: #fff;  
        border-radius: 5%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        font-weight: 600;
    }   
    .react-datepicker__day--today {
    background-color: transparent;
    color: #333;
    font-size: 1.4rem;
    font-weight: bold;
    text-decoration: none;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.61);
    }
    .react-datepicker__day--selected {
        background-color: #ece2ff; 
        color: #fff;  
        border-radius: 5%;  
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
        font-weight: 600;
    }

  
    .line {
        width: 680px;
        height: 1px;
        border-top: 1px solid #e9e9e9;;
        padding: 10px 0 10px 0;
        margin-top: 20px;
        
    }
    .react-datepicker {
        width: 700px;
        height: 550px;
        border: 0px;
    }
        .react-datepicker__month-container {
            width: 100%;
            height: 100%;

            & >  * {
                font-size: 0.8rem;
            }
        }
            .react-datepicker__header  {
                height: 20%;
                border: 0px;
                background-color: white;
                margin-bottom: 1%;
            }
                .react-datepicker__current-month {
                    height: 55%;
                    font-size: 1.2rem;
                }
                .react-datepicker__day-names {
                    height: 45%;
                    & > div {
                        width: 14%;
                        height: 100%;
                        margin: 0;
                        padding: 10px 4px 0 4px;
                        font-size: 1.0rem;
                    }
                }
            .react-datepicker__month {
                height: 78%;
                margin: 0;
            }
                .react-datepicker__week {
                    height: 19%;
                    display: flex;
                    justify-content: space-evenly;
                    margin-bottom: 3px;

                    & > div {
                        /* line-height: 350%; */
                        width: 13.6%;
                        height: 100%;
                        margin: 0;
                        padding: 3.5% 4px 0 4px;
                        font-size: 1.0rem;
                    }
                }
`;




const VisitReservation = () => {
    console.log('----------- VisitReservation 시작 -----------');
    // 방문예약 페이지 접속만 해도 fetch 실행 ( 기본 선택 날짜로 디비 조회 )
    useEffect( () => {
        handleSelectRerv(moment());
    }, []);





    const [selectedDate, setSelectedDate] = useState(moment()._d);
    const [dbDateStrArr,setDbDateStrArr] = useState();
    
    
    
    

    const currentDate = moment()._d;
    const maxSelectableDate = moment().add(28,'days')._d;





    // 예약현황 조회
    function handleSelectRerv(moment) {
        const vo = { 'reservationDate' : moment.format("YY/MM/DD HH:mm:ss")}
        const queryString = new URLSearchParams(vo).toString();
        fetch(`http://127.0.0.1:8080/app/visit/list?${queryString}` , {
            method: "GET" ,
            headers: {
                'Content-Type': 'application/json',
              },
        })
        .then( resp => resp.json() )
        .then( data => {
            if(data.msg === "success"){
                alert("조회 성공 !");
                setDbDateStrArr(data.reservationDateArr);
                    // *컴포턴트로 전달 가능*
            }else{
                console.log(data.msg);
                alert("조회 실패 ...");
            }
        } )
        ;
    }    

 



    console.log('----------- VisitReservation 종료 -----------');
    return (
        <StyledVisitReservationDiv>
            <DatePicker
                inline
                locale={ko}
                dateFormat="yyyy-MM-dd"
                minDate={currentDate}       // minDate 이전 날짜 선택 불가
                maxDate={maxSelectableDate} // maxDate 이후 날짜 선택 불가
                selected={selectedDate}     // value
                onChange={(date) => {
                    setSelectedDate(date); 
                    handleSelectRerv(moment(date));
                }}
            />
            <div className='line'></div>
            <VisitReservationItem dbDateStrArr={dbDateStrArr}/>
                {/* *컴포턴트로 전달 가능* */}
        </StyledVisitReservationDiv>
    );
};

export default VisitReservation;