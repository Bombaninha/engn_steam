import { EntityRepository, Repository } from "typeorm";
import { Game } from "../entities/Game"

@EntityRepository(Game)
class GamesRepositories extends Repository<Game>{}

export { GamesRepositories };