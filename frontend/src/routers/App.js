import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "asset/css/common.css";

import Login from "routers/Login";
import Main from "routers/Main";

const App = () => {
    const nav = useNavigate();
    const [getLoginCheck, setLoginCheck] = useState(false);
    const localValue = localStorage.getItem("loginCheck");
    useEffect(() => {
        // 로그인 체크
        localValue === "success"
            ? setLoginCheck(true)
            : setLoginCheck(false);
    }, [localValue])

    //로그아웃 버튼
    // const loginOut = () => {
    //     localStorage.setItem("loginCheck", "fail");
    //     setLoginCheck(false);
    // };

    return (
        <>
            {
                getLoginCheck === true
                    ? <Main getLoginCheck={getLoginCheck}></Main>
                    : <Login setLoginCheck={setLoginCheck}></Login>
            }
        </>
    );
};

export default App;