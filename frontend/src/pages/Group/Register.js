import React from 'react';

import "asset/css/group/register.css"
import { useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';

const Register = () => {
    const [getName, setName] = useState("");
    const [getTel, setTel] = useState("");
    const [getPosition, setPosition] = useState("");
    const [getCompany, setCompany] = useState("");
    const [getGroup, setGroup] = useState("1번");
    const [getProfile, setProfile] = useState("");
    const fileInput = useRef(null);
    const [getImg, setImg] = useState("");

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
            console.log(res.data);
            console.log(memberData);
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

    /*const imgChange = async (e) => {
        //console.log(e.target.files[0]);
        const url = `${process.env.REACT_APP_API_URL}/user/profileInsImg`;
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        
        //for(const key of formData.entries()){
        //    console.log(key[0] + ', ' + key[1]);
        //}

        await axios.post(url, formData).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        })
    } */

    const [attachment, setAttachment] = useState("");
    const onFileChange = async (event) => {
        const { target: { files }, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
        console.log(result);
        };
        reader.readAsDataURL(theFile);

        const url = `${process.env.REACT_APP_API_URL}/user/profileInsImg`;
        console.log(attachment);
        await axios.post(url, attachment).then((res) => {

            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const onClearPhoto = () => {
        if (attachment !== "") {
        setAttachment("");
        }
    }

    const insertImg = (e) => {
        fileInput.current.click();
        console.log()
    }

    return (
        <div className='profileContainer'>
            <form onSubmit={memberRegister}>
                <div className="profiles">
                    <i className="fa-solid fa-user"
                    onClick={insertImg}></i>
                </div>
                <input type="file" accept='image/*'
                className='profileImg' ref={fileInput}
                onChange={onFileChange} />
                <img src={attachment} />
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