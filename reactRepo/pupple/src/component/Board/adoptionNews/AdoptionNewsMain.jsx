import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdoptionNewsWrite from './AdoptionNewsWrite';
import AdoptionNewsList from './AdoptionNewsList';
import AoptionNewsDetail from './AoptionNewsDetail';

const AdoptionNewsMain = () => {
    return (
        <div>
            <Routes>
                <Route path='/write' element={<AdoptionNewsWrite />} />
                <Route path='/list' element={<AdoptionNewsList />} />
                <Route path='/detail' element={<AoptionNewsDetail />} />
            </Routes>
        </div>
    );
};

export default AdoptionNewsMain;
