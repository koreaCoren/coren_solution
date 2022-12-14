import React from "react";
import { useParams } from "react-router-dom";

const MyGroupDetail = (props) => {
    const { id } = useParams();
    return (
        <>
            <p>아이디 : {props.getBoardList[id]?.id}</p>
            <p>제목 : {props.getBoardList[id]?.title}</p>
            <p>게시판내용 : {props.getBoardList[id]?.ctnt}</p>
        </>
    );
};

export default MyGroupDetail;
