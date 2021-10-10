import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    border-style: solid;
    border-width: 1px;
    border-color: var(--light-gray);
    border-radius: 6px;

    transition: 0.3s;

    margin: 20px 0;
    padding: 10px;

    background-color: var(--dark-gray);

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(255,255,255,0.2);
    }
`;

export const ImageContainer = styled.div`
    
`;

export const TitleContainer = styled.div`
    margin-left: 20px;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 200px;
    
    margin-right: 20px;
    margin-left: 60px;
`;

export const Title = styled.span`
    color: var(--base-font-color);
    font-size: 35px;
`;

export const Categories = styled.div`
    color:  var(--light-gray);
    font-size: 16px;
    margin-top: 10px;
    
    text-align: justify;
    text-justify: inter-word;
`;

export const Developer = styled.div`
    color:  var(--light-gray);
    font-size: 14px;
    margin-top: 10px;
    
    text-align: justify;
    text-justify: inter-word;
`;

export const Price = styled.span`
    color: var(--base-font-color);
    font-size: 30px;

    &::before{
        content: "R$ ";
        color: var(--light-gray);
    }
`;

export const Image = styled.img`
    width: 150px;
    height: 150px;
`;

export const BuyButton = styled.button`
    background-color: var(--yellow);
    color: var(--dark-gray);
    font-size: 20px;
    transition: transform .2s;

    padding: 12px;
    border-radius: 2px;
    border-style: none;
    width: 200px;

    &:hover {
        filter: brightness(110%);
        transition: 0.4s;
        transform: scale(1.05);
    }
`;
