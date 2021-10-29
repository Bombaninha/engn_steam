import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTicketsTable1635464310154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(
            new Table({
                name: "tickets",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "description",
                        type: "name"
                    },
                    {
                        name: "is_finished",
                        type: "boolean"
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
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tickets");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');        
    }

}
