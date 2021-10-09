import React from 'react';
import { TGame } from '../../types/TGame'

import {
    Container,
    InfoContainer,
    ActionContainer,
    TitleContainer,
    Title,
    Categories,
    Developer,
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
                <TitleContainer>
                    <Title>{props.game.title}</Title>
                    <br />
                    <Categories>{props.game.categories.join(', ')}</Categories>
                    <Developer>{props.game.developer}</Developer>
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