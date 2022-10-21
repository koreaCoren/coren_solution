import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "asset/css/common.css";

import Login from "routers/Login";
import Board from "routers/Board";

const App = () => {
    const [getLoginCheck, setLoginCheck] = useState(false);
    useEffect(() => {
        localStorage.getItem("loginCheck") === "success"
            ? setLoginCheck(true)
            : setLoginCheck(false);
    }, [getLoginCheck])

    const loginOut = () => {
        localStorage.setItem("loginCheck", "fail");
        setLoginCheck(false);
    };

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <nav>
                        {
                            getLoginCheck === true
                                ? <span onClick={loginOut}>로그아웃</span>
                                : <Link to="/login">로그인</Link>
                        }
                        <Link to="/board">게시판</Link>
                    </nav>
                }></Route>
                <Route path="/login/*" element={<Login setLoginCheck={setLoginCheck} />}></Route>
                <Route path="/board/*" element={<Board />}></Route>
            </Routes>
        </>
    );
};

export default App;