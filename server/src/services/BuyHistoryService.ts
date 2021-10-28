import { getCustomRepository } from 'typeorm';
import { BuysRepositories } from '../repositories/BuysRepositories';
import { classToPlain } from 'class-transformer';

interface IBuyHistoryRequest {
    id: string;
}

class BuyHistoryService {

    async execute({ id } : IBuyHistoryRequest) {
        const buysRepositories = getCustomRepository(BuysRepositories);

        const buys = await buysRepositories.find({
            relations: ["buyType", "receiver"],
            where: {
                buyer_id: id
            }
        });

        return classToPlain(buys);
    }
}

export { BuyHistoryService }