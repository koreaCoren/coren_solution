import React from 'react';

import "asset/css/mypage/mypage.css";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const MyPage = () => {
    const [getUserInfo, setUserInfo] = useState();
    const [getProfileImage, setProfileImage] = useState("");

    const userInfo = async () => {
        const url = `/MVC/backend/user/mypage`;
        const userData = {
            token: sessionStorage.getItem("loginToken"),
            userId: sessionStorage.getItem("userId"),
        }
        await axios.post(url, userData).then((res) => {
            setUserInfo(res.data);
            // setProfileImage(res.data);
            console.log(getProfileImage);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        userInfo();
    }, [])

    const onFileChange = (e) => {
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
        const userId = sessionStorage.getItem("userId");
        axios.post(`/MVC/backend/user/profileInsImg/${userId}`, formData)
            .then((res) => {
                console.log(res.data);
            }).catch((error) => {
                console.log(error);
            })

        console.log(formData.get("img"));
    }
    const onClearPhoto = () => {
        if (getProfileImage !== "") {
            setProfileImage("");
        }
    }
    console.log(getProfileImage);
    return (
        <>
            <div className="profile">
                {
                    getProfileImage === ""
                        ? getUserInfo?.img === ""
                            ? <i className="fa-solid fa-user">
                                <input type="file" accept="image/*" onChange={onFileChange} />
                            </i>
                            : <div className='myImage'>
                                <img src={getUserInfo?.img} alt="" />
                                <input type="file" accept="image/*" onChange={onFileChange} />
                            </div>
                        : <div className='myImage'>
                            <img src={getProfileImage} alt="" />
                            <input type="file" accept="image/*" onChange={onFileChange} />
                        </div>
                }
                <h2>{getUserInfo?.id}</h2>
            </div>
            <div className="userInfo">
                <ul>
                    <li>
                        <div><i className="fa-solid fa-phone"></i>전화번호 </div>
                        <h3>{getUserInfo?.tell}</h3>
                    </li>
                    <li>
                        <div><i className="fa-solid fa-envelope"></i>이메일</div>
                        <h3>{getUserInfo?.email}</h3>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default MyPage;