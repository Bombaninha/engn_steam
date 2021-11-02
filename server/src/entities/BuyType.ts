import { Entity, Column, OneToMany } from "typeorm";
import { Buy } from "./Buy";

import { BaseEntity } from "./BaseEntity";

@Entity("buy_types")
class BuyType extends BaseEntity {
    @Column({ unique: true })
    name: string;
    
    @OneToMany(() => Buy, buy => buy.buyType)    
    buys: Buy[];
}

export { BuyType };