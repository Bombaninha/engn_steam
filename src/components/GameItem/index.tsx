import React from 'react';
import { TGame } from '../../types/TGame'

import {
    Container,
    ImageContainer,
    InfoContainer,
    ActionContainer,
    TitleContainer,
    Image,
    Title,
    Description,
    Price,
    BuyButton,
} from './styles';

interface GameProps {
    game: TGame;
    withButton: boolean;
}

const GameItem: React.FC<GameProps> = (props: GameProps) => {
    return (
        <Container>

            <InfoContainer>
                <ImageContainer>
                    <Image src={props.game.img} alt={props.game.title}></Image>
                </ImageContainer>

                <TitleContainer>
                    <Title>{props.game.title}</Title>
                    <br />
                    <Description>{props.game.description}</Description>
                </TitleContainer>
            </InfoContainer>

            <ActionContainer>
                <Price> {props.game.price.toFixed(2)} </Price>
                <br />
                {props.withButton ? <BuyButton>Comprar</BuyButton> : ""}
            </ActionContainer>

        </Container >
    );
}

export default GameItem;