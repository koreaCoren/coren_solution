import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "asset/css/common.css";

import Login from "routers/Login";
import Board from "routers/Board";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={
                    <nav>
                        <Link to="/login">로그인</Link>
                        <Link to="/board">게시판</Link>
                    </nav>
                }></Route>
                <Route path="/login/*" element={<Login />}></Route>
                <Route path="/board/*" element={<Board />}></Route>
            </Routes>
        </>
    );
};

export default App;