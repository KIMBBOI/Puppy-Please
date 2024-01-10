import React from 'react';
import { Routes , Route } from 'react-router-dom';
import AdoptionNewsWrite from './AdoptionNewsWrite';
import AdoptionNewsList from './AdoptionNewsList';

const AdoptionNewsMain = () => {
    return (
        <Routes>
            <Route path='write' element={<AdoptionNewsWrite />} />
            <Route path='list' element={<AdoptionNewsList />} />
        </Routes>
    );
};

export default AdoptionNewsMain;