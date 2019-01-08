import { LoginModel as ILoginModel } from '../interfaces/Models';

export class LoginModel implements ILoginModel {
    constructor(public login: string, public password: string) {}
}
