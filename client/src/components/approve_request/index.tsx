import React, { useState } from 'react'

import DefaultButton from '../default_button'
import './styles.css'
import api, { isDevMode, toastConfig } from '../../api'
import { toast } from 'react-toastify'
import RequestItem from '../../components/RequestItem';

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

interface BuyGameProps {
    requestInfo: TRequest
    onCancel: (value: TRequest | null) => void
    onRequestApproved?: (buyTypeID: string, cardID: string) => void
}

const ApproveRequest: React.FC<BuyGameProps> = ({ requestInfo, onCancel, onRequestApproved }) => {
    const handleDeclineRequest = async () => {
        try {
            const res = await api.delete(`/requests/${requestInfo.id}`);

            toast.success("Pedido rejeitado com sucesso!", toastConfig);
            onCancel(null);
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;

            toast.error("Erro " + status + "\n" + errorMsg, toastConfig);
        }
    }

    const handleApproveRequest = async () => {
        try {
            const res = await api.patch(`/games/${requestInfo.game.id}`, {
                is_pending: false,
                delete_request: true
            });

            toast.success("Pedido aceito com sucesso!", toastConfig);
            onCancel(null);
        } catch (err: any) {
            const status = err.response.status;
            const errorMsg = err.response.data.error;

            toast.error("Erro " + status + "\n" + errorMsg, toastConfig);
        }
    }

    const returnPage = () => {
        onCancel(null)
    }

        /*if (isDevMode)
            isGiftBuy ? handleBuyAsGift() : handleBuyToSelf();
        else {
            let preSelectedBuyType = buyTypes.filter(b => ((isGiftBuy && b.isGift) || (!isGiftBuy && !b.isGift)));
            let selectedBuyType = preSelectedBuyType[0].key;
            onGameBought(selectedBuyType, selectedCard);
        }   
        */

    const sIndex = requestInfo.index.toString()
    const formattedIndex = '0'.repeat((8 - sIndex.length)) + sIndex;

    return (
        <div className="buy-game-wrapper">
            <h1 className="page-title">{ `Pedido #${formattedIndex}`}</h1>

            <div className="informationContainer">
                <div className="info">
                    Usuário: Lucas
                </div>

                <div className="info">
                    { `${requestInfo.requestType.name} de jogo` }
                </div>
            </div>

            <div className="requestInfo">
                <div className="info">Id: { requestInfo.id }</div>
                <div className="info">Nome: { requestInfo.game.name }</div>
                <div className="info">Categoria: { requestInfo.game.categories.map(request => request.name).join(", ") }</div>
                <div className="info">Preço: R$ { requestInfo.game.price }</div>
                <div className="info">Desenvolvedor: { requestInfo.game.users.map(request => request.name).join(", ") }</div>
                <div className="info">Data de Lançamento: { new Date(requestInfo.created_at).toLocaleDateString('en-GB') }</div>
                <div className="info">Descrição: { requestInfo.game.description }</div>
            </div>

            <form>
                <div className="button-wrapper">
                    <DefaultButton text="Voltar" colorClass="tertiary" onClick={returnPage} />
                    <DefaultButton text="Recusar pedido" colorClass="secondary" onClick={handleDeclineRequest} />
                    <DefaultButton text="Aprovar pedido" colorClass="primary" onClick={handleApproveRequest} />
                </div>
            </form>
        </div>
    )
}
export default ApproveRequest;