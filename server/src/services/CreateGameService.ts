import { getCustomRepository } from "typeorm";
import { CategoriesRepositories } from "../repositories/CategoriesRepositories";
import { GamesRepositories } from "../repositories/GamesRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { Game } from "../entities/Game";

import { BlankFieldError } from "../exceptions/BlankFieldError";
import { DuplicatedRegisterError } from "../exceptions/DuplicatedRegisterError";

type CategoryRequest = {
    id: string;
}

type DeveloperRequest = {
    id: string;
}

type GameRequest = {
    name: string;
    price: number;
    description: string;
    release: Date;
    categories: CategoryRequest[];
    developers: DeveloperRequest[];
    is_pending?: boolean;
}
 
class CreateGameService {
    async execute({ name, price, description, release, categories, developers, is_pending } : GameRequest) : Promise<Game | Error> {
        const gamesRepositories = getCustomRepository(GamesRepositories)
        const categoriesRepositories = getCustomRepository(CategoriesRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new BlankFieldError("Incorrect Name");
        }

        if(!price) {
            throw new BlankFieldError("Incorrect Price");
        }

        if(!description) {
            throw new BlankFieldError("Incorrect description");
        }

        if(!release) {
            throw new BlankFieldError("Incorrect release");
        }

        if(!categories) {
            throw new BlankFieldError("Incorrect categories");
        }

        if(!developers) {
            throw new BlankFieldError("Incorrect developers"); 
        }

        const gameAlreadyExists = await gamesRepositories.findOne({
            name
        });

        if(gameAlreadyExists) {
            throw new DuplicatedRegisterError("Game already exists");
        }

        const game = gamesRepositories.create({
            name,
            price,
            description,
            release,
            is_pending
        });

        const categoriesExists = await categoriesRepositories.findByIds(categories);
        const developersExists = await usersRepositories.findByIds(developers);

        game.categories = categoriesExists;
        game.users = developersExists;

        await gamesRepositories.save(game);
        
        return game;
    }
}

export { CreateGameService }