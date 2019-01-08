import { Token as IToken } from '../interfaces/Models';

export class Token implements IToken {
    constructor (public accessToken?: string, public expiresIn?: number) {}
}
