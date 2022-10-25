import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "asset/css/friend/friend.css";
import axios from "axios";

const Friend = () => {
    //친구찾기 버튼
    const [getfind, setFind] = useState(false);
    //친구 검색 인풋
    const [getSearch, setSearch] = useState(null);
    //찾은 친구
    const [getFindFriend, setFindFriend] = useState([]);
    // 친구요청 받을 친구아이디
    const [getResponesUser, setResponesUser] = useState(null);
    // 친구 리스트
    const [getFriend, setFriend] = useState([]);
    //메뉴 온오프
    const [userMenu, setUserMenu] = useState(0);
    const [isUserMenu, setIsUserMenu] = useState(false);
    //친구 요청취소할 아이디
    const [getCencelFriend, setCencelFriend] = useState(null);

    // 친구 리스트
    const getFiendList = async () => {
        const url = `${process.env.REACT_APP_API_URL}/user/reqing_friend`;

        const user = {
            user: sessionStorage.getItem("userId"),
        };

        await axios
            .post(url, user)
            .then((res) => {
                setFriend(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //친구리스트 불러오기
    useEffect(() => {
        getFiendList();
    }, []);

    //친구 검색
    const friendSearch = async (e) => {
        e.preventDefault();
        let userArr = [];

        if (getSearch === null || getSearch.length < 2) {
            alert("두글자 이상 입력해주세요");
            return;
        }

        const url = `${process.env.REACT_APP_API_URL}/user/find_friend`;
        const searchUser = {
            searchUser: getSearch,
        };

        await axios
            .post(url, searchUser)
            .then((res) => {
                if (res.data.length === 0) {
                    alert("일치하는 친구가 없습니다.");
                } else {
                    if (getFriend.length > 0) {
                        userArr.push(...res.data);
                        for (let i = 0; i < getFriend.length; i++) {
                            userArr.forEach((el, index) => {
                                if (el.id === getFriend[i].resFri) {
                                    userArr.splice(index, 1);
                                }
                            });
                        }

                        setFindFriend([...userArr]);
                    } else {
                        setFindFriend(res.data);
                    }
                }
                alert("검색완료");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //친구 요청
    const firendRequest = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/user/req_friend`;
        const friend = {
            requestUser: sessionStorage.getItem("userId"),
            responseUser: getResponesUser,
        };

        await axios
            .post(url, friend)
            .then((res) => {})
            .catch((error) => {
                console.log(error);
            });

        window.location.reload();
    };

    //친구 요청 취소
    const firendRequestCancellation = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/user/`;
        const friend = {
            requestUser: sessionStorage.getItem("userId"),
            responseUser: getCencelFriend,
        };

        await axios
            .post(url, friend)
            .then((res) => {})
            .catch((error) => {
                console.log(error);
            });
    };

    //친구 검색 리스트 받아오기
    useEffect(() => {}, [getFindFriend]);

    const onChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    };

    return (
        <div className="friend">
            <div className="find">
                <button
                    type="button"
                    onClick={() => {
                        setFind(!getfind);
                    }}>
                    <i className="fa-solid fa-plus"></i>
                    친구 추가하기
                </button>

                <div
                    className={
                        getfind === true ? "findContainer on" : "findContainer"
                    }>
                    <h2>친구 찾기</h2>

                    <button
                        type="button"
                        className="close"
                        onClick={() => {
                            setFind(!getfind);
                        }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <form onSubmit={friendSearch}>
                        <div className="inputBox">
                            <input type="text" onChange={onChange} />
                            <button type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>

                    <form className="searchList" onSubmit={firendRequest}>
                        {getFindFriend.length <= 0 ? (
                            <p>일치하는 친구가 없습니다.</p>
                        ) : (
                            <ul>
                                {getFindFriend.map((a, i) => {
                                    return (
                                        <li key={i}>
                                            <h3>{a.id}</h3>
                                            <button
                                                onClick={() => {
                                                    setResponesUser(a.id);
                                                }}>
                                                친구 요청
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </form>
                </div>
            </div>
            <form onSubmit={firendRequestCancellation}>
                <div className="friendList">
                    {getFriend.length <= 0 ? (
                        <p>친구가 없습니다</p>
                    ) : (
                        <ul>
                            {getFriend.map((a, i) => {
                                return (
                                    <li
                                        key={i}
                                        onClick={() => {
                                            setUserMenu(i);
                                            i === userMenu
                                                ? setIsUserMenu(!isUserMenu)
                                                : setIsUserMenu(true);
                                        }}
                                        className={
                                            i === userMenu
                                                ? isUserMenu === true
                                                    ? "on"
                                                    : ""
                                                : ""
                                        }>
                                        <div>
                                            <h3>{a.resFri}</h3>
                                            {a.onFriend === 0 ? (
                                                <button
                                                    onClick={() => {
                                                        setCencelFriend(
                                                            a.resFri
                                                        );
                                                    }}>
                                                    요청취소
                                                </button>
                                            ) : (
                                                <div>친구</div>
                                            )}
                                        </div>
                                        {a.onFriend === 1 ? (
                                            <ul>
                                                <li>
                                                    <Link
                                                        to={`/chat/${a.resFri}`}>
                                                        <i className="fa-solid fa-comment"></i>
                                                        1 : 1 채팅
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to={`info/${a.resFri}`}>
                                                        <i className="fa-regular fa-file-lines"></i>
                                                        정보 보기
                                                    </Link>
                                                </li>
                                            </ul>
                                        ) : null}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Friend;
