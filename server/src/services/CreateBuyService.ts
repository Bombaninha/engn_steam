import { getCustomRepository } from "typeorm";

import { BuysRepositories } from "../repositories/BuysRepositories";

import { classToPlain } from 'class-transformer';

interface ICreateBuyRequest {
    buy_type_id: string;
    buyer_id: string;
    receiver_id?: string | null;
    card_id: string;
    game_id: string;
}

class CreateBuyService {
    async execute({ buy_type_id, buyer_id, receiver_id, card_id, game_id } : ICreateBuyRequest) {
        const buysRepositories = getCustomRepository(BuysRepositories);

        // Validação: Verificando se todos os campos foram recebidos
        if(!buy_type_id) {
            throw new Error("Incorrect Buy Type");
        }

        if(!buyer_id) {
            throw new Error("Incorrect Buyer Id");
        }

        if(!card_id) {
            throw new Error("Incorrect Card Id");
        }

        if(!game_id) {
            throw new Error("Incorrect Game Id");
        }
        
        const buy = buysRepositories.create({
            buy_type_id,
            buyer_id,
            receiver_id,
            card_id,
            game_id
        });

        await buysRepositories.save(buy);

        return classToPlain(buy);

    }
}

export { CreateBuyService }