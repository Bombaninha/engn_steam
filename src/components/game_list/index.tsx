import React, { useState } from 'react'
import SearchBar from '../search_bar'
import './styles.css'

const GameList: React.FC = () => {
    const [searchText, setSearchText] = useState<string | null>(null)
    return (
        <div className="game-list-box">
            <div className="header-wrapper">
                <h1 className="page-title">Loja</h1>
                <SearchBar placeholder="Busque jogos..." onChange={value => {setSearchText(value)}}/>
            </div>
            <p>Sou uma lista de jogos</p>
        </div>
    )
}
export default GameList