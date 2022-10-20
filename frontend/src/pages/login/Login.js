/* eslint-disable no-fallthrough */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "asset/css/login/login.css";
import axios from 'axios';

const Login = () => {

    const [getId, setId] = useState();
    const [getPassword, setPassword] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios({
            url: "MVC/backend/user/sel_user",
            method: "post",
            data: {
                id: getId,
                password: getPassword,
            }
        }).then((res) => {
            console.log(res);
            console.log("성공");
        }).catch((error) => {
            console.log(error);
            console.log("응 안됨 돌아가");
        })
    }

    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        switch (name) {
            case "id":
                setId(value);
            case "password":
                setId(value);
            default:
                break;
        }
    }

    return (
        <>
            <div className="loginContainer">
                <h2>LOGIN</h2>

                <form onSubmit={onSubmit}>
                    <input type="text" onChange={onChange} name="id" placeholder='아이디' />
                    <input type="password" onChange={onChange} name="password" placeholder='비밀번호' />

                    <button type='submit'>로그인</button>
                    <Link className='modify'>회원가입</Link>
                    <Link className='recover'>아이디 / 비밀번호 찾기</Link>
                </form>
            </div>
        </>
    );
};

export default Login;