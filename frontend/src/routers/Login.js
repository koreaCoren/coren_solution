import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UserLogin from 'pages/login/Login';
import UserRegister from 'pages/login/Register';

const Login = (props) => {
    return (
        <>
            <Routes>
                <Route
                    path='/*'
                    element={
                        <UserLogin
                            setLoginCheck={props.setLoginCheck}
                            setUser={props.setUser}
                        />
                    }>
                </Route>
                <Route
                    path='/register'
                    element={
                        <UserRegister />
                    }>
                </Route>
            </Routes>
        </>
    );
};

export default Login;