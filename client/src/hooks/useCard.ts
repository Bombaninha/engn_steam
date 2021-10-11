import { useEffect, useState } from "react";
import axios from 'axios'

type CardType = {
    id: number;
    number: string;
    type: string;
}

export function useCard(userId: string) {
    const [cards, setCards] = useState<CardType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        axios.get<CardType[]>(`http://localhost:3001/users/7/cards`).then((response) => {
            setCards(response.data);
        });
    }, [userId]);

    return { cards };
}