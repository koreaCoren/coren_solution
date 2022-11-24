import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import "asset/css/board/read.css";

import MyGroupList from "pages/myGroup/MyGroupList";
import MyGroupDetail from "pages/myGroup/MyGroupDetail";

const Board = () => {
    const [getBoardList, setBoardList] = useState([]);
    const getBoard = async () => {
        const url = `/MVC/backend/Board/sel_board`;
        await axios.get(url).then((res) => {
            setBoardList(res.data);
        })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getBoard();
    }, []);
    return (
        <>
            <Routes>
                <Route path="/*" element={<MyGroupList getBoardList={getBoardList} />}></Route>
                <Route path="/board/detail/:id/*" element={<MyGroupDetail getBoardList={getBoardList} />}></Route>
            </Routes>
        </>
    );
};

export default Board;
