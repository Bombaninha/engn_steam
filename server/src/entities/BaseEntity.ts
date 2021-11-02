import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export class BaseEntity {

    @PrimaryColumn()
    readonly id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Permite assumir a responsabilidade pela criação do id, sem dependender do BD
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}