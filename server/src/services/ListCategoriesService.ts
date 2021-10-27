import { getCustomRepository } from 'typeorm';
import { CategoriesRepositories } from '../repositories/CategoriesRepositories';
import { classToPlain } from 'class-transformer';

class ListCategoriesService {

    async execute() {
        const categoriesRepositories = getCustomRepository(CategoriesRepositories);

        const categories = await categoriesRepositories.find();
        // colocar info fora do banco
        //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}`}))

        return classToPlain(categories);
    }
}

export { ListCategoriesService }