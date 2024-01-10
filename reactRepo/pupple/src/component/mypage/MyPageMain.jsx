import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MemberQuit from './MemberQuit';
import MemberAdoptList from './MemberAdoptList';
import MemberInfoEdit from './MemberInfoEdit';

const MyPageMain = () => {
    return (
        <Routes>
            <Route path='/memberInfoEdit' element = {<MemberInfoEdit />}></Route>
            <Route path='/memberQuit' element = {<MemberQuit />}></Route>
            <Route path='/memberAdoptList' element = {<MemberAdoptList />}></Route>
        </Routes>
    );
};

export default MyPageMain;