import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "asset/css/board/write.css";
import axios from "axios";
import { useEffect } from "react";

const BoardEdit = (props) => {
    const nav = useNavigate();
    const { id } = useParams();
    const [getTitle, setTitle] = useState("");
    const [getContent, setContent] = useState("");

    const back = () => {
        nav(-1);
    }

    const boardValue = async () => {

        const url = `${process.env.REACT_APP_API_URL}/board/check_board`;
        const boardData = {
            userId: sessionStorage.getItem("userId"),
            boardNum: props.getBoardList[id]?.i_board
        }

        await axios.post(url, boardData).then((res) => {
            setTitle(res.data.result.title);
            setContent(res.data.result.ctnt);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        boardValue();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();

        const url = `${process.env.REACT_APP_API_URL}/board/upd_board`;
        const boardData = {
            userId: sessionStorage.getItem("userId"),
            title: getTitle,
            ctnt: getContent,
            boardNum: props.getBoardList[id]?.i_board
        };

        await axios.post(url, boardData).then((res) => {
            setTitle("");
            setContent("");
            nav("/board");
        }).catch((error) => {
            console.log(error);
        });
    };

    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "content":
                setContent(value);
                break;

            default:
                break;
        }
    }

    return (
        <div className="write">
            <h2>게시글 작성</h2>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} name="title" type="text" placeholder="제목" value={getTitle} />
                <textarea onChange={onChange} name="content" placeholder="내용" value={getContent}></textarea>
                <div className="buttons">
                    <button type="button" onClick={back}>뒤로가기</button>
                    <button type="submit">작성하기</button>
                </div>
            </form>
        </div>
    );
};

export default BoardEdit;
