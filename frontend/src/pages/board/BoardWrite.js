import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "asset/css/board/write.css";
import { useState } from "react";

const BoardWrite = () => {
    const nav = useNavigate();
    const [getTitle, setTitle] = useState("");
    const [getContent, setContent] = useState("");

    const back = () => {
        nav(-1);
        setTitle("");
        setContent("");
    }

    const onSubmit = async (e) => {
        e.preventDefault();


        const url = `${process.env.REACT_APP_API_URL}/board/ins_board`;
        const boardData = {
            id: sessionStorage.getItem("userId"),
            title: getTitle,
            content: getContent,
        };
        console.log(boardData);

        await axios.post(url, boardData).then((res) => {
            console.log("OK");
            console.log(res.data);
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

export default BoardWrite;