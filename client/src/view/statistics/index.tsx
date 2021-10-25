import React, { useState } from 'react'
import styled from 'styled-components'
import { Modal } from '../../components/Modal/modal';

import { useGame } from '../../hooks/useGames';

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
    const [ showModal, setShowModal ] = useState(false);

    const games = useGame();
    console.log(games);

    const openModal = () => {
        setShowModal(prev => !prev);
    }

    return (
        <>
        <div>
            { games }
        </div>
            <Container>
                <Button onClick={openModal}>I'm a modal</Button>
                <Modal showModal={showModal} setShowModal={setShowModal}/>
            </Container>
        </>
    )
}
export default Statistics