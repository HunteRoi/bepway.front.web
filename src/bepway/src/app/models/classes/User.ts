import { User as u } from '../interfaces/Models';

export class User implements u {
    constructor(public id: number,
        public login: string,
        public email?: string,
        public birthdate?: Date,
        public roles?: string,
        public todoList?: string,
        public creatorId?: number,
        public isEnabled?: boolean,
        public rowVersion?: string) {}
}