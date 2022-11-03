import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "asset/css/board/readDetail.css";
import axios from "axios";

const BoardDetail = (props) => {
    const nav = useNavigate();
    const { id } = useParams();

    const boardDelete = async () => {
        const ok = window.confirm("정말로 삭제 하시겠습니까?");
        const url = `${process.env.REACT_APP_API_URL}/board/del_board`;
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

    return (
        <div className="read">
            <div className="title">
                <div>
                    <h1>{props.getBoardList[id]?.title}</h1>
                    <h2>작성자 {props.getBoardList[id]?.id}</h2>
                    <h3>작성일 {props.getBoardList[id]?.cre_date}</h3>
                </div>
                <div className="button">
                    <button type="button"><i className="fa-solid fa-bars"></i></button>
                    <ul>
                        <li><Link>수정</Link></li>
                        <li><button onClick={boardDelete}>삭제</button></li>
                    </ul>
                </div>
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
