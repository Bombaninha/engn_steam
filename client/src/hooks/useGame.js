import React, { useEffect, useState } from "react";

import axios from "axios";

/*
type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean; 
    likeCount: number;
    likeId: string | undefined;
}
*/

export function useGame() {
    const [ games, setGames ] = useState([]);

    useEffect(() => {
        const fecthData = async () => {
            const { data } = await axios.get('http://localhost:4000/v1/games');
            setGames(data);
        };
        fecthData();
    }, []);

    return games; 
    /*(
        <div>
            { games.map((game) => (
                <GameItem key={game.id} game={game}></GameItem>
            ))}
        </div>
    );*/
}