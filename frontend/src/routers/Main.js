import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import MyGroup from './MyGroup';

import "asset/css/main.css"
import FindGroup from 'pages/findGroup/FindGroup';
import Friend from 'pages/friend/Friend';

const Main = (props) => {
    const nowUrl = useLocation();
    const [getNav, setNav] = useState(0);
    useEffect(() => {
        switch (nowUrl.pathname) {
            case "/":
                setNav(0)
                break;
            case "/findGroup":
                setNav(1)
                break;
            case "/myBoard":
                setNav(2)
                break;
            case "/friend":
                setNav(3)
                break;
            default:
                break;
        }
    }, [nowUrl])
    return (
        <>
            <Header
                getLoginCheck={props.getLoginCheck}
                getUser={props.getUser}
                loginOut={props.loginOut}
            ></Header>
            <main>
                <nav>
                    <ul>
                        <li><Link to="/" className={getNav === 0 ? "on" : ""}>내 그룹</Link></li>
                        <li><Link to="/findGroup" className={getNav === 1 ? "on" : ""}>그룹 찾기</Link></li>
                        <li><Link to="/myBoard" className={getNav === 2 ? "on" : ""}>내 게시글</Link></li>
                        <li><Link to="/friend" className={getNav === 3 ? "on" : ""}>친구</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/' element={<MyGroup />}></Route>
                    <Route path='/findGroup' element={<FindGroup />}></Route>
                    <Route path='/myBoard' element={<div>2</div>}></Route>
                    <Route path='/friend/*' element={<Friend />}></Route>
                </Routes>
            </main>
        </>
    );
};

export default Main;