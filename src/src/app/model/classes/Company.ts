import { Company as ICompany } from '../interfaces/Models';


import { ActivitySector } from './ActivitySector';
import { Coordinates } from './Coordinates';

export class Company implements ICompany {
    constructor(public id: number, 
        public idOpenData: string, 
        public name: string, 
        public address: string, 
        public coordinates: Coordinates, 
        public zoningId: number,
        public creationDate: Date, 
        public creatorId?: string, 
        public imageUrl?: string, 
        public siteUrl?: string, 
        public description?: string, 
        public status?: string, 
        public activitySector?: ActivitySector, 
        public isPremium?: boolean, 
        public rowVersion?: string) {}
}
