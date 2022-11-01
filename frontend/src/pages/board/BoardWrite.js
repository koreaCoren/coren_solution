import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BoardWrite = (props) => {
    const nav = useNavigate();
    const { id } = useParams();
    //회원가입
    const onSubmit = async (e) => {
        e.preventDefault();


        const url = `${process.env.REACT_APP_API_URL}/board/ins_board`;
        const loginData = {
            id: id,
        };

        await axios.post(url, loginData).then((res) => {
            alert("회원가입 완료되었습니다.");
            nav("/");
        })
            .catch((error) => {
                console.log(error);
                console.log("되겠냐?");
            });
    };
    return (
        <>
            <p>아이디 : {props.getBoardList[id]?.id}</p>
            <p>제목 : <input type="text" name="title" placeholder="제목" /></p>
            <p>게시판내용 : <input type="text" name="ctnt" placeholder="내용" /></p>
        </>
    );
};

export default BoardWrite;