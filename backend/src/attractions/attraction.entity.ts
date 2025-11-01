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
    imageURL:string;

    @Column()
    category:string;

    @Column({ type: 'double precision', nullable: true })
    latitude: number;

    @Column({ type: 'double precision', nullable: true })
    longitude: number;

    @ManyToOne(()=> Place, (place)=>place.attractions, {onDelete: 'CASCADE'})
    place: Place;

    @OneToMany(()=>VisitedAttraction, (visited)=>visited.attraction)
    visitedBy: VisitedAttraction[];

    @OneToMany(()=>SavedAttraction, (saved)=>saved.attraction)
    savedBy:SavedAttraction[];
}