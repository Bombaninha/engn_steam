import React, { useState } from 'react'
import SelectInput from '../../components/select_input'
import TextInput from '../../components/textInput'
import CheckboxInput from '../../components/checkbox_input'
import DefaultButton from '../default_button'
import GameItem from '../GameItem'
import { TGame } from '../../types/TGame'
import './styles.css'

export interface BuyGameProps {
    gameInfo: TGame
    onCancel: (value: TGame | null) => void
    onGameBought: () => void
}

const BuyGame: React.FC<BuyGameProps> = ({gameInfo, onCancel, onGameBought}) => {
    const [input, setInput] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [select, setSelect] = useState('manga')

    const handleCancelPurchase = () => {
        onCancel(null)
    }
    const handleBuyGame = () => {
        if(checkbox) {
            if (!input) {
                console.log('sem user no input')
            }
            const giftsForFriends = localStorage.getItem('gifts-bought')
            if(giftsForFriends) {
                const currentGiftList = JSON.parse(giftsForFriends)
                localStorage.setItem('gifts-bought', JSON.stringify([...currentGiftList, {user: input , game: gameInfo.title}]))
            } else {
                localStorage.setItem('gifts-bought', JSON.stringify({user: input , game: gameInfo.title}))
            }
            
        } else{
            const gamesBought = localStorage.getItem('games-bought')
            if (gamesBought) {
                const currentGameList = JSON.parse(gamesBought)
                localStorage.setItem('games-bought', JSON.stringify([...currentGameList, gameInfo.title]))
            } else {
                localStorage.setItem('games-bought', JSON.stringify([gameInfo.title]))
            }
        }
        onGameBought()
    }

    return (
        <>
            <h1 className="page-title">Comprar jogo</h1>
            <GameItem game={gameInfo} withButton={false} onClick={() => {}}/>
            <form>
                <div className="gift-to-friend-wrapper">
                    <CheckboxInput textLabel='Comprar para um amigo' identification='test' onChange={checked => setCheckbox(checked)}/>
                    {checkbox ? <TextInput placeholder='Informe o usuário do amigo' value={input} onChange={input => setInput(input)} /> : <></>}
                </div>
                <SelectInput value={select} label='Método de pagamento' identification='payment-method' options={[{value: 'laranja', label: 'Laranja'}, {value: 'limao', label: 'Limão'}, {value: 'coco', label: 'Coco'}, {value: 'manga', label: 'Manga'}]} onChange={select => setSelect(select)} />
                <div className="button-wrapper">
                    <DefaultButton text="Cancelar compra" colorClass="secondary" onClick={handleCancelPurchase}/>
                    <DefaultButton text="Confirmar compra" colorClass="primary" onClick={handleBuyGame}/>
                </div>
            </form>
        </>
    )
}
export default BuyGame