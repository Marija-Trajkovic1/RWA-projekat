import { Column, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Place } from "src/places/place.entity";
import { VisitedAttraction } from "src/visited-attractions/visited-attractions.entity";
import { SavedAttraction } from "src/saved-attractions/saved-attractions.entity";
@Entity()
export class Attraction{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    attractionName:string;

    @Column({nullable:true})
    shortDescription:string;

    @Column({nullable:true})
    longDescription: string;

    @Column()
    category:string;

    @Column({ type: 'double precision' })
    latitude: number;

    @Column({ type: 'double precision'})
    longitude: number;

    @Column({nullable:true})
    workingHours: string;

    @Column({nullable:true})
    websiteLink: string;

    @ManyToOne(()=> Place, (place)=>place.attractions, {onDelete: 'CASCADE'})
    place: Place;

    @OneToMany(()=>VisitedAttraction, (visited)=>visited.attraction)
    visitedBy: VisitedAttraction[];

    @OneToMany(()=>SavedAttraction, (saved)=>saved.attraction)
    savedBy:SavedAttraction[];
}