import { Entity, Column, OneToMany } from "typeorm";
import { RequestUser } from "./RequestUser";

import { BaseEntity } from "./BaseEntity";

@Entity("request_types")
class RequestType extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @OneToMany(() => RequestUser, request => request.requestType)    
    requests: RequestUser[];

}

export { RequestType };