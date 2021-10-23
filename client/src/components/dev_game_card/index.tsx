import React from 'react'
import { TGame } from '../../types/TGame'
import DefaultButton from '../default_button'
import './styles.css'

export interface DevGameCardProps {
    game: TGame
    handleEditGame: () => void
    handleDeleteGame: () => void
    handleRenovateGame: () => void
}

const DevGameCard: React.FC<DevGameCardProps> = ({game, handleEditGame, handleDeleteGame, handleRenovateGame}) => {
    
    return (
        <div className="dev-game-card-wrapper">
            <div className="game-info-wrapper">
                <h3>{game.title}</h3>
                <div className="game-status-wrapper">
                    {game.categories.map((item, index) => <span key={index}>{item}</span>)}
                </div>
            </div>
            <div className="button-wrapper">
                <DefaultButton text="Editar jogo" colorClass="primary" onClick={handleEditGame} />      
                <DefaultButton text="Renovar jogo" colorClass="primary" onClick={handleRenovateGame} />      
                <DefaultButton text="Remover jogo" colorClass="primary" onClick={handleDeleteGame} />      
            </div>
        </div>
    )
}
export default DevGameCard