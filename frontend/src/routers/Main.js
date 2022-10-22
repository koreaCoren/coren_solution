import React from 'react';
import Header from 'components/Header';
import { Route, Routes } from 'react-router-dom';
import Board from './Board';

const Main = (props) => {
    return (
        <>
            <Header getLoginCheck={props.getLoginCheck}></Header>
            <main>
                <Routes>
                    <Route path='/*' element={<Board />}></Route>
                </Routes>
            </main>
        </>
    );
};

export default Main;