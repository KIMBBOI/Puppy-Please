import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin';

const AdminMain = () => {
    return (
        <Routes>
            <Route path='/login' element={<AdminLogin />}></Route>
        </Routes>
    );
}
export default AdminMain;