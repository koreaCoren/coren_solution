import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Board from './Board';
import Group from 'pages/Group/Group';
import Advertisement from 'pages/advertisement/Advertisement';
import ReqFriend from 'pages/friend/Friend';
import MyPage from 'pages/mypage/MyPage';


import "asset/css/main.css"
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
                setNav(0);
                break;
            case "/board":
                setNav(1);
                break;
            case "/advertisement":
                setNav(2);
                break;
            case "/reqFriend":
                setNav(3);
                break;
            case "/mypage":
                setNav(4);
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
                <Routes>
                    <Route path='/*' element={<Group />}></Route>
                    <Route path='/board/*' element={<Board />}></Route>
                    <Route path='/advertisement' element={<Advertisement />}></Route>
                    <Route path='/reqFriend' element={<ReqFriend />}></Route>
                    <Route path='/mypage/*' element={<MyPage />}></Route>
                </Routes>
                <nav>
                    <ul>
                        <li><Link to="/" className={getNav === 0 ? "on" : ""}><i className="fa-solid fa-house"></i></Link></li>
                        <li><Link to="/board" className={getNav === 1 ? "on" : ""}><i className="fa-solid fa-clipboard"></i></Link></li>
                        <li><Link to="/advertisement" className={getNav === 2 ? "on" : ""}><i className="fa-solid fa-rectangle-ad"></i></Link></li>
                        <li><Link to="/reqFriend" className={getNav === 3 ? "on" : ""}><i className="fa-solid fa-user-group"></i></Link></li>
                        <li><Link to="/mypage" className={getNav === 4 ? "on" : ""}><i className="fa-solid fa-ellipsis"></i></Link></li>
                    </ul>
                </nav>
            </main>
        </>
    );
};

export default Main;