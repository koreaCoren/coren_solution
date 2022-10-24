import React from "react";
import { useParams } from "react-router-dom";

const ReadDateil = (props) => {
    const { id } = useParams();
    return (
        <>
            <p>제목 : {props.getBoardList[id]?.title}</p>
            <p>게시판내용 : {props.getBoardList[id]?.ctnt}</p>
        </>
    );
};

export default ReadDateil;
