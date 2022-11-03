import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

import "asset/css/board/read.css";

import BoardList from "pages/board/Board";
import BoardWrite from "pages/board/BoardWrite";
import BoardDetail from "pages/board/BoardDetail";
import BoardEdit from "pages/board/BoardEdit";

const Board = () => {
    const nav = useNavigate();
    const [getBoardList, setBoardList] = useState([]);
    const getBoard = async () => {
        const url = `${process.env.REACT_APP_API_URL}/Board/sel_board`;
        await axios.get(url).then((res) => {
            setBoardList(res.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getBoard();
    }, [nav]);

    return (
        <>
            <Routes>
                <Route path="/*" element={<BoardList getBoardList={getBoardList} />}></Route>
                <Route path="/write/*" element={<BoardWrite />}></Route>
                <Route path="/detail/:id/*" element={<BoardDetail getBoardList={getBoardList} />}></Route>
                <Route path="/edit/:id/*" element={<BoardEdit getBoardList={getBoardList} />}></Route>
            </Routes>
        </>
    );
};

export default Board;
