import React, { useState } from 'react';

import "asset/css/chat/chat.css"

const Chat = () => {
    const [getChating, setChating] = useState("");

    const onChange = (e) => {
        const value = e.target.value;
        setChating(value);
    }
    return (
        <div className='chat'>
            <ul>
                <li className='right'><div>뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?뭘까요?</div></li>
                <li className='left'><div>ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ</div></li>
            </ul>

            <div className="submit">
                <textarea onChange={onChange} />
                <button><i className="fa-regular fa-paper-plane"></i></button>
            </div>
        </div >
    );
};

export default Chat;