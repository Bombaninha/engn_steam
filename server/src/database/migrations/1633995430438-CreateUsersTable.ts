import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1633995430438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "pending_password",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "redefine_password_token",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "role_id",
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
                        name: "FKRoleUsers",
                        referencedTableName: "roles",
                        referencedColumnNames: ["id"],
                        columnNames: ["role_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}


