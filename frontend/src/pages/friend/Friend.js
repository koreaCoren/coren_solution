import React from "react";
import { Link } from 'react-router-dom';
import "asset/css/friend/friend.css";
import UserImage from "asset/image/userTest.png";

const Friend = () => {
    return (
        <div className="friend">
            <ul>
                <li><Link to={`/client/write`}><i className="fa-solid fa-plus"></i><h2>회원 등록</h2></Link></li>
                <li>
                    <img src={UserImage} alt="" />
                    <div className="content">
                        <div>
                            <h2>회장</h2>
                            <h3>코랜</h3>
                            <h4>Coren</h4>
                            <h5>010-0000-0000</h5>
                        </div>
                        <div>
                            <a href="tel:010-0000-0000">
                                <i className="fa-solid fa-phone"></i>
                            </a>
                        </div>
                    </div>
                </li>
                <li>
                    <img src={UserImage} alt="" />
                    <div className="content">
                        <div>
                            <h2>회장</h2>
                            <h3>코랜</h3>
                            <h4>Coren</h4>
                            <h5>010-0000-0000</h5>
                        </div>
                        <div>
                            <a href="tel:010-0000-0000">
                                <i className="fa-solid fa-phone"></i>
                            </a>
                        </div>
                    </div>
                </li>
            </ul>
        </div >
    );
};

export default Friend;
