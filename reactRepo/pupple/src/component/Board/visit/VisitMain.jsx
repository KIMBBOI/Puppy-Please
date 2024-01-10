import React from 'react';
import { Route, Routes } from 'react-router-dom';
import VisitWrite from './VisitWrite';

const VisitMain = () => {
    return (
        <Routes>
            <Route path='/write' element = {<VisitWrite />}></Route>
        </Routes>
    );
};

export default VisitMain;