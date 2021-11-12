import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../repositories/GamesRepositories";
import { RequestsRepositories } from '../repositories/RequestsRepositories';

interface IUpdateGameRequest {
    id: string;
    is_pending: boolean; 
    delete_request?: boolean;
}

class UpdateGameService {
    async execute({ id, is_pending, delete_request } : IUpdateGameRequest) {
        const gamesRepositories = getCustomRepository(GamesRepositories)
        const requestsRepositories = getCustomRepository(RequestsRepositories)

        if(!id) {
            throw new Error("Incorrect Id");
        }

        const gameExists = await gamesRepositories.findOne({
            id
        }, {relations: [ "request" ]});

        if(!gameExists) {
            throw new Error("Game doesnt exists");
        }

        const game = gamesRepositories.update({
            id: gameExists.id
        }, {
            is_pending
        });

        const gameUpdated = await gamesRepositories.find({
            id
        });

        const request = requestsRepositories.delete({
            id: gameExists.request.id
        });  

        return classToPlain(gameUpdated);
    }
}

export { UpdateGameService }