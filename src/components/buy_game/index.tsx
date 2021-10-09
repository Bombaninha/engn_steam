import React, { useState } from 'react'
import SelectInput from '../../components/select_input'
import TextInput from '../../components/textInput'
import CheckboxInput from '../../components/checkbox_input'
import './styles.css'
import DefaultButton from '../default_button'

export interface BuyGameProps {
    onCancel: (value: string) => void
    onGameBought: () => void
}

const BuyGame: React.FC<BuyGameProps> = ({onCancel, onGameBought}) => {
    const [input, setInput] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    const [select, setSelect] = useState('manga')

    const handleCancelPurchase = () => {
        onCancel('')
    }
    const handleBuyGame = () => {
        onGameBought()
    }

    return (
        <>
            <h1 className="page-title">Comprar jogo</h1>
            <form>
                <div className="gift-to-friend-wrapper">
                    <CheckboxInput textLabel='Comprar para um amigo' identification='test' onChange={checked => setCheckbox(checked)}/>
                    {checkbox ? <TextInput text='Informe o usuário do amigo' value={input} onChange={input => setInput(input)} /> : <></>}
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