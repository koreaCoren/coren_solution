import React from 'react';

const ResFriList = (props) => {
    return (
        <div className="friendList">
            <h2>친구요청받음</h2>
            {
                props.getResFri.length <= 0
                    ? <p>요청한 친구가 없습니다</p>
                    : <ul>
                        {
                            props.getResFri.map((a, i) => {
                                return (
                                    <li key={i}>
                                        <div>
                                            <h3>{a}</h3>
                                            <button onClick={() => { props.setFirendReponse(a) }}>수락</button>
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

export default ResFriList;