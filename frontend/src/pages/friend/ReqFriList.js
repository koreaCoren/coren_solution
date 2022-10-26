import React from 'react';

const ReqFriList = (props) => {
    return (
        <div className="friendList">
            <h2>친구요청보냄</h2>
            {
                props.getReqFri.length <= 0
                    ? <p>요청한 친구가 없습니다</p>
                    : <ul>
                        {
                            props.getReqFri.map((a, i) => {
                                return (
                                    <li key={i}>
                                        <div>
                                            <h3>{a}</h3>
                                            <button onClick={() => { props.setCencelFriend(a) }}>요청취소</button>
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

export default ReqFriList;