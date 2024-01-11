import React from 'react';
import {Route, Routes} from 'react-router-dom'
import MemberJoin from './MemberJoin';
import MemberLogin from './MemberLogin';
import MemberSearch from './MemberSearch';
import MyPageMain from '../mypage/MyPageMain';
const MemberMain = () => {
    return (
        <Routes>
            <Route path='/join' element = {<MemberJoin />}></Route>
            <Route path='/login' element = {<MemberLogin />}></Route>
            <Route path='/search' element={<MemberSearch/>}></Route>
            <Route path='/mypage/*' element={<MyPageMain/>}></Route>
        </Routes>
    );
};

export default MemberMain;