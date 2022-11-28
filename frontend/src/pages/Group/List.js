import React, { useState } from 'react';
import axios from 'axios';
import UserImage from "asset/image/userTest.png"

import "asset/css/group/list.css"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const List = () => {
    const nav = useNavigate();
    const [getList, setList] = useState([]);
    const friList = async () => {
        const url = `${process.env.REACT_APP_API_URL}/user/clients_list`;
        const data = {
            userId: sessionStorage.getItem("userId"),
        }
        await axios.post(url, data).then((res) => {
            setList(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        friList();
    }, [nav])
    return (
        <div className='list'>
            {/* <ul>
                {
                    getList?.map((a, i) => {
                        return (
                            <li key={i}>
                                <i className="fa-solid fa-user"></i>
                                <img src={a.profile} alt="" />
                                <div className="content">
                                    <div>
                                        <h2>{a.position}</h2>
                                        <h3>{a.name}</h3>
                                        <h4>{a.company}</h4>
                                        <h5>{a.tel}</h5>
                                    </div>
                                    <div>
                                        <a href={`tel:${a.tel}`}>
                                            <i className="fa-sharp fa-solid fa-phone"></i>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul> */}
        </div>
    );
};

export default List;