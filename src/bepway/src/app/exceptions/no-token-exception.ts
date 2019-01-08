import { Exception } from './exception';

export class NoTokenException extends Exception {
    constructor(message = "There is no token savec.") {
        super(message);
    }
}
