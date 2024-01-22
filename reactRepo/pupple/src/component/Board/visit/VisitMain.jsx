import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VisitWrite from './VisitWrite';
import VisitReservation from './VisitReservation';
import VisitReservationInfo from './VisitReservationInfo';

const VisitMain = () => {
    return (
        <Routes>
            <Route path='/reservationInfo' element = {<VisitReservationInfo />}></Route>
            <Route path='/reservation' element = {<VisitReservation />}></Route>
            <Route path='/write' element = {<VisitWrite />}></Route>
        </Routes>
    );
};

export default VisitMain;