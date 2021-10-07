import styled from "styled-components";

/**
*   Layout
*   AS = Aside
*   CT = Content
*/

export const Grid = styled.div`
    display: grid;

    grid-template-columns: 250px auto;
    grid-template-areas: 
    'AS CT';

    height: 100vh;
`;