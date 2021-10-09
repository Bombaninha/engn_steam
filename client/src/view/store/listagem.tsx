import React, { useEffect, useState } from 'react'
import LateralMenu from '../../components/lateral_menu'
import axios from 'axios'

type GameType = {
    id: number;
    name: string;
    price: number;
    categories: string;
    developers: string;
}
  
const Store: React.FC = () => {
    const [ games, setGames] = useState<GameType[]>([]);

    useEffect(() => {
        axios.get<GameType[]>("http://localhost:3001/games").then((response) => {
            setGames(response.data);
            console.log(response.data);
        });
    }, []);

    return (
        <div>
        { games.map(game => {
            // key algoritmo de reconciliação, ele meio que da um refresh na lista inteira
            return (
                <div key = { game.id }> 
                    { game.name } <br /> 
                    { game.price } <br />
                    { game.categories } <br />
                    { game.developers } <br />
                </div>          
            );
        }) }
        </div>
    )
}

export default Store
