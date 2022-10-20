import React from 'react';
import { Link } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const Header = () => {
    return (
        <div className='container'>
            <div>
                <h4>Header</h4>
                <Link to='/User/SignUp'><div>회원가입</div></Link>
                <Link to='/User/SignIn'><div>로그인</div></Link>
            </div>
        </div>
    );
};


export default Header;