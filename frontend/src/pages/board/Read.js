import React from 'react';
import { Link } from 'react-router-dom';

import "asset/css/board/read.css"

const Read = (props) => {
    return (
        <>
            <ul className='boardList'>
                {
                    props.getBoardList.map((a, i) => {
                        return (
                            <li key={i}>
                                <Link to={`/board/detail/${i}`}>
                                    <h2>{a.title}</h2>
                                    <h3>
                                        <div className="days">2022/10/22</div>
                                        <div className="name">pkd***</div>
                                    </h3>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>

        </>
    );
};

export default Read;