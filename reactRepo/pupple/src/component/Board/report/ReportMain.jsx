import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ReportWrite from './ReportWrite';
import ReportList from './ReportList';
import ReportDetail from './ReportDetail';

const ReportMain = () => {
    return (
        <Routes>
            <Route path='/write' element = {<ReportWrite />}></Route>
            <Route path='/list' element = {<ReportList />}></Route>
            <Route path='/detail' element={<ReportDetail/>}></Route>
        </Routes>
    );
};

export default ReportMain;