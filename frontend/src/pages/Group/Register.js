import React from 'react';

import "asset/css/group/register.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const nav = useNavigate();
    const [getName, setName] = useState("");
    const [getTel, setTel] = useState("");
    const [getPosition, setPosition] = useState("");
    const [getCompany, setCompany] = useState("");
    const [getGroup, setGroup] = useState("1번");
    const [getProfile, setProfile] = useState("");
    const [getProfileImage, setProfileImage] = useState("");

    const memberRegister = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/user/ins_client`;

        const memberData = {
            userId: sessionStorage.getItem("userId"),
            name: getName,
            tel: getTel,
            position: getPosition,
            company: getCompany,
            group: getGroup,
            profile: getProfile,
        }

        await axios.post(url, memberData).then((res) => {
            nav("/");
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
            case "position":
                setPosition(value);
                break;
            case "company":
                setCompany(value);
                break;
            case "group":
                setGroup(value);
                break;
            default:
                break;
        }
    };

    const onFileChange = (e) => {
        const url = `${process.env.REACT_APP_API_URL}/user/profileInsImg/${sessionStorage.getItem("userId")}`;
        const { target: { files }, } = e;
        const theFile = files[0];
        const reader = new FileReader();
        const formData = new FormData();
        formData.append('img', theFile);
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setProfileImage(result);
        };
        reader.readAsDataURL(theFile);
    }

    return (
        <div className='profileContainer'>
            <form onSubmit={memberRegister}>
                <div className="profiles">
                    {
                        getProfileImage === ""
                            ? <i className="fa-solid fa-user">
                                <input type="file" accept="image/*" onChange={onFileChange} />
                            </i>
                            : <div className='myImage'>
                                <img src={getProfileImage} alt="" />
                                <input type="file" accept="image/*" onChange={onFileChange} />
                            </div>
                    }
                </div>
                <span>이름</span>
                <input onChange={onChange} name='name' type="text" placeholder='이름' />
                <span>전화번호</span>
                <input onChange={onChange} name='tel' type="text" placeholder='전화번호' />
                <span>직책</span>
                <input onChange={onChange} name='position' type="text" placeholder='직책' />
                <span>회사</span>
                <input onChange={onChange} name='company' type="text" placeholder='회사' />
                <span>그룹</span>
                <div className="select">
                    <select onChange={onChange} name='group' value={getGroup}>
                        <option value="1번">1번</option>
                        <option value="2번">2번</option>
                    </select>
                    <i className="fa-solid fa-sort-down"></i>
                </div>
                <button>저장하기</button>
            </form>
        </div>
    );
};

export default Register;