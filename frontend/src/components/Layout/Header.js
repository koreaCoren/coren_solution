import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className='container'>
            <h4>Header</h4>
            <Link to='/User/SignUp'><div>회원가입</div></Link>
            <Link to='/User/SignIn'><div>로그인</div></Link>
        </header>
    );
};


export default Header;