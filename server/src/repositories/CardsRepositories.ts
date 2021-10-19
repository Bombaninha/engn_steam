import { EntityRepository, Repository } from "typeorm";
import { Card } from "../entities/Card"

@EntityRepository(Card)
class CardsRepositories extends Repository<Card>{}

export { CardsRepositories };