import React from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Register from './Register';
import List from './List';

import "asset/css/group/group.css";

const Group = () => {
    return (
        <div className='group'>
            <nav>
                <Link to="/member">회원등록</Link>
                <Link to="/group">그룹관리</Link>
            </nav>
            <Routes>
                <Route path='/' element={<List />} />
                <Route path="/member" element={<Register />} />
            </Routes>
        </div>
    );
};

export default Group;