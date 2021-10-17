import React, { useState } from 'react'
import SelectInput from '../../components/select_input'
import TextInput from '../../components/textInput'
import CheckboxInput from '../../components/checkbox_input'
import DefaultButton from '../default_button'
import GameItem from '../GameItem'
import { TGame } from '../../types/TGame'
import './styles.css'


interface BuyGameProps {
    gameInfo: TGame
    onCancel: (value: TGame | null) => void
    onGameBought: () => void
}

const BuyGame: React.FC<BuyGameProps> = ({gameInfo, onCancel, onGameBought}) => {
    const [input, setInput] = useState('')
    const [isWrongInput, setIsWrongInput] = useState(false)
    const [checkbox, setCheckbox] = useState(false)
    const [select, setSelect] = useState('manga')

    const isValidUsername = () => {
        if(!input) {
            setIsWrongInput(true)
            return false
        } else {
            return true
        }
    }

    const handleBuyAsGift = () => {
        if (!isValidUsername()) {
            return
        }
        let newList: {user: string, gameTitle: string}[]
        const giftsForFriends = localStorage.getItem('gifts-bought')
        if(giftsForFriends) {
            const currentGiftList = JSON.parse(giftsForFriends)
            newList = [...currentGiftList, {user: input , gameTitle: gameInfo.title}]
        } else {
            newList = [{user: input , gameTitle: gameInfo.title}]
        }
        localStorage.setItem('gifts-bought', JSON.stringify(newList))
    }
    
    const handleBuyToSelf = () => {
        const gamesBought = localStorage.getItem('games-bought')
        let newList: string[]
        if (gamesBought) {
            const currentGameList = JSON.parse(gamesBought)
            newList = [...currentGameList, gameInfo.title]
        } else {
            newList = [gameInfo.title]
        }
        localStorage.setItem('games-bought', JSON.stringify(newList))
    }
    
    const handleCancelPurchase = () => {
        onCancel(null)
    }

    const handleBuyGame = () => {
        checkbox ? handleBuyAsGift() : handleBuyToSelf()
        onGameBought()
    }

    return (
        <div className="buy-game-wrapper">
            <h1 className="page-title">Comprar jogo</h1>
            <GameItem game={gameInfo} withButton={false} onClick={() => {}}/>
            <form>
                <div className="gift-to-friend-wrapper">
                    <CheckboxInput textLabel='Comprar para um amigo' identification='test' onChange={checked => setCheckbox(checked)}/>
                    {checkbox ? <TextInput text='Informe o usuário do amigo' value={input} wrongInput={isWrongInput} onChange={input => {setIsWrongInput(false); setInput(input)}} /> : <></>}
                </div>
                <SelectInput value={select} label='Método de pagamento' identification='payment-method' options={[{value: 'laranja', label: 'Laranja'}, {value: 'limao', label: 'Limão'}, {value: 'coco', label: 'Coco'}, {value: 'manga', label: 'Manga'}]} onChange={select => setSelect(select)} />
                <div className="button-wrapper">
                    <DefaultButton text="Cancelar compra" colorClass="secondary" onClick={handleCancelPurchase}/>
                    <DefaultButton text="Confirmar compra" colorClass="primary" onClick={handleBuyGame}/>
                </div>
            </form>
        </div>
    )
}
export default BuyGame