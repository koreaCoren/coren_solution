import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignUp from '../pages/user/SignUp'
import SignIn from '../pages/user/SignIn';

const UserRouter = () => {
    return (
        <div>
            <Routes>
                <Route path='/SignUp' element={<SignUp/>}></Route>
                <Route path='/SignIn' element={<SignIn/>}></Route>
            </Routes>
        </div>
    );
};

export default UserRouter;