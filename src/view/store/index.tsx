import React, { useState } from 'react'
import BuyGame from '../../components/buy_game'
import GameList from '../../components/game_list'


const Store: React.FC = () => {
    const [successfulPurchase, setSuccessfulPurchase] = useState(false)
    const [gameToBuy, setGameToBuy] = useState<string | null >('Stardew')

    return (
        <div>
            {successfulPurchase ? <p>Comprei o jogo</p> : 
            gameToBuy ? 
            <BuyGame onCancel={value => setGameToBuy(value)} onGameBought={value => setSuccessfulPurchase(value)}/> 
            : 
            <GameList />}
        </div>
    )
}
export default Store