import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import "asset/css/header.css"

const Header = (props) => {
    const nav = useNavigate();
    const nowUrl = useLocation();
    useEffect(() => {
        //로그인상태에서 회원가입 접근 차단
        if (props.getLoginCheck === true) {
            if (nowUrl.pathname === "/register") {
                alert("로그인상태에서는 접근 할 수 없습니다.");
                nav('/');
            }
        }
    })

    return (
        <header>
            <ul className="flexBox">
                <li onClick={() => { nav(-1) }}><i className="fa-solid fa-chevron-left"></i></li>
                <li><Link>회원수첩</Link></li>
                <li><i className="fa-solid fa-bars"></i></li>
            </ul >
        </header >
    );
};

export default Header;