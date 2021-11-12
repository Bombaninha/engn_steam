import styled from "styled-components";

export const Container = styled.div``;

export const LoginView = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
`;

export const LoginMessageContainer = styled.div`
    margin: 1rem;
`;

export const LoginContainer = styled.div`
    max-width: 500px;
    padding: 20px;
    margin: 0;
    border: 1px solid #FFF;
    background-color: var(--dark-gray);
    border-radius: 2px;
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

    &.error {
      border: solid 1px #ff3333;  
    }
`;

export const LoginButton = styled.button`
    border: solid var(--yellow) 1px;
    background-color: transparent;
    color: var(--yellow);
    text-align: center;
    padding: 0.8rem 1.2rem;
    border-radius: 0.15rem;
    font-size: 1.2rem;
    cursor: pointer;
    background-color: var(--yellow);
    color: var(--black);
    border: none;
    margin: 1rem;
    width: -webkit-fill-available;
`;

export const ForgetPassword = styled.div`
    margin-top: 0.5rem;

    a {
        color: var(--yellow);
    }
`;

export const WithoutAccountContainer = styled.div`

`;

export const CreateAccountButton = styled.button`
    border: solid var(--yellow) 1px;
    background-color: transparent;
    color: var(--yellow);
    text-align: center;
    padding: 0.8rem 1.2rem;
    border-radius: 0.15rem;
    font-size: 1.2rem;
    cursor: pointer;
    background-color: var(--dark-gray);
    color: var(--yellow);
    border: 1px solid var(--yellow);
    margin: 0.5rem 1rem;
    width: -webkit-fill-available;
`;

export const Separator = styled.div`
    width: -webkit-fill-available;
    font-size: 1rem;
    color: #FFF;

    margin: 1.5rem 1rem 1rem 1rem;
    display: flex;
    align-items: center;

    &::before {
        content: '';
        flex: 1;
        height: 1px;
        background: #a8a8b3;
        margin-right: 16px;
    }

    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #a8a8b3;
        margin-left: 16px;
    }
`;

export const LoginErrors = styled.div`
    display: flex;
    margin-left: 1rem;
    flex-direction: flex-start;
    color: #ff3333;
    display : none;
`;