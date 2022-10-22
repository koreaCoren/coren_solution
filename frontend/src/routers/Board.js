import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import "asset/css/board/read.css"

import Read from 'pages/board/Read';
import ReadDetail from 'pages/board/ReadDetail';

const Board = () => {
    const [getBoardList, setBoardList] = useState([]);
    const getBoard = async () => {
        const url = "https://0d56cdb4-a231-4fc7-9510-bd3644fbdcd2.mock.pstmn.io/boardList";
        await axios.get(url).then((res) => {
            setBoardList(res.data);
        }).catch((error) => {

        })
    }
    useEffect(() => {
        getBoard();
    }, [])
    return (
        <>
            <Routes>
                <Route path='/' element={<Read getBoardList={getBoardList} />}></Route>
                <Route path='/board/detail/:id/*' element={<ReadDetail getBoardList={getBoardList} />}></Route>
            </Routes>
        </>
    );
};

export default Board;