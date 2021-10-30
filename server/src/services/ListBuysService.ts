import { getCustomRepository } from 'typeorm';
import { BuysRepositories } from '../repositories/BuysRepositories';
import { classToPlain } from 'class-transformer';

class ListBuysService {

    async execute() {
        const buysRepositories = getCustomRepository(BuysRepositories);

        const buys = await buysRepositories.find();

        return classToPlain(buys);
    }
}

export { ListBuysService }