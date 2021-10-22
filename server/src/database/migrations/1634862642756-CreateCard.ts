import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCard1634862642756 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        
        await queryRunner.createTable(
            new Table({
                name: "cards",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "number",
                        type: "varchar"
                    },
                    {
                        name: "security_code",
                        type: "varchar"
                    },
                    {
                        name: "validity_month",
                        type: "varchar"
                    },
                    {
                        name: "validity_year",
                        type: "varchar"
                    },
                    {
                        name: "is_credit_card",
                        type: "boolean"
                    },
                    {
                        name: "userId",
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
                      name: "userCard",
                      referencedTableName: "users",
                      referencedColumnNames: ["id"],
                      columnNames: ["userId"],
                      onDelete: "CASCADE",
                      onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cards");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
