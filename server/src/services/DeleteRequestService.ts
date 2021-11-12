import { getCustomRepository } from "typeorm";
import { RequestsRepositories } from "../repositories/RequestsRepositories";
import { GamesRepositories } from "../repositories/GamesRepositories";

interface DeleteRequestRequest {
    id: string;
}

class DeleteRequestService {
    async execute({ id } : DeleteRequestRequest) {
        const requestsRepositories = getCustomRepository(RequestsRepositories)
        const gamesRepositories = getCustomRepository(GamesRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!id) {
            throw new Error("Incorrect Id");
        }

        const requestExists = await requestsRepositories.findOne({
            id
        }, { relations: ["requestType"]});

        if(!requestExists) {
            throw new Error("Request doesnt exists");
        }

        if(requestExists.requestType.name === "Adição") {
            const game = gamesRepositories.delete({
                id: requestExists.game_id
            });
        } 

        const request = requestsRepositories.delete({
            id
        });
        
        return requestExists;
    }
}

export { DeleteRequestService }