/* eslint-disable no-fallthrough */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "asset/css/login/login.css";
import axios from "axios";
import LoginButton from "components/button/LoginButton";
import Input from "components/input/input";

const Register = () => {
    const nav = useNavigate();

    const [getId, setId] = useState();
    const [getPassword, setPassword] = useState();
    const [getTelll, setTell] = useState();
    const [getEamil, setEmail] = useState();

    //회원가입
    const onSubmit = async (e) => {
        e.preventDefault();
        const emailRegex =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!emailRegex.test(getEamil)) {
            alert("이메일 형식이 아님 다시 적으셈");
            return;
        };

        const url = `${process.env.REACT_APP_API_URL}/user/ins_user`;
        const loginData = {
            id: getId,
            pw: getPassword,
            tell: getTelll,
            email: getEamil,
        };

        await axios.post(url, loginData).then((res) => {
            if (res.data.id === false) {
                alert("중복된 아이디입니다.");
                return;
            } else if (res.data.email === false) {
                alert("중복된 이메일입니다.");
                return;
            } else {
                alert("회원가입 완료되었습니다.");
                nav("/");
            }
        }).catch((error) => {
            console.log(error);
            console.log("되겠냐?");
        });
    };

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
            case "tell":
                setTell(value);
                break;
            case "email":
                setEmail(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="loginContainer">
                <h2>회원가입</h2>

                <form onSubmit={onSubmit}>
                    <Input type="text" name="id" onChange={onChange} placeholder="아이디" />
                    <Input type="password" name="pw" onChange={onChange} placeholder="비밀번호" />
                    <Input type="text" name="tell" onChange={onChange} placeholder="전화번호" />
                    <Input type="text" name="email" onChange={onChange} placeholder="이메일" />

                    <LoginButton text="가입하기" type="submit" />
                    <button type="button" className="buttonGary" onClick={() => { nav(-1); }}>뒤로가기</button>
                </form>
            </div>
        </>
    );
};

export default Register;
