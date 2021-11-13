import React, { useState } from 'react'
import { toast } from 'react-toastify'
import api, { toastConfig } from '../../api'
import BuyGame from '../../components/buy_game'
import GameList from '../../components/game_list'
import InfoPage from '../../components/info_page'
import { TGame } from '../../types/TGame'

function getUserIDFromLocalStorage(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user !== {}) {
        const userID = user.id;
        if (userID !== null)
            return userID
    }
    return '';
}

const Store: React.FC = () => {
    const [successfulPurchase, setSuccessfulPurchase] = useState(false)
    const [gameToBuy, setGameToBuy] = useState<TGame | null>(null)
    const [userID] = useState(getUserIDFromLocalStorage());

    const handleGamePurchase = async (buyTypeID: string, cardID: string) => {
        try {
            const res = await api.post('/buys', {
                card_id: cardID,
                game_id: gameToBuy?.id,
                buy_type_id: buyTypeID, 
                buyer_id: userID
            });

            toast.success("Compra realizada com sucesso!", toastConfig);
            setSuccessfulPurchase(true)
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;
            toast.error("Erro " + status + "\n" + errorMsg, toastConfig);
        }
        setGameToBuy(null)
    }

    return (
        <div>
            {successfulPurchase ?
                <InfoPage infoText="Sua compra foi concluída com sucesso" buttonText="Voltar a loja" onClick={() => setSuccessfulPurchase(false)} />
                :
                gameToBuy ?
                    <BuyGame userID={userID} gameInfo={gameToBuy} onCancel={value => setGameToBuy(value)} onGameBought={handleGamePurchase} />
                    :
                    <GameList onClick={value => { setGameToBuy(value) }} />}
        </div>
    )
}
export default Store