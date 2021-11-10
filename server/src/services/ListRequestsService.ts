import { getCustomRepository } from 'typeorm';
import { RequestsRepositories } from '../repositories/RequestsRepositories';
import { classToPlain } from 'class-transformer';

class ListRequestsService {

    async execute() {
        const requestsRepositories = getCustomRepository(RequestsRepositories);

        const requests = await requestsRepositories.find({ relations: [ "game", "requestType", "game.users", "game.categories"]});  

        return classToPlain(requests);
    }
}

export { ListRequestsService }