import React from "react";
import UserImage from "asset/image/userTest.png"

import "asset/css/advertisement/advertisement.css"

const Advertisement = () => {
    return (
        <div className="advertisement">
            <ul>
                <li>
                    <img src={UserImage} alt="" />
                    <p>광고입니다</p>
                </li>
                <li>
                    <img src={UserImage} alt="" />
                    <p>광고입니다</p>
                </li>
                <li>
                    <img src={UserImage} alt="" />
                    <p>광고입니다</p>
                </li>
                <li>
                    <img src={UserImage} alt="" />
                    <p>광고입니다</p>
                </li>
            </ul>
        </div >
    );
};

export default Advertisement;
