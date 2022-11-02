import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Board from './Board';

import "asset/css/main.css"
import Friend from 'pages/friend/Friend';

const Main = (props) => {
    const nowUrl = useLocation();
    const [getNav, setNav] = useState(0);
    useEffect(() => {
        switch (nowUrl.pathname) {
            case "/":
                setNav(0)
                break;
            case "/board":
                setNav(1)
                break;
            case "/advertisement":
                setNav(2)
                break;
            case "/myInfo":
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
                        <li><Link to="/" className={getNav === 0 ? "on" : ""}>홈</Link></li>
                        <li><Link to="/board" className={getNav === 1 ? "on" : ""}>게시판</Link></li>
                        <li><Link to="/advertisement" className={getNav === 2 ? "on" : ""}>전광판</Link></li>
                        {/* <li><Link to="/myInfo" className={getNav === 3 ? "on" : ""}>MY</Link></li> */}
                    </ul>
                </nav>
                <Routes>
                    <Route path='/*' element={<Friend />}></Route>
                    <Route path='/board/*' element={<Board />}></Route>
                    <Route path='/advertisement' element={<div>1</div>}></Route>
                    {/* <Route path='/myInfo/*' element={<div>2</div>}></Route> */}
                </Routes>
            </main>
        </>
    );
};

export default Main;