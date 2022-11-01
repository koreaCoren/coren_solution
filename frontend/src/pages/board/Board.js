import React from 'react';
import { Link } from 'react-router-dom';

import "asset/css/board/read.css";

const BoardList = (props) => {
    return (
        <>
            <ul className='boardList'>
                <li><Link to={`/board/write`}><h2>글쓰기</h2></Link></li>
                {
                    props.getBoardList.map((a, i) => {
                        return (
                            <li key={i}>
                                <Link to={`/board/detail/${i}`}>
                                    <h2>{a.title}</h2>
                                    <h3>
                                        <div className="days">{a.cre_date}</div>
                                        <div className="name">{a.id}</div>
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

export default BoardList;