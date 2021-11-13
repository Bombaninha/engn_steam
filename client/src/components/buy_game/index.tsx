import React, { useEffect, useState } from 'react'
import SelectInput from '../../components/select_input'
import TextInput from '../../components/textInput'
import CheckboxInput from '../../components/checkbox_input'
import DefaultButton from '../default_button'
import GameItem from '../GameItem'
import { TGame, TPurchasedGame } from '../../types/TGame'
import './styles.css'
import api, { isDevMode, toastConfig } from '../../api'
import { toast } from 'react-toastify'

interface BuyGameProps {
    userID: string;
    gameInfo: TGame
    onCancel: (value: TGame | null) => void
    onGameBought: (buyTypeID: string, cardID: string) => void
}

const BuyGame: React.FC<BuyGameProps> = ({ userID, gameInfo, onCancel, onGameBought }) => {
    const [user] = useState(userID);
    const [input, setInput] = useState('')
    const [isWrongInput, setIsWrongInput] = useState(false)
    const [isGiftBuy, setIsGiftBuy] = useState(false)
    const [buyTypes, setBuyTypes] = useState<Array<any>>([]);

    const [selectedCard, setSelectedCard] = useState('carregando...')
    const [cards, setCards] = useState<Array<any>>([]);

    useEffect(() => {
        async function getBuyTypes() {
            const buy_types_res: any = await api.get('/buy-types')

            if (buy_types_res.status === 200) {
                const buyTypes: Array<any> = buy_types_res.data;

                const buyTypesWithKey = buyTypes.map(item => {
                    let isGift = false;
                    if (item.name === 'Compra para amigo') isGift = true;

                    return { key: item.id, value: item.id, label: item.name, isGift: isGift }
                });

                setBuyTypes(buyTypesWithKey);
            }
        }

        async function getUserCards() {
            const cards_res: any = await api.get(`/cards?user_id=${user}`)

            if (cards_res.status === 200) {
                const cards: Array<any> = cards_res.data;

                const cardsWithKey = cards.map(item => {
                    return { key: item.id, value: item.id, label: item.number_custom }
                });

                setCards(cardsWithKey);

                const selectedCardValue = (cards.length === 0) ? '' : cardsWithKey[0].key;
                setSelectedCard(selectedCardValue);

            } else {
                const errorMsg: string = "Error getting user cards.";
                console.error(errorMsg, cards_res);
                toast.error(errorMsg, toastConfig);
            }
        }

        if (!isDevMode) {
            getBuyTypes();
            getUserCards();
        }

    }, [cards.length, user]);

    const isValidUsername = () => {
        if (!input) {
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
        let newList: { user: string, gameTitle: string }[]
        const giftsForFriends = localStorage.getItem('gifts-bought')
        if (giftsForFriends) {
            const currentGiftList = JSON.parse(giftsForFriends)
            newList = [...currentGiftList, { user: input, gameTitle: gameInfo.name }]
        } else {
            newList = [{ user: input, gameTitle: gameInfo.name }]
        }
        localStorage.setItem('gifts-bought', JSON.stringify(newList))
    }

    const handleBuyToSelf = () => {
        const gamesBoughFromStorage = localStorage.getItem('games-bought');
        let gamesBought: TPurchasedGame[] = []
        if (gamesBoughFromStorage)
            gamesBought = JSON.parse(gamesBoughFromStorage)

        const purchasedGame: TPurchasedGame = ({ game: gameInfo, purchasedAt: new Date() })
        gamesBought.push(purchasedGame)
        localStorage.setItem('games-bought', JSON.stringify(gamesBought))
    }

    const handleCancelPurchase = () => {
        onCancel(null)
    }

    const handleBuyGame = () => {
        if (isDevMode)
            isGiftBuy ? handleBuyAsGift() : handleBuyToSelf();
        else {
            let preSelectedBuyType = buyTypes.filter(b => ((isGiftBuy && b.isGift) || (!isGiftBuy && !b.isGift)));
            let selectedBuyType = preSelectedBuyType[0].key;
            onGameBought(selectedBuyType, selectedCard);
        }
    }

    return (
        <div className="buy-game-wrapper">
            <h1 className="page-title">Comprar jogo</h1>

            <GameItem game={gameInfo} withButton={false} onClick={() => { }} />

            <form>
                <div className="gift-to-friend-wrapper">
                    <CheckboxInput textLabel='Comprar para um amigo' identification='test' onChange={checked => setIsGiftBuy(checked)} />
                    {isGiftBuy ? <TextInput text='Informe o usuário do amigo' value={input} wrongInput={isWrongInput} onChange={input => { setIsWrongInput(false); setInput(input) }} /> : <></>}
                </div>

                <br />
                <SelectInput value={selectedCard} label='Método de pagamento' identification='payment-method'
                    options={cards}
                    onChange={select => setSelectedCard(select)}
                />

                <div className="button-wrapper">
                    <DefaultButton text="Cancelar compra" colorClass="secondary" onClick={handleCancelPurchase} />
                    <DefaultButton text="Confirmar compra" colorClass="primary" onClick={handleBuyGame} />
                </div>
            </form>
        </div>
    )
}
export default BuyGame