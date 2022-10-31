import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import "asset/css/header.css"

const Header = (props) => {
    const nav = useNavigate();
    const nowUrl = useLocation();
    const [getMenuOnOff, setMenuOnOff] = useState(false);

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
                <li onClick={() => { setMenuOnOff(!getMenuOnOff) }}><i className="fa-solid fa-bars"></i></li>
            </ul >

            <div className={getMenuOnOff === true ? "menuContainer on" : "menuContainer"}>
                <div className="top">
                    <h3>{props.getUser}님</h3>
                    <button onClick={props.loginOut} type='button'>로그아웃</button>
                </div>
            </div>

            <div onClick={() => { setMenuOnOff(false) }} className={getMenuOnOff === true ? "bg on" : "bg"}></div>

            <div onClick={scrollTop} className="scrollTop">
                <i className="fa-solid fa-sort-up"></i>
            </div>
        </header >
    );
};

export default Header;