import { getCustomRepository } from "typeorm";
import { CategoriesRepositories } from "../repositories/CategoriesRepositories";

interface ICreateCategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name } : ICreateCategoryRequest) {
        const categoriesRepositories = getCustomRepository(CategoriesRepositories)

        // Validação: Verificando se todos os campos foram recebidos
        if(!name) {
            throw new Error("Incorrect Name");
        }

        const categoryAlreadyExists = await categoriesRepositories.findOne({
            name
        });

        if(categoryAlreadyExists) {
            throw new Error("Category already exists");
        }

        const category = categoriesRepositories.create({
            name
        });

        await categoriesRepositories.save(category);

        return category;
    }
}

export { CreateCategoryService }