import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "src/users/user.entity";
import { Attraction } from "src/attractions/attraction.entity";

@Entity()
export class VisitedAttraction{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @ManyToOne(()=>User, (user)=>user.visitedAttractions,{onDelete: 'CASCADE'})
    user:User;

    @ManyToOne(()=>Attraction, (attraction)=>attraction.visitedBy, {onDelete:'CASCADE'})
    attraction: Attraction;

}