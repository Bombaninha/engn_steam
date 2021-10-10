import React, { useState } from 'react'
import BuyGame from '../../components/buy_game'
import GameList from '../../components/game_list'
import InfoPage from '../../components/info_page'


const Store: React.FC = () => {
    const [successfulPurchase, setSuccessfulPurchase] = useState(false)
    const [gameToBuy, setGameToBuy] = useState<string | null>(null)

    const handleGamePurchase = () => {
        setSuccessfulPurchase(true)
        setGameToBuy('')
    }

    return (
        <div>
            {successfulPurchase ?
                <InfoPage infoText="Sua compra foi concluída com sucesso" buttonText="Voltar a loja" onClick={value => setSuccessfulPurchase(value)} />
                :
                gameToBuy ?
                    <BuyGame onCancel={value => setGameToBuy(value)} onGameBought={handleGamePurchase} />
                    :
                    <GameList />}
        </div>
    )
}
export default Store