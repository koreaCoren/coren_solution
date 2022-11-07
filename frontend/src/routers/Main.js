import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Board from './Board';
import Friend from 'pages/friend/Friend';

import "asset/css/main.css"
import Advertisement from 'pages/advertisement/Advertisement';

const Main = (props) => {
    const nav = useNavigate();
    const nowUrl = useLocation();
    const [getNav, setNav] = useState(0);

    const tokenCheck = async () => {
        const url = `${process.env.REACT_APP_API_URL}/user/checkToken`;
        const tokenData = {
            token: sessionStorage.getItem("loginToken"),
            userId: sessionStorage.getItem("userId"),
        }
        console.log(tokenData);
        await axios.post(url, tokenData).then((res) => {
            if (res.data.result !== "ok") {
                sessionStorage.removeItem("loginCheck");
                sessionStorage.removeItem('userId');
                sessionStorage.removeItem('loginToken');
                alert("토큰 만료됬어 돌아가렴");
                nav("/");
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        tokenCheck();
    }, [nav])

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
                    <Route path='/advertisement' element={<Advertisement />}></Route>
                    {/* <Route path='/myInfo/*' element={<div>2</div>}></Route> */}
                </Routes>
            </main>
        </>
    );
};

export default Main;