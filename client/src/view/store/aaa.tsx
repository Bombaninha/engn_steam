import React, { FormEvent, useEffect, useState } from 'react'
import LateralMenu from '../../components/lateral_menu'
import axios from 'axios'
import { useParams } from 'react-router-dom';

type GameType = {
    id: number;
    name: string;
    price: number;
    categories: string;
    developers: string;
}
  
type GameParams = {
    id: string;
}

const Store: React.FC = () => {
    const [ game, setGame] = useState<GameType>();
    const [ friendBuy, setFriendBuy ] = useState(false);
    const [ friend, setFriend ] = useState('');
    const [ paymentMethod, setPaymentMethod ] = useState('');

    const params = useParams<GameParams>();

    const buy = () => {
        if(paymentMethod.trim() === '') {
            return;
        }

        axios.post(`http://localhost:3001/games/${params.id}/buy`, {
            gameId: 1,
            friendBuy: friendBuy,
            paymentMethod: paymentMethod,
            friend: friend
        }).then((response) => {
            setFriendBuy(false);
            setPaymentMethod('');
            console.log(response);
        });
    };

    useEffect(() => {
        axios.get<GameType>(`http://localhost:3001/games/${params.id}`).then((response) => {
            setGame(response.data);
        });
    }, []);

    return (
        <div>
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

        <button onClick={ buy }>Comprar</button>
        </div>
    );
}

export default Store

