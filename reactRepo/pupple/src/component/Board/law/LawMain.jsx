import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LawList from './LawList';

const LawMain = () => {
    return (
        <Routes>
            <Route path='/list' element={<LawList />} />
        </Routes>
    );
};

export default LawMain;