import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Modal } from '../../components/Modal/modal';

import { Context } from '../../contexts/AuthContext'

import { useGame } from '../../hooks/useGame';

import GameItem from '../../components/GameItem';

import { useAuth } from '../../hooks/useAuth';

import HistoryService from '../../services/history/HistoryService';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Button = styled.button`
    min-width: 100px;
    padding: 16px 32px;
    border-radius: 4px;
    border: none;
    background: #141414;
    color: #FFF;
    font-size: 24px;
    cursor: pointer;
`;

const Statistics: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const { authenticated } = useAuth();
    const { handleLogout } = useContext(Context);

    if (!authenticated) {
        console.log("Usuário não está autenticado!");
        HistoryService.push('/');
    }

    const games = useGame();

    const openModal = () => {
        setShowModal(prev => !prev);
    }

    return (
        <>
            <button type="button" onClick={handleLogout}>Sair</button>
            <div>
                {games.map((game: any) => (
                    <GameItem key={game.id} game={game}></GameItem>
                ))}
            </div>
            <Container>
                <Button onClick={openModal}>I'm a modal</Button>
                <Modal showModal={showModal} setShowModal={setShowModal} />
            </Container>
        </>
    )
}
export default Statistics