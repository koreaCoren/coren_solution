import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "asset/css/common.css";

import Login from "routers/Login";
import Main from "routers/Main";
import axios from "axios";

const App = () => {
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
    const loginOut = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/user/break_token`;
        const userId = sessionStorage.getItem('userId');
        const Data = {
            userId: userId
        }

        await axios.post(url, Data).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        })

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
                        setUser={setUser}
                        setLoginCheck={setLoginCheck}
                    ></Main>
                    : <Login setLoginCheck={setLoginCheck} setUser={setUser}></Login>
            }
        </>
    );
};

export default App;