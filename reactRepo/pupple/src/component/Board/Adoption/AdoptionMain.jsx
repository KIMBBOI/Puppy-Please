import React from 'react';
import { Routes , Route } from 'react-router-dom';
import AdoptionList from '../AdoptionList';

const AdoptionMain = () => {
    return (
        <Routes>
            <Route path='list' element={<AdoptionList} />
            <Route path='list' element={<AdoptionWrite} />
            <Route path='list' element={<AdoptionDetail} />
        </Routes>
    );
};

export default AdoptionMain;