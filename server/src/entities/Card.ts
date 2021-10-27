import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { User } from "./User";
import { v4 as uuid } from "uuid";
import { Buy } from "./Buy";

@Entity("cards")
class Card {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Exclude()
    @Column()
    number: string;

    @Expose({name: 'number_custom'})
    numberCustom(): string {
        return '*'.repeat((this.number.length - 4)) + this.number.substr(-4);
    }

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    user_id: string;

    @ManyToOne(() => User, user => user.cards, { onDelete: 'SET NULL'})
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(() => Buy, buy => buy.card)    
    buys: Buy[];

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Card };