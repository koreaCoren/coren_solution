import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import "asset/css/header.css"

const Header = (props) => {
    const nav = useNavigate();
    const nowUrl = useLocation();

    const scrollTop = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        scrollTop();

        //로그인상태에서 회원가입 접근 차단
        if (props.getLoginCheck === true) {
            if (nowUrl.pathname === "/register") {
                alert("로그인상태에서는 접근 할 수 없습니다.");
                nav('/');
            }
        }
    }, [nowUrl])

    return (
        <header>
            <ul className="flexBox">
                <li onClick={() => { nav(-1) }}><i className="fa-solid fa-chevron-left"></i></li>
                <li><Link to="/">회원수첩</Link></li>
                <li><i className="fa-solid fa-bars"></i></li>
            </ul >

            <div className="menuContainer">
                {
                    props.getUser
                }
            </div>

            <div onClick={scrollTop} className="scrollTop">
                <i className="fa-solid fa-sort-up"></i>
            </div>
        </header >
    );
};

export default Header;