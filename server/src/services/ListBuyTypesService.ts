import { getCustomRepository } from 'typeorm';
import { BuyTypesRepositories } from '../repositories/BuyTypesRepositories';
import { classToPlain } from 'class-transformer';

class ListBuyTypesService {

    async execute() {
        const buyTypesRepositories = getCustomRepository(BuyTypesRepositories);

        const buyTypes = await buyTypesRepositories.find();

        return classToPlain(buyTypes);
    }
}

export { ListBuyTypesService }