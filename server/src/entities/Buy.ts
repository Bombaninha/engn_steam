import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";

import { BuyType } from "./BuyType";
import { Card } from "./Card";
import { Game } from "./Game";
import { User } from "./User";

import { BaseEntity } from "./BaseEntity";

@Entity("buys")
class Buy extends BaseEntity {
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
}

export { Buy };