import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Modal } from '../../components/Modal/modal';
import { v4 as uuid } from 'uuid';
import { Context } from '../../contexts/AuthContext'
import { useAuth } from '../../hooks/useAuth';
import HistoryService from '../../services/history/HistoryService';
import { useRequest } from '../../hooks/useRequest';
import RequestItem from '../../components/RequestItem'

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

type User = {
    id: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    email: string;
    role_id: string;
}

type Category = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
}

type Game = {
    created_at: string;
    description: string;
    id: string;
    is_pending: boolean;
    name: string;
    price: number;
    release: string;
    updated_at: string;
    users: User[] | [];
    categories: Category[] | [];
}

type RequestType = {
    created_at: string;
    id: string;
    name: string;
    updated_at: string;
}

type Request = {
    id: string;
    created_at: Date;
    updated_at: Date;
    request_type_id: string;
    game_id: string;
    requestType: RequestType;
    game: Game;
    index: number;
}

interface RequestListProps {
    onClick: (value: Request | null) => void
}

const RequestList: React.FC<RequestListProps> = ({ onClick }) => {
    const [ showModal, setShowModal ] = useState(false);
    const { authenticated } = useAuth();
    const { handleLogout } = useContext(Context);

    const requests = useRequest();
    const requestsIndexed : Request[] = requests.map((request: Request, index) => {
        return { ...request, index }
    });

    if (!authenticated) {
        console.log("Usuário não está autenticado!");
        HistoryService.push('/');
    }

    const openModal = () => {
        setShowModal(prev => !prev);
    }

    const handleClick = (requestInfo: Request | null) => {
        onClick(requestInfo)
    }

    return (
        <div className="game-list-box">
            <div className="header-wrapper">
                <h1 className="page-title">Pedidos</h1>
            </div>
            <div>
            { requestsIndexed.map(request => <RequestItem request={ request } onClick={handleClick} withButton key={ uuid() }/>) }
            </div>
        </div >
    )
}
export default RequestList