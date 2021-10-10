import React from 'react';
import { TGame } from '../../types/TGame'
import DefaultButton from '../default_button';

import {
    Container,
    InfoContainer,
    ActionContainer,
    TitleContainer,
    Title,
    Categories,
    Developer,
    Price,
} from './styles';

interface GameProps {
    game: TGame;
    withButton: boolean;
    onClick: (value: TGame | null) => void
}

const GameItem: React.FC<GameProps> = (props: GameProps) => {
    const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		event.preventDefault()
		props.onClick(props.game)
	}

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
                {props.withButton ? <button onClick={handleClick}>Comprar</button> : ""}
            </ActionContainer>
        </Container >
    );
}

export default GameItem;