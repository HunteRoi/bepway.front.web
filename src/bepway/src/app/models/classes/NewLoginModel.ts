import { NewLoginModel as INewLoginModel } from '../interfaces/Models';

export class NewLoginModel implements INewLoginModel {
    constructor(public newPassword: string, public login: string, public password: string) {}
}
