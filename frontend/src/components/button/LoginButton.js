import React from 'react';
import styled from "styled-components";

const Button = styled.button`
    width: 95%;
    text-align: center;
    background-color: var(--bt-color-t1);
    color: #fff;
    line-height: 40px;
    border-radius: 5px;
    font-family: var(--main-font);
    cursor: pointer;
`;

const LoginButton = (props) => {
    return (
        <Button>{props.text}</Button>
    );
};

export default LoginButton;