import React from 'react';

import "asset/css/mypage/mypage.css";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const MyPage = () => {
    const [getUserInfo, setUserInfo] = useState();
    const [getProfileImage, setProfileImage] = useState("");

    const userInfo = async () => {
        const url = `${process.env.REACT_APP_API_URL}/user/mypage`;
        const userData = {
            token: sessionStorage.getItem("loginToken"),
            userId: sessionStorage.getItem("userId"),
        }
        await axios.post(url, userData).then((res) => {
            setUserInfo(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        userInfo();
    }, [getProfileImage])

        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = async (finishedEvent) => {
            const {
                currentTarget: { result },
            } = finishedEvent;
            setAttachment(result);
            await console.log(result);
        };
        reader.readAsDataURL(theFile);

    }

    return (
        <>
            <div className="profile">
                {

                    getUserInfo?.img.includes('jpg') !== true
                        ? <i className="fa-solid fa-user">
                            <img src={getProfileImage} alt="" />
                            <input type="file" accept="image/*" onChange={onFileChange} />
                        </i>
                        : <div className='myImage'>
                            <img src={getUserInfo?.img} alt="" />
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