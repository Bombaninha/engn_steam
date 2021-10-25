import React, { useEffect, useState } from "react";
import GameItem from '../components/GameItem';

import axios from "axios";

export function useGame() {
    const [ games, setGames ] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get('http://localhost:4000/v1/games');
            setGames(data);
        };
        fecthData();
    }, []);

    return (
        <div>
            { games.map((game) => (
                <GameItem key={game.id} game={game}></GameItem>
            ))}
        </div>
    );
}