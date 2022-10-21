import React from 'react';
import { Link } from 'react-router-dom';

import "asset/css/board/read.css"

const Read = (props) => {
    return (
        <>
            <ul>
                {
                    props.getBoardList.map((a, i) => {
                        return (
                            <li key={i}><Link to={`/board/detail/${i}`}>{a.title}</Link></li>
                        )
                    })
                }
            </ul>

        </>
    );
};

export default Read;