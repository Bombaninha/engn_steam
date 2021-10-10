import React, { useState } from 'react'
import BuyGame from '../../components/buy_game'
import GameList from '../../components/game_list'
import InfoPage from '../../components/info_page'
import { TGame } from '../../types/TGame'


const Store: React.FC = () => {
    const [successfulPurchase, setSuccessfulPurchase] = useState(false)
    const [gameToBuy, setGameToBuy] = useState<TGame | null>(null)

    const handleGamePurchase = () => {
        setSuccessfulPurchase(true)
        setGameToBuy(null)
    }

    return (
        <div>
            {successfulPurchase ?
                <InfoPage infoText="Sua compra foi concluída com sucesso" buttonText="Voltar a loja" onClick={value => setSuccessfulPurchase(value)} />
                :
                gameToBuy ?
                    <BuyGame gameInfo={gameToBuy} onCancel={value => setGameToBuy(value)} onGameBought={handleGamePurchase} />
                    :
                    <GameList onClick={value => {setGameToBuy(value)}}/>}
        </div>
    )
}
export default Store