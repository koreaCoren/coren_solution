import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "pages/login/Login";

import "asset/css/common.css";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/*" element={<Login />}></Route>
            </Routes>
        </>
    );
};

export default App;
