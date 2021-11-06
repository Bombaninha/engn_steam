import { getCustomRepository } from "typeorm";
import { CategoriesRepositories } from "../repositories/CategoriesRepositories";
import { GamesRepositories } from "../repositories/GamesRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { Category } from "../entities/Category";
import { User } from "../entities/User";

interface ICreateGameRequest {
    name: string;
    price: number;
    description: string;
    release: Date;
    categories: any;
    developers: any;
    is_pending?: boolean;
}

class CreateGameService {
    async execute({ name, price, description, release, categories, developers, is_pending } : ICreateGameRequest) {
        const gamesRepositories = getCustomRepository(GamesRepositories)
        const categoriesRepositories = getCustomRepository(CategoriesRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new Error("Incorrect Name");
        }

        if(!price) {
            throw new Error("Incorrect Price");
        }

        if(!description) {
            throw new Error("Incorrect description");
        }

        if(!release) {
            throw new Error("Incorrect release");
        }

        if(!categories) {
            throw new Error("Incorrect categories");
        }

        if(!developers) {
            throw new Error("Incorrect developers"); 
        }

        const gameAlreadyExists = await gamesRepositories.findOne({
            name
        });

        if(gameAlreadyExists) {
            throw new Error("Game already exists");
        }

        const game = gamesRepositories.create({
            name,
            price,
            description,
            release,
            is_pending
        });

        const categoriesEntities = await Promise.all<Category>(categories.map(async (category) => {
            const categoryEntity = await categoriesRepositories.findOne({
                id: category.id
            })

            if(!categoryEntity) {
                throw new Error("Categoria não existe");
            }

            return categoryEntity;
        }));

        const developersEntities = await Promise.all<User>(developers.map(async (developer) => {
            const developerEntity = await usersRepositories.findOne({
                id: developer.id
            })
    
            if(!developerEntity) {
                throw new Error("Desenvolvedor não existe");
            }

            return developerEntity;
        }));

        game.categories = categoriesEntities;
        game.users = developersEntities;

        await gamesRepositories.save(game);
        
        return game;
    }
}

export { CreateGameService }