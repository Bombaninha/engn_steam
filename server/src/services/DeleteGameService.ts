import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../repositories/GamesRepositories";

import { CreateRequestService } from '../services/CreateRequestService';

import { RequestTypesRepositories } from '../repositories/RequestTypesRepositories';

interface IDeleteGameRequest {
    id: string;
}

class DeleteGameService {
    async execute({ id } : IDeleteGameRequest) {
        const gamesRepositories = getCustomRepository(GamesRepositories);

        const requestTypesRepositories = getCustomRepository(RequestTypesRepositories);
        const createRequestService = new CreateRequestService();

        // Validação: Verificando se todos os campos foram recebidos
        if(!id) {
            throw new Error("Incorrect Id");
        }

        // Validação: Verificando se existe alguma role com o mesmo nome
        const gameExists = await gamesRepositories.findOne({
            id
        });

        if(!gameExists) {
            throw new Error("Game doesnt exists");
        }

        /*const game = gamesRepositories.delete({
            id
        })*/

        const requestType = await requestTypesRepositories.findOne({
            name: 'Exclusão'
        });

        const requestGame = await createRequestService.execute({ game_id: id, request_type_id: requestType.id });

        return gameExists;
    }
}

export { DeleteGameService }