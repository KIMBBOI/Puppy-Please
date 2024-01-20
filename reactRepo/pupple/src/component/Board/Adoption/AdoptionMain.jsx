import React from 'react';
import { Routes , Route } from 'react-router-dom';
import AdoptionList from './AdoptionList';
import AdoptionWrite from './AdoptionWrite';
import AdoptionDetail from './AdoptionDetail';
import SurveyMain from '../../survey/SurveyMain';
import QuizMain from '../quiz/QuizMain';

const AdoptionMain = () => {
    return (
        <Routes>
            <Route path='/list' element={<AdoptionList />} />
            <Route path='/write' element={<AdoptionWrite />} />
            <Route path='/detail' element={<AdoptionDetail />} />
            <Route path='/survey' element={<SurveyMain />} />
            <Route path='/quiz' element={<QuizMain />} />
        </Routes>
    );
};

export default AdoptionMain;