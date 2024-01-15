import React from 'react';
import { Routes , Route } from 'react-router-dom';
import AdoptionList from './AdoptionList';
import AdoptionWrite from './AdoptionWrite';
import AdoptionDetail from './AdoptionDetail';

const AdoptionMain = () => {
    return (
        <Routes>
            <Route path='/list' element={<AdoptionList />} />
            <Route path='/write' element={<AdoptionWrite />} />
            <Route path='/detail' element={<AdoptionDetail />} />
        </Routes>
    );
};

export default AdoptionMain;