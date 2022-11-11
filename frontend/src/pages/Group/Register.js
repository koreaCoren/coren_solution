import React from 'react';

import "asset/css/group/register.css"
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [getName, setName] = useState("");
    const [getTel, setTel] = useState("");
    const [getGroup, setGroup] = useState("");

    const memberRegister = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/board/del_board`;

        const memberData = {
            name: getName,
            tel: getTel,
            group: getGroup
        }

        await axios.post(url, memberData).then((res) => {

        }).catch((error) => {
            console.log(error);
        })
    }

    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "tel":
                setTel(value);
                break;
            case "group":
                setGroup(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <form onSubmit={memberRegister}>
                <span>이름</span>
                <input onChange={onChange} name='name' type="text" placeholder='이름' />
                <span>전화번호</span>
                <input onChange={onChange} name='tel' type="text" placeholder='전화번호' />
                <span>그룹</span>
                <div className="select">
                    <select onChange={onChange} name='group'>
                        <option value="1번">1번</option>
                        <option value="2번">2번</option>
                    </select>
                    <i className="fa-solid fa-sort-down"></i>
                </div>
                <button>저장하기</button>
            </form>
        </>
    );
};

export default Register;