import React from 'react';

const FriendList = (props) => {
    return (
        <div className="friendList">
            <h2>{props.title}</h2>
            {
                props.getFriList.length <= 0
                    ? <p>요청한 친구가 없습니다</p>
                    : <ul>
                        {
                            props.getFriList.map((a, i) => {
                                return (
                                    <li key={i}>
                                        <div>
                                            <h3>{a}</h3>
                                            <div>
                                                <button onClick={() => { props.setFriend(a); props.setIsFriend(true) }}>{props.button}</button>
                                                {
                                                    props.noButton === "거절"
                                                        ? <button onClick={() => { props.setFriend(a); props.setIsFriend(false) }}>{props.noButton}</button>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
            }
        </div>
    );
};

export default FriendList;