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

    return (
        <>
            <Routes>
                <Route path="/" element={
                    <nav>
                        {
                            getLoginCheck === true
                                ? <span>로그인중</span>
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