import { getCustomRepository } from "typeorm";
import { GamesRepositories } from "../repositories/GamesRepositories";

interface ICreateGameRequest {
    name: string;
    price: number;
}

class CreateGameService {
    async execute({ name, price } : ICreateGameRequest) {
        const gamesRepositories = getCustomRepository(GamesRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new Error("Incorrect Name");
        }

        const gameAlreadyExists = await gamesRepositories.findOne({
            name
        });

        if(gameAlreadyExists) {
            throw new Error("Game already exists");
        }

        if(!price) {
            throw new Error("Incorrect Price");
        }

        const game = gamesRepositories.create({
            name,
            price
        });

        await gamesRepositories.save(game);

        return game;
    }
}

export { CreateGameService }