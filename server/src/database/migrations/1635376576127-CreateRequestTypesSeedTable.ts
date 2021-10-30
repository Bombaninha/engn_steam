import { MigrationInterface, QueryRunner} from "typeorm";

import { RequestType } from "../../entities/RequestType";

import { RequestTypesSeed } from "../seeds/RequestTypesDataSeed";

export class CreateRequestTypesSeedTable1635376576127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(RequestType, RequestTypesSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}
