import React from "react";
import { Link, useParams } from "react-router-dom";

import "asset/css/board/readDetail.css";
import axios from "axios";

const BoardDetail = (props) => {
    const { id } = useParams();

    const boardDelete = async () => {
        const ok = window.confirm("정말로 삭제 하시겠습니까?");
        const url = `${process.env.REACT_APP_API_URL}/??`;
        const user = {
            token: sessionStorage.getItem("loginToken"),
            userId: sessionStorage.getItem("userId"),
        }
        await axios.post(url, user).then((res) => {

        }).catch((error) => {

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
                    <button type="button"><i class="fa-solid fa-bars"></i></button>
                    <ul>
                        <li><Link>수정</Link></li>
                        <li><button>삭제</button></li>
                    </ul>
                </div>
            </div>
            <p>
                {
                    props.getBoardList[id]?.ctnt.split("\n").map((a, i) => {
                        return (<div key={i}>{a}<br /></div>)
                    })
                }
            </p>
        </div>
    );
};

export default BoardDetail;
