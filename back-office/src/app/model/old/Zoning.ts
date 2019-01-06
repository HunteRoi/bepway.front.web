import { Coordinates } from './Coordinates';

export class Zoning  {
    constructor(public id: number,
    public idOpenData: string,
    public name: string,
    public coordinates: Coordinates,
    public nsitid: number,
    public localisation: string,
    public township: string,
    public surface: number,
    public url?: string,
    public nbImplantations?: number) {}
}