import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { BuyType } from "./BuyType";
import { Card } from "./Card";
import { Game } from "./Game";
import { User } from "./User";

@Entity("buys")
class Buy {

    @PrimaryColumn()
    readonly id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
    
    @Column()
    buy_type_id: string
    @ManyToOne(() => BuyType, buyType => buyType.buys)
    @JoinColumn({ name: 'buy_type_id' })
    buyType: BuyType;

    @Column()
    card_id: string
    @ManyToOne(() => Card, card => card.buys)
    @JoinColumn({ name: 'card_id' })
    card: Card;

    @Column()
    game_id: string
    @ManyToOne(() => Game, game => game.buys)
    @JoinColumn({ name: 'game_id' })
    game: Game;

    @Column()
    buyer_id: string
    @ManyToOne(() => User, user => user.buysBuyer)
    @JoinColumn({ name: 'buyer_id' })
    buyer: User;

    @Column({ nullable: true })
    receiver_id: string | null
    @ManyToOne(() => User, user => user.buysReceiver)
    @JoinColumn({ name: 'receiver_id' })
    receiver: User;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Buy };