import React from 'react';
import styled from "styled-components";

const Input = styled.input`
    border: none;
    background-color: #fafafa;
    line-height: 40px;
    width: 95%;
    border-radius: 5px;
    padding: 5px 10px;
`;

const LoginButton = (props) => {
    return (
        <Input
            placeholder={props.placeholder}
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
        />
    );
};

export default LoginButton;