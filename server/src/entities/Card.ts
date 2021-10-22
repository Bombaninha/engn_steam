import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { User } from "./User";

@Entity("cards")

class Card {

    @PrimaryGeneratedColumn('uuid')
    id: string;

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, user => user.cards, { onDelete: 'SET NULL'})
    user: User;
    /*
    @Expose({number: 'number_hidden'})
    numberHidden(): string {
        return `#${this.number}`;
    }
    */
}

export { Card };