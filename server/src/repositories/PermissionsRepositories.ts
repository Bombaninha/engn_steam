import { EntityRepository, Repository } from "typeorm";
import { Permission } from "../entities/Permission"

@EntityRepository(Permission)
class PermissionsRepositories extends Repository<Permission>{}

export { PermissionsRepositories };