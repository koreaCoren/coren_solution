import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import "asset/css/friend/friend.css"
import axios from 'axios';

const Friend = () => {
    const [getfind, setFind] = useState(false);
    const [getSearch, setSearch] = useState();
    const [getFriend, setFriend] = useState([]);

    const friendSearch = async (e) => {
        e.preventDefault();

        const url = "";
        await axios.post(url, getSearch).then((res) => {
            setFriend(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    const onChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    }

    return (
        <div className='friend'>
            <div className="find">
                <button type='button' onClick={() => { setFind(!getfind) }}>
                    <i className="fa-solid fa-plus"></i>
                    친구 추가하기
                </button>

                <div className={getfind === true ? "findContainer on" : "findContainer"}>
                    <h2>친구 찾기</h2>

                    <button type='button' className="close" onClick={() => { setFind(!getfind) }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <form onSubmit={friendSearch}>
                        <div className="inputBox">
                            <input type="text" onChange={onChange} />
                            <button type='submit'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                        {
                            getFriend.length <= 0
                                ? <p>일치하는 친구가없습니다.</p>
                                : <ul>
                                    {
                                        getFriend.map((a, i) => {
                                            return (
                                                <li key={i}>
                                                    <h3>{a.neme}</h3>
                                                    <button>친구 요청</button>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Friend;