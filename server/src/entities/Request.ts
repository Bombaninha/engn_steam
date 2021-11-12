import { Entity, Column, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { Game } from "./Game";
import { RequestType } from "./RequestType";

import { BaseEntity } from "./BaseEntity";

@Entity("requests")
class RequestUser extends BaseEntity {

    @Column()
    request_type_id: string
    
    @ManyToOne(() => RequestType, requestType => requestType.requests)
    @JoinColumn({ name: 'request_type_id' })
    requestType: RequestType;

    @Column()
    game_id: string;
    @OneToOne(() => Game, game => game.request) 
    @JoinColumn({ name: 'game_id' })
    game: Game;

}

export { RequestUser };