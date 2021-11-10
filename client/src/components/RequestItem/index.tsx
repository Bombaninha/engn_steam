import React from 'react';
//import { TGame } from '../../types/TGame'
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

type User = {
    id: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    email: string;
    role_id: string;
}

type Category = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
}

type Game = {
    created_at: string;
    description: string;
    id: string;
    is_pending: boolean;
    name: string;
    price: number;
    release: string;
    updated_at: string;
    users: User[] | [];
    categories: Category[] | [];
}

type RequestType = {
    created_at: string;
    id: string;
    name: string;
    updated_at: string;
}

type Request = {
    id: string;
    created_at: Date;
    updated_at: Date;
    request_type_id: string;
    game_id: string;
    requestType: RequestType;
    game: Game;
    index: number;
}

type RequestProps = {
    request: Request;
    onClick?: (value: Request | null) => void
    withButton?: boolean;
}

const RequestItem: React.FC<RequestProps> = (props: RequestProps) => {
    
    const handleClick = () => {
        if (props.onClick) {
            props.onClick(props.request)
        }
    }


    const sIndex = props.request.index.toString()
    const formattedIndex = '0'.repeat((8 - sIndex.length)) + sIndex;

    return (
        <Container className="game-item-wrapper">
            <InfoContainer>
                <TitleContainer>
                    <Title>{ `Pedido #${formattedIndex}`}</Title>
                    <Categories>{ `${props.request.requestType.name} de jogo` }</Categories>
                </TitleContainer>
            </InfoContainer>
            <ActionContainer>
                {props.withButton ? <DefaultButton text="Ver Detalhes" colorClass="tertiary" onClick={handleClick} /> : <></>}
            </ActionContainer>
        </Container >
    );
}

export default RequestItem;