/* eslint-disable no-fallthrough */
import React, { useState } from 'react';

import "asset/css/login/login.css";
import axios from 'axios';

const Register = () => {

    const [getId, setId] = useState();
    const [getPassword, setPassword] = useState();
    const [getEamil, setEmail] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!emailRegex.test(getEamil)) {
            alert("이메일 형식이 아님 다시 적으셈");
            return;
        }

        const url = "http://192.168.0.86/MVC/backend/user/ins_user";
        const loginData = {
            id: getId,
            pw: getPassword,
            email: getEamil,
        }

        await axios.post(url, loginData).then((res) => {
            console.log(res);
            console.log("성공");
        }).catch((error) => {
            console.log(error);
            console.log("되겠냐?");
        })
    }

    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        switch (name) {
            case "id":
                setId(value);
                break;
            case "pw":
                setPassword(value);
                break;
            case "email":
                setEmail(value);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="loginContainer">
                <h2>회원가입</h2>

                <form onSubmit={onSubmit}>
                    <input type="text" onChange={onChange} name="id" placeholder='아이디' />
                    <input type="password" onChange={onChange} name="pw" placeholder='비밀번호' />
                    <input type="text" onChange={onChange} name="email" placeholder='이메일' />

                    <button type='submit'>가입하기</button>
                </form>
            </div>
        </>
    );
};

export default Register;