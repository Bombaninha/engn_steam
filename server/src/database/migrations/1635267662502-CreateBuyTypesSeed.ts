import { getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { BuyTypesSeed } from "../seeds/BuyTypesDataSeed";

export class CreateBuyTypesSeed1635267662502 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //await getRepository("buy_types").save(
        //    BuyTypesSeed
        //);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }

}