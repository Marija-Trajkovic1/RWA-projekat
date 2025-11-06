import { Attraction } from "src/attractions/attraction.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; 

@Entity()
export class Place{
    @PrimaryGeneratedColumn()
    id:number;
   
    @Column()
    placeName:string;

    @Column({ type: 'double precision' })
    latitude: number;

    @Column({ type: 'double precision'})
    longitude: number;

    @OneToMany(()=>Attraction, (attraction)=>attraction.place)
    attractions: Attraction[];
}