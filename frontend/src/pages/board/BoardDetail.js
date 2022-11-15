import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "asset/css/board/readDetail.css";
import axios from "axios";
import { useState } from "react";

const BoardDetail = (props) => {
    const nav = useNavigate();
    const { id } = useParams();
    const [getButtons, setButtons] = useState(false);

    const boardDelete = async () => {
        const ok = window.confirm("정말로 삭제 하시겠습니까?");
        if (ok) {
            const url = `/MVC/backend/board/del_board`;
            const user = {
                userId: sessionStorage.getItem("userId"),
                boardNum: props.getBoardList[id]?.i_board
            }
            await axios.post(url, user).then((res) => {
                nav(-1);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <div className="read">
            <div className="title">
                <div>
                    <h1>{props.getBoardList[id]?.title}</h1>
                    <h2>작성자 {props.getBoardList[id]?.id}</h2>
                    <h3>작성일 {props.getBoardList[id]?.cre_date}</h3>
                </div>
                {
                    props.getBoardList[id].id === sessionStorage.getItem("userId")
                        ? <div className="button">
                            <button type="button" onClick={() => { setButtons(!getButtons) }}>
                                <i className="fa-solid fa-bars"></i>
                            </button>
                            <ul className={getButtons === true ? "on" : ""}>
                                <li><Link to={`/board/edit/${id}`}>수정</Link></li>
                                <li><button onClick={boardDelete}>삭제</button></li>
                            </ul>
                        </div>
                        : null
                }

            </div>
            <div className="content">
                {
                    props.getBoardList[id]?.ctnt.split("\n").map((a, i) => {
                        return (<p key={i}>{a}<br /></p>)
                    })
                }
            </div>
        </div>
    );
};

export default BoardDetail;
