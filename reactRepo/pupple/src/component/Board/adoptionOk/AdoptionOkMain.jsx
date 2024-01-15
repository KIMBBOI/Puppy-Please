import { Route, Routes } from 'react-router-dom';
import AdoptionOkList from './AdoptionOkList';
import AdoptionOkWrite from './AdoptionOkWrite';
import AdoptionOkDetail from './AdoptionOkDetail';

const AdoptionOkMain = () => {

    return (
        <Routes>
            <Route path='/list' element={<AdoptionOkList />}></Route>
            <Route path='/write' element={<AdoptionOkWrite />}></Route>
            <Route path='/detail' element={<AdoptionOkDetail />}></Route>
        </Routes>
    );
};

export default AdoptionOkMain;