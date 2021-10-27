import { MigrationInterface, QueryRunner} from "typeorm";

import { Category } from "../../entities/Category";

import { CategoriesSeed } from "../seeds/CategoriesDataSeed";

export class CreateCategoriesSeed1635295562309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(Category, CategoriesSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}