import React, { FormEvent, useEffect, useState } from 'react'
import LateralMenu from '../../components/lateral_menu'
import axios from 'axios'

type GameType = {
    id: number;
    name: string;
    price: number;
    categories: string;
    developers: string;
}
  
const Store: React.FC = () => {
    const [ game, setGame] = useState<GameType>();
    const [ friendBuy, setFriendBuy ] = useState(false);
    const [ paymentMethod, setPaymentMethod ] = useState('');

    async function handleBuyGame(event: FormEvent) {
        event.preventDefault();
        
        if(paymentMethod.trim() === '') {
            return;
        } 

        setFriendBuy(false);
        setPaymentMethod('');
    };

    useEffect(() => {
        axios.get<GameType>("http://localhost:3001/games").then((response) => {
            setGame(response.data);
        });
    }, []);

    return (
        <form onSubmit={ handleBuyGame }>
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

        <button type="submit">Comprar</button>
        </form>
    )
}

export default Store

