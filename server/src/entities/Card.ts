import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("cards")

class Card {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    number: string;

    @Exclude()
    @Column()
    security_code: string;

    @Exclude()
    @Column()
    validity_month: string;

    @Exclude()
    @Column()
    validity_year: string;

    @Column()
    is_credit_card: boolean;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Card };