import React, { FormEvent, useEffect, useState } from 'react'
import LateralMenu from '../../components/lateral_menu'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useCard } from '../../hooks/useCard';

import CardsSelect from '../../components/CardsSelect';

type GameType = {
    id: number;
    name: string;
    price: number;
    categories: string;
    developers: string;
}

type Card = {
    id: number;
    number: string;
    type: string;
}

type GameParams = {
    id: string;
}

export function BuyGame() {
    const [ game, setGame] = useState<GameType>();
    const [ friendBuy, setFriendBuy ] = useState(false);
    const [ friend, setFriend ] = useState('');
    const [ paymentMethod, setPaymentMethod ] = useState('');
    //const [ cards, setCards] = useState<Card[]>();
    const [ card, setCard ] = useState('');
    
    const params = useParams<GameParams>();
    const { cards } = useCard(params.id);
    console.log(cards);
    

    const buy = () => {
        if(paymentMethod.trim() === '') {
            return;
        }

        axios.post(`http://localhost:3001/games/${params.id}/buy`, {
            gameId: params.id,
            paymentMethodId: '2',
            buyerId: 7,
            buyTypeId: 1,
            receiverId: '',
            cardId: ''
        }).then((response) => {
            setFriendBuy(false);
            setPaymentMethod('');
        });
    };

    useEffect(() => {
        axios.get<GameType[]>(`http://localhost:3001/games/${params.id}`).then((response) => {
            const item = response.data.pop();   
            setGame(item);
        });
    }, []);

    return (
        <div>
            { game?.name }
            <br />
            <input type="checkbox" 
                onChange={ event => setFriendBuy(event.target.checked) }
                checked={ friendBuy }
            /> Comprar para amigo
            <br />
            Método de pagamento
            <select                 
                onChange={ event => setPaymentMethod(event.target.value) }
                value={ paymentMethod }
            >
                <option value=""></option>
                <option value="1">Cartão</option>    
                <option value="2">Boleto</option>
            </select>
        <br />
        <div>
        Cartões            
        </div>
        <div>
            { cards && cards.map(card => {
                <h1> {card.id} </h1>
            })
            }
        </div>
        
        <CardsSelect />

        <button onClick={ buy }>Comprar</button>
        </div>
    );
}