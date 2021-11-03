import styled from "styled-components";

export const LoginView = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: -webkit-fill-available;
`;

export const LoginContainer = styled.div`
    padding: 40px;
    margin: 0;
    background-color: var(--medium-gray);
    border-radius: 10px;
    text-align: center;
`;

export const InputBox = styled.input`
    width: -webkit-fill-available;
    border: solid var(--base-font-color) 1px;
    border-radius: 0.2rem;
    padding: 0.8rem 0.8rem;
    margin: 0.8rem 1rem;
    background-color: transparent;
    color: var(--base-font-color);
    font-size: 1rem;
`;

export const LoginButton = styled.button`
    border: solid var(--yellow) 1px;
    background-color: transparent;
    color: var(--yellow);
    text-align: center;
    padding: 0.8rem 1.2rem;
    border-radius: 0.15rem;
    font-size: 1rem;
    cursor: pointer;

    background-color: var(--yellow);
    color: var(--black);
    border: none;
    margin: 0.5rem 1rem;
`;