import React from 'react';
import {Route, Routes} from 'react-router-dom'
import MemberJoin from './MemberJoin';
import MemberLogin from './MemberLogin';
import MemberEdit from './MemberEdit';
import MemberSearch from './MemberSearch';
const MemberMain = () => {
    return (
        <Routes>
            <Route path='/join' element = {<MemberJoin />}></Route>
            <Route path='/login' element = {<MemberLogin />}></Route>
            <Route path='/edit' element= {<MemberEdit />}></Route>
            <Route path='/search' element={<MemberSearch/>}></Route>
        </Routes>
    );
};

export default MemberMain;