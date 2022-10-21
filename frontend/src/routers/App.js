import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "routers/Login";

import "asset/css/common.css";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<Login />}></Route>
                <Route path="/" element={<Link to="login">로그인</Link>}></Route>
            </Routes>
        </>
    );
};

export default App;