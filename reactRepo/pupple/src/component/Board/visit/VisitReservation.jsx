import React, { useState } from 'react';
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

    .line {
        width: 580px;
        height: 1px;
        border-top: 1px solid #e9e9e9;;
        padding: 10px 0 10px 0;
        margin-top: 20px;
        
    }
    .react-datepicker {
        width: 600px;
        height: 400px;
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
            }
                .react-datepicker__current-month {
                    height: 40%;
                    font-size: 1.2rem;
                }
                .react-datepicker__day-names {
                    height: 60%;
                    & > div {
                        width: 14%;
                        height: 100%;
                        margin: 0;
                        padding: 10px 4px 0 4px;
                        font-size: 1.0rem;
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
                        font-size: 1.0rem;
                    }
                }
`;




const VisitReservation = () => {
    console.log('----------- VisitReservation 시작 -----------');
    const [selectedDate, setSelectedDate] = useState(moment()._d);
    const [dbVoArr,setDbVoArr] = useState();
    
    
    
    const currentDate = moment()._d;
    const maxSelectableDate = moment().add(28,'days')._d;






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
            console.log(data.voArr);
            if(data.msg === "success"){
                console.log(data.msg);
                alert("조회 성공 !");
                setDbVoArr(data.voArr);
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
                dateFormat='yyyy.MM.dd'     // 날짜 형태
                minDate={currentDate}       // minDate 이전 날짜 선택 불가
                maxDate={maxSelectableDate} // maxDate 이후 날짜 선택 불가
                selected={selectedDate}
                onChange={(date) => {
                    setSelectedDate(date); 
                    handleSelectRerv(moment(date));
                }}
            />
            <div className='line'></div>
            <VisitReservationItem dbVoArr={dbVoArr}/>
                {/* *컴포턴트로 전달 가능* */}
        </StyledVisitReservationDiv>
    );
};

export default VisitReservation;