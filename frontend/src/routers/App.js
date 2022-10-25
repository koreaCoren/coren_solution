import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "asset/css/common.css";

import Login from "routers/Login";
import Main from "routers/Main";

const App = () => {
    const nav = useNavigate();
    const [getUser, setUser] = useState();
    const [getLoginCheck, setLoginCheck] = useState(false);
    useEffect(() => {
        // 로그인 체크
        if (sessionStorage.getItem('loginCheck') === "success") {
            setLoginCheck(true);
            setUser(sessionStorage.getItem('userId'));
        } else {
            setLoginCheck(false);
            setUser(undefined);
        }
    }, [sessionStorage.getItem('loginCheck')])

    //로그아웃 버튼
    const loginOut = () => {
        sessionStorage.removeItem("loginCheck");
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('loginToken');
        setUser(undefined);
        setLoginCheck(false);
    };

    return (
        <>
            {
                getLoginCheck === true
                    ? <Main
                        getLoginCheck={getLoginCheck}
                        getUser={getUser}
                        loginOut={loginOut}
                    ></Main>
                    : <Login
                        setLoginCheck={setLoginCheck}
                        setUser={setUser}
                    ></Login>
            }
        </>
    );
};

export default App;