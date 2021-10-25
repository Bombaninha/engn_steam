import { getCustomRepository } from 'typeorm';
import { CardsRepositories } from '../repositories/CardsRepositories';
import { classToPlain } from 'class-transformer';

class ListCardsService {

    async execute() {
        const cardsRepositories = getCustomRepository(CardsRepositories);

        const cards = await cardsRepositories.find();
        // colocar info fora do banco
        //tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}`}))

        return classToPlain(cards);
    }
}

export { ListCardsService }