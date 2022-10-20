import { usestate } from 'react';

const SignUp = () => {
    const [uid, setUid] = usestate('');
    const [upw, setUpw] = usestate('');
    const [upwCon, setUpwCon] = usestate('');
    const [nm, setNm] = usestate('');
    const [email, setEmail] = usestate('');

    return (
        <>
            <div>아이디
                <input
                    type="text"
                    value={uid}
                    onChange={(e) => {
                        setUid(e.target.value);
                    }}
                />
            </div>
            <div>비밀번호
                <input
                    type="password"
                    value={upw}
                    oncChange={(e) => {
                        setUpw(e.target.value);
                    }} />
            </div>
            <div>비밀번호 재확인
                <input
                    type="text"
                />
            </div>
        </>
    );
};

export default SignUp;