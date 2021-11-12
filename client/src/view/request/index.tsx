import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Modal } from '../../components/Modal/modal';
import { v4 as uuid } from 'uuid';
import { Context } from '../../contexts/AuthContext'
import { useAuth } from '../../hooks/useAuth';
import HistoryService from '../../services/history/HistoryService';
import { useRequest } from '../../hooks/useRequest';
import RequestItem from '../../components/RequestItem'
import RequestList from '../../components/request_list';
import ApproveRequest from '../../components/approve_request';

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

type TUser = {
    id: string;
    created_at: Date;
    updated_at: Date;
    name: string;
    email: string;
    role_id: string;
}

type TCategory = {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
}

type TGame = {
    created_at: string;
    description: string;
    id: string;
    is_pending: boolean;
    name: string;
    price: number;
    release: string;
    updated_at: string;
    users: TUser[] | [];
    categories: TCategory[] | [];
}

type TRequestType = {
    created_at: string;
    id: string;
    name: string;
    updated_at: string;
}

type TRequest = {
    id: string;
    created_at: Date;
    updated_at: Date;
    request_type_id: string;
    game_id: string;
    requestType: TRequestType;
    game: TGame;
    index: number;
}

interface RequestListProps {
    onClick: (value: Request | null) => void
}

const Request: React.FC = () => {
    const [ showModal, setShowModal ] = useState(false);
    const { authenticated } = useAuth();
    const { handleLogout } = useContext(Context);
    const [ requestToApprove, setRequestToApprove] = useState<TRequest | null>(null)

    const requests = useRequest();

    if (!authenticated) {
        console.log("Usuário não está autenticado!");
        HistoryService.push('/');
    }

    const openModal = () => {
        setShowModal(prev => !prev);
    }

    /*
        <Container>
            <Button onClick={openModal}>I'm a modal</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} />
        </Container>
    */
    return (
        <div>
            { requestToApprove ?
                <ApproveRequest requestInfo={requestToApprove} onCancel={value => setRequestToApprove(value)} />
                :
                <RequestList onClick={value => { setRequestToApprove(value) }} />
            }
            
        </div>
    )
}
export default Request;