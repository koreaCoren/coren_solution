/* eslint-disable no-fallthrough */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "asset/css/login/login.css";
import axios from 'axios';

const Modify = () => {

    const [getId, setId] = useState();
    const [getPassword, setPassword] = useState();
    const [getEamil, setEmail] = useState();

    const onSubmit = async (e) => {
        const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!emailRegex.test(getEamil)) {
            alert("이메일 형식이 아님 다시 적으셈");
            return;
        }

        const url = "https://0d56cdb4-a231-4fc7-9510-bd3644fbdcd2.mock.pstmn.io/login";
        const loginData = {
            id: getId,
            password: getPassword,
            email: getEamil,
        }

        await axios.post(url, loginData).then((res) => {
            console.log(res);
            console.log("성공");
        }).catch((error) => {
            console.log(error);
            console.log("되겠냐?");
        })

        e.preventDefault();
    }

    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        switch (name) {
            case "id":
                setId(value);
            case "password":
                setPassword(value);
            case "email":
                setEmail(value);
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
                    <input type="password" onChange={onChange} name="password" placeholder='비밀번호' />
                    <input type="text" onChange={onChange} name="email" placeholder='이메일' />

                    <button type='submit'>가입하기</button>
                </form>
            </div>
        </>
    );
};

export default Modify;