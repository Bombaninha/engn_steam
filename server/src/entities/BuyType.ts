import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Buy } from "./Buy";

@Entity("buy_types")
class BuyType {

    @PrimaryColumn()
    readonly id: string;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @OneToMany(() => Buy, buy => buy.buyType)    
    buys: Buy[];

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { BuyType };