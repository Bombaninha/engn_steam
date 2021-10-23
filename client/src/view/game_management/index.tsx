import React, { useState } from 'react'
import DefaultButton from '../../components/default_button'
import DevGameCard from '../../components/dev_game_card'
import TextInput from '../../components/textInput'

const GameManagement: React.FC = () => {
    const [beginPeriodValue, setBeginPediodValue] = useState('')
    const [endPediodValue, setEndPeriodValue] = useState('')

    const handleEditGame = () => {
        console.log('Editar jogo')
    } 

    const handleDeleteGame = () => {
        console.log('Deletar jogo')
    }

    const handleRenovateGame = () => {
        console.log('Renovar jogo')
    }

    return (
        <div>
            <h1 className="page-title">Jogos</h1>
            <h2>Estatísticas</h2>
            <TextInput text="Início do período" value={beginPeriodValue} onChange={newBeginPeriod => setBeginPediodValue(newBeginPeriod)} hasLabel/>
            <TextInput text="Fim do período" value={endPediodValue} onChange={newEndPeriod => setEndPeriodValue(newEndPeriod)} hasLabel/>
            <DefaultButton text="Gerar relatório" colorClass="primary" onClick={() => console.log('gerar relatorio')}/>
            <h2>Meus Jogos</h2>
            <DevGameCard game={{title: "Meu jogo", categories: ["Ação", "Aventura"], description: "Descrição", price: 2.99, developer: "Eu"}} handleEditGame={() => handleEditGame()} handleDeleteGame={() => handleDeleteGame()} handleRenovateGame={() => handleRenovateGame()}/>
            <DefaultButton text="Adicionar jogo" colorClass="primary" onClick={() => console.log('adicionar jogo')}/>
        </div>
    )
}
export default GameManagement