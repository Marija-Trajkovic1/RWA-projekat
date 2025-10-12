import { Attraction } from "src/attractions/attraction.entity";
import { User } from "src/users/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SavedAttraction{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>User, (user)=> user.savedAttractions, {onDelete: 'CASCADE'})
    user:User;

    @ManyToOne(()=>Attraction, (attraction)=>attraction.savedBy, {onDelete: 'CASCADE'})
    attraction: Attraction;
}