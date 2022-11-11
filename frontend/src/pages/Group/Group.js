import React from 'react';

import "asset/css/group/group.css";
import { Link, Route, Routes } from "react-router-dom";
import Register from './Register';

const Group = () => {
    return (
        <div className='group'>
            <nav>
                <Link to="/member">회원등록</Link>
                <Link to="/group">그룹관리</Link>
            </nav>
            <Routes>
                <Route path="/member" element={<Register />} />
            </Routes>
        </div>
    );
};

export default Group;