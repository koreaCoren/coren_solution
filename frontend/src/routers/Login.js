import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLogin from 'pages/login/Login';
import UserRegister from 'pages/login/Register';

const Login = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<UserLogin />}></Route>
                <Route path='/register' element={<UserRegister />}></Route>
            </Routes>
        </>
    );
};

export default Login;