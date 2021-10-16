import React from 'react';
import { TGame } from '../../types/TGame'
import DefaultButton from '../default_button'
import './styles.css'

import {
    Container,
    InfoContainer,
    ActionContainer,
    TitleContainer,
    Title,
    Categories,
    Developer,
    Price,
    Purchased,
} from './styles';

interface GameProps {
    game: TGame;
    onClick?: (value: TGame | null) => void
    withButton?: boolean;
    purchasedAt?: Date | null;
}

const GameItem: React.FC<GameProps> = (props: GameProps) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.game)
        }
	}

    return (
        <Container className="game-item-wrapper">
            <InfoContainer>
                <TitleContainer>
                    <Title>{props.game.title}</Title>
                    <br />
                    <Categories>{props.game.categories.join(', ')}</Categories>
                    <Developer>{props.game.developer}</Developer>
                </TitleContainer>
            </InfoContainer>

            <ActionContainer>
                {props.purchasedAt ?
                    <Purchased> {props.purchasedAt.toLocaleDateString()} </Purchased>
                    :
                    (<>
                        <Price> {props.game.price.toFixed(2)} </Price>
                        <br />
                        {props.withButton ? <DefaultButton text="Comprar" colorClass="primary" onClick={handleClick}/> : <></>}
                    </>)
                }
            </ActionContainer>
        </Container >
    );
}

export default GameItem;