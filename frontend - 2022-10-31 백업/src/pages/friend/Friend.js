import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "asset/css/friend/friend.css";
import axios from "axios";
import FriendList from "components/FriendList";

const Friend = () => {
    //친구찾기 버튼
    const [getfind, setFind] = useState(false);
    //친구 검색 인풋
    const [getSearch, setSearch] = useState("");
    //찾은 친구
    const [getFindFriend, setFindFriend] = useState([]);
    // 친구요청 받을 친구아이디
    const [getResponesUser, setResponesUser] = useState(null);
    //메뉴 온오프
    const [userMenu, setUserMenu] = useState(0);
    const [isUserMenu, setIsUserMenu] = useState(false);
    //친구 요청취소
    const [getCencelFriend, setCencelFriend] = useState(null);
    //친구수락,거절
    const [getFirendReponse, setFirendReponse] = useState(false);
    //친구수락 거절 여부
    const [getIsFriend, setIsFriend] = useState(undefined);
    //친구 요청
    const [getReqFri, setReqFri] = useState([]);
    //친구 응답
    const [getResFri, setResFri] = useState([]);
    //친구 리스트
    const [getFriend, setFriend] = useState([]);
    //친구 리스트 숫자
    const [getFriendLength, setFindLength] = useState(getFriend.length);

    // 친구 리스트
    const getFiendList = async () => {
        const url = `/MVC/backend/user/reqing_friend`;
        let userState = [{ res: [] }, { req: [] }, { fri: [] }];

        const user = {
            user: sessionStorage.getItem("userId"),
        };

        await axios.post(url, user).then((res) => {
            res.data.forEach((el) => {
                if (el.onFriend === 0) {
                    //친구응답
                    if (el.resFri === sessionStorage.getItem("userId")) {
                        userState[0].res.push(el.reqFri);
                    }
                    //친구요청
                    if (el.reqFri === sessionStorage.getItem("userId")) {
                        userState[1].req.push(el.resFri);
                    }
                } else if (el.onFriend === 1) {
                    //친구들
                    if (el.reqFri === sessionStorage.getItem("userId")) {
                        userState[2].fri.push(el.resFri);
                    } else if (
                        el.resFri === sessionStorage.getItem("userId")
                    ) {
                        userState[2].fri.push(el.reqFri);
                    }
                }
            });
            setResFri([...userState[0].res]);
            setReqFri([...userState[1].req]);
            setFriend([...userState[2].fri]);
        }).catch((error) => {
            console.log(error);
        });
    };

    //친구리스트 불러오기
    useEffect(() => {
        if (getFriend !== getFriendLength) {
            getFiendList();
            setFindLength(getFriend.length);
        } else {
            return;
        }
    }, [getFriend]);

    //친구 검색
    const friendSearch = async (e) => {
        e.preventDefault();
        let userArr = [];

        if (getSearch === null || getSearch.length < 2) {
            alert("두글자 이상 입력해주세요");
            return;
        }

        const url = `/MVC/backend/user/find_friend`;
        const searchUser = {
            searchUser: getSearch,
        };

        await axios.post(url, searchUser).then((res) => {
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
        }).catch((error) => {
            console.log(error);
        });
    };

    //친구 요청
    const firendRequest = async (e) => {
        e.preventDefault();

        const url = `/MVC/backend/user/req_friend`;
        const friend = {
            requestUser: sessionStorage.getItem("userId"),
            responseUser: getResponesUser,
        };

        await axios.post(url, friend).then((res) => {

        }).catch((error) => {
            console.log(error);
        });

        window.location.reload();
    };

    //친구 요청 취소
    const firendRequestCancellation = async (e) => {
        e.preventDefault();

        const url = `/MVC/backend/user/deny_friend`;
        const friend = {
            requestUser: sessionStorage.getItem("userId"),
            responseUser: getCencelFriend,
        };

        await axios.post(url, friend).then((res) => {

        }).catch((error) => {
            console.log(error);
        });
    };

    //친구 삭제
    const deleteFriend = async (deleteFri) => {
        const url = `/MVC/backend/user/delete_friend`;
        const friend = {
            requestUser: sessionStorage.getItem("userId"),
            responseUser: deleteFri,
        };

        await axios.post(url, friend).then((res) => {

        }).catch((error) => {
            console.log(error);
        });
    };

    //친구 수락
    const firendReponse = async (e) => {
        e.preventDefault();

        const url = `/MVC/backend/user/accept_friend`;
        const friend = {
            requestUser: sessionStorage.getItem("userId"),
            responseUser: getFirendReponse,
            isFriend: getIsFriend,
        };

        await axios.post(url, friend).then((res) => {
            setIsFriend(false);
        }).catch((error) => {
            console.log(error);
        });
    };

    //친구 검색 리스트 받아오기
    useEffect(() => { }, [getFindFriend]);

    const onChange = (e) => {
        const value = e.target.value;
        setSearch(value);
    };

    return (
        <div className="friend">
            <div className="find">
                <button type="button" onClick={() => { setFind(!getfind); }}>
                    <i className="fa-solid fa-plus"></i>
                    친구 추가하기
                </button>

                <div className={getfind === true ? "findContainer on" : "findContainer"}>
                    <h2>친구 찾기</h2>

                    <button
                        type="button"
                        className="close"
                        onClick={() => {
                            setFind(!getfind);
                            setSearch("");
                            setFindFriend([]);
                        }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>

                    <form onSubmit={friendSearch}>
                        <div className="inputBox">
                            <input type="text" onChange={onChange} value={getSearch} />
                            <button type="submit">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </form>

                    <form className="searchList" onSubmit={firendRequest}>
                        {
                            getFindFriend.length <= 0
                                ? <p>일치하는 친구가 없습니다.</p>
                                : <ul>
                                    {getFindFriend.map((a, i) => {
                                        return (
                                            <li key={i}>
                                                <h3>{a.id}</h3>
                                                <button onClick={() => { setResponesUser(a.id); }}>친구 요청</button>
                                            </li>
                                        );
                                    })}
                                </ul>
                        }
                    </form>
                </div>
            </div>

            {/* 친구 수락 */}
            <form onSubmit={firendReponse}>
                <FriendList getFriList={getResFri} setFriend={setFirendReponse} button={"수락"} noButton={"거절"} setIsFriend={setIsFriend} title={"친구 요청옴"}></FriendList>
            </form>

            {/* 친구요청 */}
            <form onSubmit={firendRequestCancellation}>
                <FriendList getFriList={getReqFri} setFriend={setCencelFriend} button={"요청취소"} noButton={""} title={"친구요청보냄"}></FriendList>
            </form >

            {/* 친구목록 */}
            <div className="friendList">
                <h2>친구</h2>
                {
                    getFriend.length <= 0
                        ? <p>친구가 없습니다</p>
                        : <ul>
                            {
                                getFriend.map((a, i) => {
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
                                                <h3>{a}</h3>
                                                <span>친구</span>
                                            </div>
                                            <ul>
                                                <li>
                                                    <Link to={`/chat/${a.resFri}`}>
                                                        <i className="fa-solid fa-comment"></i>
                                                        1 : 1 채팅
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to={`info/${a.resFri}`}>
                                                        <i className="fa-regular fa-file-lines"></i>
                                                        정보 보기
                                                    </Link>
                                                </li>
                                                <li onClick={() => { deleteFriend(a); }}>
                                                    <span>
                                                        <i className="fa-solid fa-user-minus"></i>
                                                        친구 삭제
                                                    </span>
                                                </li>
                                            </ul>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                }
            </div>
        </div >
    );
};

export default Friend;
