/* eslint-disable no-fallthrough */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "asset/css/login/login.css";
import axios from 'axios';

const Login = (props) => {
    const nav = useNavigate();

    const [getId, setId] = useState();
    const [getPassword, setPassword] = useState();

    const onSubmit = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/user/sel_user`;
        const loginData = {
            id: getId,
            pw: getPassword,
        }

        await axios.post(url, loginData).then((res) => {
            if (res.data.result === "success") {
                localStorage.setItem('loginCheck', 'success');
                props.setLoginCheck(true);
                nav('/');
            }
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
            case "pw":
                setPassword(value);
            default:
                break;
        }
    }

    return (
        <>
            <div className="loginContainer">
                <h2>회원수첩</h2>

                <form onSubmit={onSubmit}>
                    <input type="text" onChange={onChange} name="id" placeholder='아이디' />
                    <input type="password" onChange={onChange} name="pw" placeholder='비밀번호' />

                    <button className='buttonBlue' type='submit'>로그인</button>
                    <Link to="/register" className='buttonGary'>회원가입</Link>
                    <Link to="/recover" className='recover'>아이디 / 비밀번호 찾기</Link>
                </form>
            </div>
        </>
    );
};

export default Login; 