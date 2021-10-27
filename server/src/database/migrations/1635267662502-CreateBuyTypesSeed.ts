import { MigrationInterface, QueryRunner} from "typeorm";

import { BuyType } from "../../entities/BuyType";

import { BuyTypesSeed } from "../seeds/BuyTypesDataSeed";

export class CreateBuyTypesSeed1635267662502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(BuyType, BuyTypesSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}