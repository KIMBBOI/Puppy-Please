import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';


const StyledVisitReservationDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    background-color: #e2e2e2;
    
    .react-datepicker {
        width: 90%;
        height: 90%;
    }
        .react-datepicker__month-container {
            width: 100%;
            height: 100%;
        }
            .react-datepicker__header  {
                height: 20%;
            }
                .react-datepicker__current-month {
                    height: 35%;
                    font-size: 1.5rem;
                }
                .react-datepicker__day-names {
                    height: 65%;
                    & > div {
                        width: 14%;
                        height: 100%;
                        margin: 0;
                        padding: 15px 4px 0 4px;
                        font-size: 1.5rem;
                    }
                }
            .react-datepicker__month {
                height: 80%;
                margin: 0;
            }
                .react-datepicker__week {
                    height: 20%;

                    & > div {
                        line-height: 350%;
                        width: 14%;
                        height: 100%;
                        margin: 0;
                        padding: 0 4px 0 4px;
                        font-size: 1.5rem;
                    }
                }
`;



const VisitReservation = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());



    const currentDate = new Date();
    const maxSelectableDate = new Date();
    maxSelectableDate.setDate(currentDate.getDate() + 30);


    return (
        <StyledVisitReservationDiv>
            <DatePicker
                inline
                dateFormat='yyyy.MM.dd' // 날짜 형태
                // shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                minDate={currentDate} // minDate 이전 날짜 선택 불가
                maxDate={maxSelectableDate} // maxDate 이후 날짜 선택 불가
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
            />
        </StyledVisitReservationDiv>
    );
};

export default VisitReservation;