import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBuysTable1635207555231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: "buys",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "buy_type_id",
                        type: "uuid"
                    },
                    {
                        name: "buyer_id",
                        type: "uuid"
                    },
                    {
                        name: "receiver_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "card_id",
                        type: "uuid"
                    },
                    {
                        name: "game_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "NOW()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "NOW()"
                    }
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'buy_types',
                        referencedColumnNames: ['id'],
                        columnNames: ['buy_type_id'],
                    },
                    {
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['buyer_id'],
                    },
                    {
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['receiver_id'],
                    },
                    {
                        referencedTableName: 'cards',
                        referencedColumnNames: ['id'],
                        columnNames: ['card_id'],
                    },
                    {
                        referencedTableName: 'games',
                        referencedColumnNames: ['id'],
                        columnNames: ['game_id'],
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("buys");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}