import { getCustomRepository } from 'typeorm';
import { RequestsRepositories } from '../repositories/RequestsRepositories';
import { classToPlain } from 'class-transformer';

class ListRequestsService {

    async execute() {
        const requestsRepositories = getCustomRepository(RequestsRepositories);

        const requests = await requestsRepositories.find();

        return classToPlain(requests);
    }
}

export { ListRequestsService }