import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../repositories/RequestsRepositories";
import { RequestTypesRepositories } from "../repositories/RequestTypesRepositories";

import { Request } from '../entities/Request';

interface ICreateRequestRequest {
    game_id: string;
    request_type_id: string;
}

class CreateRequestService {
    async execute({ game_id, request_type_id } : ICreateRequestRequest) {
        const requestsRepositories = getCustomRepository(RequestsRepositories)
        const requestTypesRepository = getCustomRepository(RequestTypesRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!game_id) {
            throw new Error("Incorrect game_id");
        }

        if(!request_type_id) {
            throw new Error("Incorrect request_type_id");
        }
        
        const requestAlreadyExists = await requestsRepositories.findOne({
            game_id: game_id
        });
        
        if(requestAlreadyExists) {
            throw new Error("Request already exists");
        }

        const request = await requestsRepositories.create({
            game_id,
            request_type_id
        });

        await requestsRepositories.save(request);
    }
}

export { CreateRequestService }