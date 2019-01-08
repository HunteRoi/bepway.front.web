import { Coordinates as ICoordinates } from '../interfaces/Models';

export class Coordinates implements ICoordinates {
    constructor(public latitude: number, public longitude: number) {}
}
