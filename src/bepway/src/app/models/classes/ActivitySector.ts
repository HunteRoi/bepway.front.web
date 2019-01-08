import { ActivitySector as IActivitySector } from '../interfaces/Models';

export class ActivitySector implements IActivitySector {
    constructor(public id: number, public name: string) {}
}
