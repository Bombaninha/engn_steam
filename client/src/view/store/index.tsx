import React, { useState } from 'react'
import BuyGame from '../../components/buy_game'
import GameList from '../../components/game_list'
import InfoPage from '../../components/info_page'
import { TGame } from '../../types/TGame'

import api from '../../api';

const Store: React.FC = () => {
    const [successfulPurchase, setSuccessfulPurchase] = useState(false)
    const [gameToBuy, setGameToBuy] = useState<TGame | null>(null)

    const handleGamePurchase = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            
            const cards_res = await api.get(`/cards?user_id=${user.id}`);
            const card_id: string = (cards_res as any).data[0].id;

            const res = await api.post('/buys', {
                card_id: card_id,
                game_id: gameToBuy?.id,
                buy_type_id: "659d6b94-7503-41fb-882f-76480e5d49cd", // self
                buyer_id: user.id,
            });
            console.log(res);
            setSuccessfulPurchase(true)
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;
            alert("Erro " + status + "\n" + errorMsg);
        }
    }

    return (
            <div>
                {successfulPurchase ?
                    <InfoPage infoText="Sua compra foi concluída com sucesso" buttonText="Voltar a loja" onClick={() => setSuccessfulPurchase(false)} />
                    :
                    gameToBuy ?
                        <BuyGame gameInfo={gameToBuy} onCancel={value => setGameToBuy(value)} onGameBought={handleGamePurchase} />
                        :
                        <GameList onClick={value => { setGameToBuy(value) }} />}
            </div>
    )
}
export default Store