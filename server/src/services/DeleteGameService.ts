import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../repositories/GamesRepositories";

interface IDeleteGameRequest {
    id: string;
}

class DeleteGameService {
    async execute({ id } : IDeleteGameRequest) {
        const gamesRepositories = getCustomRepository(GamesRepositories)

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

        const game = gamesRepositories.delete({
            id
        })

        return gameExists;
    }
}

export { DeleteGameService }