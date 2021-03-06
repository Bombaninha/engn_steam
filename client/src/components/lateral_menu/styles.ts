import styled from "styled-components";

export const LateralMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--medium-gray);
    min-height: 100vh;
    min-width: 15%;
    max-width: 15%;
    padding: 2rem 0.5rem;
    margin-right: 1rem;
`;

export const LateralMenuButton = styled.button`
    color: var(--base-font-color);
    background-color: transparent;
    border: none;
    font-size: 2rem;
    margin-bottom: 1rem;
    cursor: pointer;
`;