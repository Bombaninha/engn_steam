import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRequestsTable1635377366190 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(
            new Table({
                name: "requests",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "game_id",
                        type: "uuid"
                    },
                    {
                        name: "request_type_id",
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
                        referencedTableName: 'request_types',
                        referencedColumnNames: ['id'],
                        columnNames: ['request_type_id'],
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
        await queryRunner.dropTable("requests");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');        
    }

}
